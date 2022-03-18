// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { renderToStaticMarkup } from "react-dom/server";
import pdf, { CreateOptions } from "html-pdf";
import generateInvoiceBuffer from "../../faktura-react/generateInvoice";
import Invoice from "../../domain/invoice";
import InvoiceVisual from "../../faktura-react/InvoiceVisual/InvoiceVisual";

import Cors from "cors";

type Data = {
  pdfs: {
    name: string;
    pdf: string;
  }[];
};

const cors = Cors({
  methods: ["POST"],
});

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
  fn: (
    req: Cors.CorsRequest,
    res: {
      statusCode?: number | undefined;
      setHeader(key: string, value: string): any;
      end(): any;
    },
    next: (err?: any) => any
  ) => void
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      } else {
        return resolve(result);
      }
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await runMiddleware(req, res, cors);
  const invoices: Invoice[] = JSON.parse(req.body).invoices;

  const pdfs: { name: string; pdf: string }[] = [];
  for (let i = 0; i < invoices.length; i++) {
    const buffer = await generateInvoiceBuffer(InvoiceVisual(invoices[i]));
    pdfs.push({
      name: invoices[i].Reciever.name,
      pdf: buffer.toString("base64"),
    });
  }

  const buffer = await generateInvoiceBuffer(InvoiceVisual(invoices[0]));
  res.status(200).json({
    pdfs: pdfs,
  });
}
