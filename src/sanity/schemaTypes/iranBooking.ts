export default {
    name: "iranBooking",
    title: "Iran Booking",
    type: "document",
    fields: [
      {
        name: "storedUserEmail",
        type: "string",
        title: "Login User",
      },
      {
        name: "createdAt",
        type: "datetime",
        title: "Created At",
        initialValue: new Date().toISOString(),
      },
      {
        name: "paid",
        type: "number",
        title: "Debit Amount"
      },
      {
        name: "due",
        type: "number",
        title: "Credit Amount"
      },
      {
        name: "amountReceive",
        type: "string",
        title: "Amount Received From Heading",
      
      },
      {
        name: "personName",
        type: "string",
        title: "Person Name",
      },
      {
        name: "bankName",
        type: "string",
        title: "Bank Name",
      },
      {
        name: "markedPayment",
        type: "string",
        title: "Heading For Payment Marked For",
      },
      {
        name: "bookingNumber",
        type: "string",
        title: "Booking Number",
      },
      {
        name: 'userName',
        type: 'string',
        title: 'User Name',
      },
      {
        name: 'countryName',
        type: 'string',
        title: 'Place Name',
      },
      {
        name: 'shortDescription',
        type: 'string',
        title: 'Route',
      },
      {
        name: 'prize',
        type: 'string',
        title: 'Prize',
      },
    ],
    preview: {
      select: {
        title: "storedUserEmail",
      },
    },
  };
  