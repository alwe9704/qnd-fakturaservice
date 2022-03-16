// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { renderToStaticMarkup } from "react-dom/server";
import pdf, { CreateOptions } from "html-pdf";
import generateInvoiceBuffer from "../../faktura-react/generateInvoice";
import Invoice from "../../domain/invoice";
import InvoiceVisual from "../../faktura-react/InvoiceVisual/InvoiceVisual";

type Data = {
  pdf: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const invoices: Invoice[] = JSON.parse(req.body).invoices;
  const buffer = await generateInvoiceBuffer(InvoiceVisual(invoices[0]));
  res.status(200).json({
    pdf: buffer.toString("base64"),
  });
}
