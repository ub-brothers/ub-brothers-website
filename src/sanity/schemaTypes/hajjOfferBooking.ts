export default {
    name: "hajjOfferBooking",
    type: "document",
    title: "Hajj Offer Booking",
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
          name: "dateOfHajj",
          type: "string",
          title: "Date of Hajj",
        },
        {
          name: "totalDays",
          type: "string",
          title: "Total Days",
        },
        {
          name: "makkahHotel",
          type: "string",
          title: "Makkah Hotel",
        },
        {
          name: "madinaHotel",
          type: "string",
          title: "Madina Hotel",
        },
        {
          name: "description",
          type: "string",
          title: "Short description about offer",
        },
      {
        name: "discountedPriceForUsers",
        title: "Discounted Price for Login Users",
        type: "number",
      },

      
    ],
  };
  