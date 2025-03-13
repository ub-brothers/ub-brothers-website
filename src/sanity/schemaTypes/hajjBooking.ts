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
  