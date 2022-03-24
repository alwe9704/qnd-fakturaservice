import Product from "./product";

interface Invoice {
  image: string;
  number: number;
  date: string;
  senderReference: string;
  receiverReference: string;
  dueDate: string;
  Reciever: {
    name: string;
    responsibleName: string;
    responsibleAddress: string;
  };
  Sender: {
    name: string;
    bankGiro: string;
    address: string;
    orgNr: string;
    mail: string;
    phone: string;
    web: string;
  };
  products: Product[];
}
export default Invoice;
