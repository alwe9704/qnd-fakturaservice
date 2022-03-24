import generateInvoiceJS from "./generateInvoice";
import Invoice from "./types/invoice";

const generateInvoice: (invoice: Invoice) => Promise<string> =
  generateInvoiceJS;

export default generateInvoice;
