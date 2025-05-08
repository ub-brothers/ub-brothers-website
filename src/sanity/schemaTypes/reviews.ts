export default {
    name: "review",
    title: "Client Reviews",
    type: "document",
    fields: [
      {
        name: "name",
        title: "Client Name",
        type: "string",
        
      },
      {
        name: "message",
        title: "Review Message",
        type: "text",
        
      },
      {
        name: "rating",
        title: "Rating (1-5)",
        type: "number",
        validation: (Rule:any) =>
          Rule.required()
            .min(1)
            .max(5)
            .integer()
            .error("Rating must be between 1 and 5"),
        options: {
          list: [1, 2, 3, 4, 5],
        },
      },
      {
        name: "language",
        title: "Language",
        type: "string",
        options: {
          list: [
            { title: "English", value: "english" },
            { title: "Urdu", value: "urdu" },
          ],
          layout: "radio",
        },
        initialValue: "english",
      },
    ],
    preview: {
      select: {
        title: "name",
        subtitle: "message",
        rating: "rating",
      },
      prepare(selection:any) {
        const { title, subtitle, rating } = selection;
        return {
          title: title,
          subtitle: `${subtitle?.slice(0, 30)}... (${rating}★)`,
        };
      },
    },
  };