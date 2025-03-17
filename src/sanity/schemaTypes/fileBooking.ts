export default {
    name: "fileBooking",
    title: "File Booking",
    type: "document",
    fields: [
      {
        name: "userEmail",
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
        name: "country",
        title: "Country Name",
        type: "string",
      },
      {
        name: "fullName",
        title: "Full Name",
        type: "string",
      },
      {
        name: "price",
        title: "Price",
        type: "number",
      },
    ],
    preview: {
      select: {
        title: "userEmail",
      },
    },
  };
  