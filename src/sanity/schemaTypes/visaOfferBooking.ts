export default {
    name: "visaOfferBooking",
    type: "document",
    title: "Visa Offer Booking",
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
        name: "title",
        type: "string",
        title: "Offer Title",
      },
      {
        name: "countries",
        type: "string",
        title: "Countries",
      },
      {
        name: "discountedPriceForUsers",
        title: "Discounted Price",
        type: "string",
      },
    
    ],
    preview: {
        select: {
          title: "userEmail",
        },
      },
  };
  