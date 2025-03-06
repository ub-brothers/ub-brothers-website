export default {
    name: "visaOffer",
    type: "document",
    title: "Visa Offer",
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
        name: "originalPriceForUsers",
        title: "Original Price for Login Users",
        type: "number",
      },
      {
        name: "discountedPrice",
        type: "number",
        title: "Discounted Price",
      },
      {
        name: "discountedPriceForUsers",
        title: "Discounted Price for Login Users",
        type: "number",
      },
    
    ],
  };
  