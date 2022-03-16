import { TextField } from "@mui/material";
import { DataGrid, GridColumns, GridRowsProp } from "@mui/x-data-grid";
import { stringifyQuery } from "next/dist/server/server-route-utils";
import { useState } from "react";
import Invoice from "../domain/invoice";
import Product from "../domain/product";

interface PersonalData {
  image: string;
  startNumber: number;
  date: string;
  dueDate: string;
  senderReference: string;
  sender: {
    name: string;
    bankGiro: string;
    address: string;
    orgNr: string;
    mail: string;
    phone: string;
    web: string;
  };
}

interface RecieverData {
  reciever: {
    name: string;
    responsibleName: string;
    responsibleAddress: string;
  };
  products: Product[];
}
const InvoiceForm = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  const [personalData, setPersonalData] = useState<PersonalData>({
    image: "",
    startNumber: 1,
    date: "",
    dueDate: "",
    senderReference: "",
    sender: {
      name: "",
      bankGiro: "",
      address: "",
      orgNr: "",
      mail: "",
      phone: "",
      web: "",
    },
  });

  const [recieverData, setRecieverData] = useState<RecieverData[]>([]);
  const personalForm = (
    <div>
      <h3>Information om avsändare:</h3>
      <div>
        <TextField
          variant="outlined"
          label="Organisationsnamn"
          onChange={(e) => {
            setPersonalData({
              ...personalData,
              sender: { ...personalData.sender, name: e.target.value },
            });
          }}
        />
        <TextField
          variant="outlined"
          label="Namn Vår referens"
          onChange={(e) => {
            setPersonalData({
              ...personalData,
              senderReference: e.target.value,
            });
          }}
        />
      </div>
      <div>
        <TextField
          style={{ width: "100%" }}
          variant="outlined"
          label="Address"
          onChange={(e) => {
            setPersonalData({
              ...personalData,
              sender: { ...personalData.sender, address: e.target.value },
            });
          }}
        />
      </div>
      <div>
        <TextField
          variant="outlined"
          label="Webbplats"
          onChange={(e) => {
            setPersonalData({
              ...personalData,
              sender: { ...personalData.sender, web: e.target.value },
            });
          }}
        />
        <TextField
          variant="outlined"
          label="Telefonnummer"
          onChange={(e) => {
            setPersonalData({
              ...personalData,
              sender: { ...personalData.sender, phone: e.target.value },
            });
          }}
        />
        <TextField
          variant="outlined"
          label="Kontaktmail"
          onChange={(e) => {
            setPersonalData({
              ...personalData,
              sender: { ...personalData.sender, mail: e.target.value },
            });
          }}
        />
      </div>
      <div>
        <TextField
          style={{ width: "100%" }}
          variant="outlined"
          label="Bankgiro"
          onChange={(e) => {
            setPersonalData({
              ...personalData,
              sender: { ...personalData.sender, bankGiro: e.target.value },
            });
          }}
        />
      </div>
      <h3>Information om faktura</h3>
      <div>
        <TextField
          variant="outlined"
          label="Startnummer faktura (1)"
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          onChange={(e) => {
            setPersonalData({
              ...personalData,
              startNumber: Number.parseInt(e.target.value),
            });
          }}
        />
        <TextField
          variant="outlined"
          label="Fakturadatum (YYYY-MM-DD)"
          onChange={(e) => {
            setPersonalData({
              ...personalData,
              date: e.target.value,
            });
          }}
        />
        <TextField
          variant="outlined"
          label="Sista betalningsdag (YYYY-MM-DD)"
          onChange={(e) => {
            setPersonalData({
              ...personalData,
              dueDate: e.target.value,
            });
          }}
        />
      </div>
    </div>
  );
  const columns: GridColumns = [
    {
      field: "name",
      headerName: "Lagnamn",
      editable: true,
      width: 180,
    },
    {
      field: "captain",
      headerName: "Ansvarig Kontaktperson",
      editable: true,
      width: 220,
    },
    {
      field: "address",
      headerName: "Fakturaaddress",
      editable: true,
      width: 180,
    },
  ];

  const rows: GridRowsProp = [
    {
      id: 1,
      name: "Testlaget",
      captain: "Quapten Quaptensson",
      address: "Svinningeskellefevägen 147 lgh 4101, 182 86 Tierp",
    },
  ];

  console.log(rows);

  return (
    <div style={{ marginBottom: "10vh" }}>
      {personalForm}
      <h3>Information om mottagare</h3>
      <button
        onClick={() => {
          rows;
        }}
      ></button>
      <div style={{ height: "50vh", width: "100%" }}>
        <DataGrid columns={columns} rows={rows} />
      </div>
    </div>
  );
};
export default InvoiceForm;
