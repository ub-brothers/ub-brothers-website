export default {
    name: "tourBooking",
    title: "Tour Booking",
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
        name: "countryName",
        title: "Country Name",
        type: "string",
      },
      {
        name: "fullName",
        title: "Full Name",
        type: "string",
      },
      {
        name: "prize",
        title: "Prize",
        type: "number",
      },
      {
        name: "priceForUsers",
        title: "Price for Login Users",
        type: "number",
      },
    ],
    preview: {
      select: {
        title: "userEmail",
      },
    },
  };
  