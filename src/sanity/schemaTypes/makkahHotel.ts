export default {
    name: "makkahHotel",
    type: "document",
    title: "Makkah Hotels",
    fields: [
      {
        name: "hotelName",
        type: "string",
        title: "Hotel Name",
      },
      {
        name: "price",
        type: "number",
        title: "Price (per night)",
      },
      {
        name: "applicableCategories",
        type: "array",
        title: "Applicable Categories",
        of: [{ type: "string" }],
        options: {
          list: ["sharing", "penta", "quad", "triple", "doubled"], // Allowed categories
        },
      },
    ],
  };
  