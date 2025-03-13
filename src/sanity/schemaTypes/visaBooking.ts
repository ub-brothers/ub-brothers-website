
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
        type: 'number',
              
      },
      {
        name: "prizeForUsers",
        title: "Price for Login Users",
        type: "number",
      },
      
    ],
    preview: {
        select:
      {
       
        title: "userEmail",
      },
    },
  }
  


