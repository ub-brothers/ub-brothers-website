
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
        title: "Paid Amount",
        description: "The amount paid by the user.",
      },
      {
        name: "due",
        type: "number",
        title: "Due Amount",
        description: "The remaining amount to be paid.",
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
  


