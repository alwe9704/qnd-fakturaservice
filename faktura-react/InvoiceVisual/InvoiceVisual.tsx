import Invoice from "../../domain/invoice";
import { useTable } from "react-table";
import Product from "../../domain/product";

//CSS Clusterfuck but RendertoMarkup doesn't play well with css-grid it seems

function numberWithSpaces(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

const InvoiceVisual = (invoice: Invoice) => {
  const TopPart = (
    <div
      style={{ width: "100%", height: "25vh", position: "relative", top: "0" }}
    >
      <img
        style={{
          width: "20%",
          position: "relative",
          top: "0",
          left: "0",
        }}
        src={"https://quarnevalen.se/q20/start/arne.png"}
      ></img>
      <div
        style={{
          width: "75%",
          position: "relative",
          top: "0",
          float: "right",
        }}
      >
        <h1>Deltagarfaktura Squvalp 2022</h1>
        <div style={{ width: "50%", float: "left" }}>
          <p>
            <b>Vår referens:</b> {invoice.senderReference}
          </p>
          <p>
            <b>Er referens:</b> {invoice.receiverReference}
          </p>
        </div>
        <div style={{ width: "50%", float: "left" }}>
          <p>
            <b>Fakturanummer:</b> {invoice.number}
          </p>
          <p>
            <b>Fakturadatum:</b> {invoice.date}
          </p>
        </div>
        <div style={{ width: "50%", marginLeft: "50%", marginTop: "5rem" }}>
          <p>
            <b>Fakturamottagare:</b>
          </p>
          <p>{invoice.Reciever.name}</p>
          <p>{invoice.Reciever.responseibleName}</p>
          <p>{invoice.Reciever.responsibleAddress}</p>
        </div>
      </div>
    </div>
  );

  const Table = (
    <div style={{ width: "100%", paddingTop: "40vw", paddingBottom: "20vw" }}>
      <table style={{ width: "100%", fontSize: "8pt" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid", padding: "0" }}>
            <th
              style={{
                textAlign: "left",
                borderBottom: "1px solid",
                padding: "0",
              }}
            >
              Specifikation
            </th>
            <th style={{ borderBottom: "1px solid", padding: "0" }}>Antal</th>
            <th style={{ borderBottom: "1px solid", padding: "0" }}>á pris</th>
            <th
              style={{
                textAlign: "right",
                borderBottom: "1px solid",
                padding: "0",
              }}
            >
              Totalt
            </th>
          </tr>
        </thead>
        <tbody>
          {invoice.products.map((product) => {
            return (
              <tr>
                <th
                  style={{
                    textAlign: "left",
                    width: "50%",
                    fontWeight: "normal",
                  }}
                >
                  {product.name}
                </th>
                <th style={{ fontWeight: "normal" }}>{product.quantity}</th>
                <th style={{ fontWeight: "normal" }}>{product.price} kr</th>
                <th style={{ fontWeight: "normal", textAlign: "right" }}>
                  {numberWithSpaces(product.quantity * product.price)} kr
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div
        style={{
          width: "100%",
          float: "right",
          textAlign: "right",
          paddingTop: "2vw",
        }}
      >
        <p>
          <b>Belopp att betala:</b>{" "}
          {numberWithSpaces(
            invoice.products.reduce(
              (num: number, prod: Product) => num + prod.price * prod.quantity,
              0
            )
          )}{" "}
          kr
        </p>
      </div>
    </div>
  );

  const BottomPart = (
    <div style={{ position: "fixed", bottom: "0" }}>
      <div style={{ textAlign: "right" }}>
        <h3 style={{ fontWeight: "normal" }}>
          <b>Bankgironummer:</b> {invoice.Sender.bankGiro}
        </h3>
        <h3 style={{ fontWeight: "normal" }}>
          <b>Sista betalningsdag: </b>
          {invoice.dueDate}
        </h3>
      </div>
      <div
        style={{
          width: "100%",
          height: "25vh",
          position: "fixed",
          bottom: "0",
        }}
      >
        <div
          style={{
            float: "left",
            width: "40%",
            fontSize: "6pt",
            position: "fixed",
            bottom: "0",
          }}
        >
          <p>
            Dröjsmålsränta på 2.0% per månad. Lagdstadgad påminnelseavgift
            uttages för varje skriftlig betalningspåminnelse
          </p>
          <p></p>
          <p>Styrelsens säte: Stockholm. Org-Nr:{invoice.Sender.orgNr}</p>
          <p>
            {invoice.Sender.name}, {invoice.Sender.address}
          </p>
        </div>
        <div
          style={{
            float: "right",
            width: "40%",
            fontSize: "6pt",
            textAlign: "right",
            position: "relative",
            bottom: "0",
          }}
        >
          <p>Tel: {invoice.Sender.phone}</p>
          <p>Email: {invoice.Sender.mail}</p>
          <p>Web: {invoice.Sender.web}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ fontSize: "8pt", width: "100%", height: "100vw" }}>
      {TopPart}
      {Table}
      {BottomPart}
    </div>
  );
};
export default InvoiceVisual;
