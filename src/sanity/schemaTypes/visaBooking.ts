
export default {
    name: 'visaBooking',
    title: 'E Visa Booking',
    type: 'document',
    fields: [
        {
            name: 'userEmail',
            type: 'string',
            title: 'Login User',
          },
          {
        name: "createdAt",
        type: "datetime",
        title: "Created At",
        initialValue: new Date().toISOString(), // ✅ Automatically set current time
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
        name: 'countryName',
        title: 'Country Name',
        type: 'string',
        
      },
      {
        name: 'firstName',
        title: 'Full Name',
        type: 'string',
        
      },
      {
        name: 'prize',
        title: 'Prize',
        type: 'string',
              
      },
      {
        name: "prizeForUsers",
        title: "Price for Login Users",
        type: "string",
      },
      
    ],
    preview: {
        select:
      {
       
        title: "userEmail",
      },
    },
  }
  


