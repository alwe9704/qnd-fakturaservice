// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { renderToStaticMarkup } from "react-dom/server";
import pdf, { CreateOptions } from "html-pdf";
import generateInvoiceBuffer from "../../faktura-react/generateInvoice";
import Invoice from "../../domain/invoice";
import InvoiceVisual from "../../faktura-react/InvoiceVisual/InvoiceVisual";

type Data = {
  pdfs: {
    name: string;
    pdf: string;
  }[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
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
