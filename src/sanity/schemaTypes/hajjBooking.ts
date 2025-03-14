export default {
    name: "hajjBooking",
    title: "Hajj Booking",
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
        name: 'shortDescription',
        type: 'string',
        title: 'Days Of Hajj',
      },
      {
        name: 'selectedCategory',
        type: 'string',
        title: 'Selected Category',
      },
      {
        name: 'selectedPrize',
        type: 'string',
        title: 'Selected Prize',
      },
    ],
    preview: {
      select: {
        title: "storedUserEmail",
      },
    },
  };
  