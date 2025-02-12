export default {
    name: "madinaHotel",
    type: "document",
    title: "Madina Hotels",
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
  