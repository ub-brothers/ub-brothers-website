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
        title: "Prize",
        type: "number",
      },
    ],
    preview: {
      select: {
        title: "userEmail",
      },
    },
  };
  