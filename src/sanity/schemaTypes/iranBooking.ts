export default {
    name: "iranBooking",
    title: "Iran Booking",
    type: "document",
    fields: [
      {
        name: "storedUserEmail",
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
        name: 'userName',
        type: 'string',
        title: 'User Name',
      },
      {
        name: 'countryName',
        type: 'string',
        title: 'Place Name',
      },
      {
        name: 'shortDescription',
        type: 'string',
        title: 'Route',
      },
      {
        name: 'prize',
        type: 'string',
        title: 'Prize',
      },
    ],
    preview: {
      select: {
        title: "storedUserEmail",
      },
    },
  };
  