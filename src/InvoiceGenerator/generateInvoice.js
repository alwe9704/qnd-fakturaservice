import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

function numberWithSpaces(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

const getTable = (invoice) => {
  const tableRows = invoice.products.map((item) => {
    return [
      item.name,
      {
        text: item.quantity,
        style: { alignment: "center" },
      },
      {
        text: `${item.price} kr`,
        style: { alignment: "center" },
      },
      {
        text: `${numberWithSpaces(item.quantity * item.price)} kr`,
        style: { alignment: "right" },
      },
    ];
  });

  const totalPrice = invoice.products.reduce((prev, item) => {
    return prev + item.quantity * item.price;
  }, 0);

  //Fulhack pga dålig footerhantering
  if (tableRows.length < 10) {
    const toGo = 10 - tableRows.length;
    for (let i = 0; i < toGo; i++) {
      tableRows.push([
        {
          text: "test",
          style: { color: "white" },
        },
        {
          text: "test",
          style: { color: "white" },
        },
        {
          text: "test",
          style: { color: "white" },
        },
        {
          text: "test",
          style: { color: "white" },
        },
      ]);
    }
  }

  return [
    {
      margin: [0, 25, 0, 0],
      layout: "invoiceTable",
      table: {
        widths: ["*", 60, 60, 100],
        headerRows: 1,
        body: [
          [
            { text: "Specifikation", style: { bold: true } },
            { text: "Antal", style: { alignment: "center", bold: true } },
            { text: "á Pris", style: { alignment: "center", bold: true } },
            { text: "Totalt", style: { alignment: "right", bold: true } },
          ],
          ...tableRows,
        ],
      },
    },
    {
      text: [
        {
          text: "Belopp att betala: ",
          style: { bold: true },
        },
        {
          text: `${numberWithSpaces(totalPrice)} kr`,
        },
      ],
      style: {
        alignment: "right",
      },
    },
  ];
};

const generateInvoice = (invoice) => {
  pdfMake.tableLayouts = {
    invoiceTable: {
      hLineWidth: function (i, node) {
        if (i === 0 || i === node.table.body.length) {
          return 0;
        }
        return i === node.table.headerRows ? 2 : 1;
      },
      vLineWidth: function (i) {
        return 0;
      },
      hLineColor: function (i) {
        return i === 1 ? "black" : "#aaa";
      },
      paddingLeft: function (i) {
        return i === 0 ? 0 : 8;
      },
      paddingRight: function (i, node) {
        return i === node.table.widths.length - 1 ? 0 : 8;
      },
    },
  };

  const header = [
    {
      columns: [
        {
          image: "arne",
          width: 100,
        },
        [
          {
            text: "Deltagarfaktura Squvalp 2022",
            style: "header",
          },
          {
            columns: [
              {
                stack: [
                  {
                    text: [
                      { text: "Vår Referens: ", style: { bold: true } },
                      invoice.senderReference,
                    ],
                    margin: [0, 0, 0, 10],
                  },
                  {
                    text: [
                      { text: "Er Referens: ", style: { bold: true } },
                      invoice.receiverReference,
                    ],
                  },
                ],
                margin: [0, 20, 0, 10],
                fontSize: 12,
              },
              {
                stack: [
                  {
                    text: [
                      { text: "Fakturanummer: ", style: { bold: true } },
                      invoice.number,
                    ],
                    margin: [0, 0, 0, 10],
                  },
                  {
                    text: [
                      { text: "Fakturadatum: ", style: { bold: true } },
                      invoice.date,
                    ],
                    margin: [0, 0, 0, 10],
                  },
                  {
                    text: "Fakturamottagare",
                    style: { bold: true },
                  },
                  {
                    text: invoice.Reciever.name,
                    margin: [0, 0, 0, 5],
                  },
                  {
                    text: invoice.Reciever.responsibleName,
                    margin: [0, 0, 0, 5],
                  },
                  {
                    text: invoice.Reciever.responsibleAddress,
                  },
                ],
                margin: [0, 20, 0, 10],
              },
            ],
          },
        ],
      ],
      style: "default",
      columnGap: 20,
    },
  ];

  const footer = [
    {
      stack: [
        {
          text: [
            { text: "Bankgironummer: ", style: { bold: true } },
            invoice.Sender.bankGiro,
          ],
          margin: [0, 150, 0, 10],
        },
        {
          text: [
            { text: "Sista Betalningsdag: ", style: { bold: true } },
            invoice.date,
          ],
          margin: [0, 0, 0, 40],
        },
      ],
      style: {
        alignment: "right",
        fontSize: 14,
      },
    },
    {
      columns: [
        {
          stack: [
            "Dröjsmålsränta på 2.0% per månad. Lagdstadgad påminnelseavgift uttages för varje skriftlig betalningspåminnelse",
            "Styrelsens säte: Stockholm",
            " ",
            `Org-Nr: ${invoice.Sender.orgNr}`,
            " ",
            invoice.Sender.address,
          ],
          style: {},
        },
        {
          stack: [
            `Tel: ${invoice.Sender.phone}`,
            " ",
            `Email: ${invoice.Sender.email}`,
            " ",
            `Web: ${invoice.Sender.web}`,
          ],
          style: { alignment: "right" },
        },
      ],
      columnGap: 20,
      style: { margin: [10, 10, 10, 10], fontSize: 8 },
    },
  ];

  const dd = {
    content: [header, getTable(invoice), footer],
    images: {
      arne: invoice.image,
    },
    styles: {
      header: {
        fontSize: 24,
        bold: true,
      },
      default: {},
    },
  };

  const pdfDocGen = pdfMake.createPdf(dd);
  return new Promise((resolve) => {
    pdfDocGen.getBase64((data) => {
      resolve(data);
    });
  });
};

export default generateInvoice;
