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
      name: "applicableCategories",
      type: "array",
      title: "Applicable Categories & Prices",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "categoryName",
              type: "string",
              title: "Category Name",
              options: {
                list: ["sharing", "penta", "quad", "triple", "doubled"], // Allowed categories
              },
            },
            {
              name: "price",
              type: "number",
              title: "Price (per night)",
            },
          ],
        },
      ],
    },
  ],
};
