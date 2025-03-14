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
  