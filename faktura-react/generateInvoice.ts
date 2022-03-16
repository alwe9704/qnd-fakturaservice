import { renderToStaticMarkup } from "react-dom/server";
import pdf, { CreateOptions } from "html-pdf";

const generateInvoiceBuffer: (c: JSX.Element) => Promise<Buffer> = (
  component: JSX.Element
) => {
  return new Promise((resolve, reject) => {
    const html = renderToStaticMarkup(component);

    const options: CreateOptions = {
      format: "A4",
      orientation: "portrait",
      border: "10mm",
      footer: {
        height: "10mm",
      },
      type: "pdf",
      timeout: 30000,
    };

    const buffer = pdf.create(html, options).toBuffer((err, buffer) => {
      if (err) {
        return reject(err);
      }

      return resolve(buffer);
    });
  });
};

export default generateInvoiceBuffer;
