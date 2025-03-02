export default {
    name: "umrahOffer",
    type: "document",
    title: "Umrah Offer",
    fields: [
      {
        name: "title",
        type: "string",
        title: "Offer Title",
      },
      {
        name: "countries",
        type: "array",
        title: "Countries",
        of: [
          {
            type: "object",
            fields: [
              { name: "name", type: "string", title: "Country Name" },
              { name: "image", type: "image", title: "Country Image", options: { hotspot: true } },
            ],
          },
        ],
      },
      {
        name: "originalPrice",
        type: "number",
        title: "Original Total Price",
      },
      {
        name: "discountedPrice",
        type: "number",
        title: "Discounted Price",
      },
      {
        name: "images",
        type: "array",
        title: "Offer Images",
        of: [{ type: "image" }],
        options: { hotspot: true },
      },
    ],
  };
  