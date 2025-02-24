export default {
    name: "umrahDays",
    title: "Umrah days",
    type: "document",
    fields: [
      {
        name: "days",
        title: "Number of Days",
        type: "number",
        options: { list: [7, 15, 21, 28] },
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: "price",
        title: "Package Price",
        type: "number",
        validation: (Rule: any) => Rule.required().min(10),
      },
    ],
  };
  