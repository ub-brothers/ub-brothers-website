export default {
    name: "roomCategories",
    title: "Room Categories",
    type: "document",
    fields: [
      {
        name: "categoryName",
        title: "Category",
        type: "string",
        options: { list: ["sharing", "penta", "quad", "triple", "doubled"] },
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: "price",
        title: "Price Per Person",
        type: "number",
        validation: (Rule: any) => Rule.required().min(100),
      },
    ],
  };
  