export default {
    name: "umrahBooking",
    title: "Umrah Booking",
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
        name: "countryName",
        title: "Country Name",
        type: "string",
      },
      {
        name: "name",
        title: "Full Name",
        type: "string",
      },
     
      {
        name: "phone",
        title: "PhoneNumber",
        type: "string",
      },
      
      {
        name: "days",
        title: "Number of Days",
        type: "number",
      },
      {
        name: "makkahHotel",
        title: "Makkah Hotel",
        type: "string",
      },
      {
        name: "makkahDay",
        title: "Makkah Day",
        type: "number",
      },
      {
        name: "makkahCategory",
        title: "Makkah Room Ctegory",
        type: "string",
      },

      {
        name: "madinaHotel",
        title: "Madina Hotel",
        type: "string",
      },
      {
        name: "madinaDay",
        title: "Madina Day",
        type: "number",
      },
      {
        name: "madinaCategory",
        title: "Madina Room Ctegory",
        type: "string",
      },
      


      {
        name: "totalCost",
        title: "Total Cost",
        type: "number",
      },
    ],
    preview: {
      select: {
        title: "userEmail",
      },
    },
  };
  