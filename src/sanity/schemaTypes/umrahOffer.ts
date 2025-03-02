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
         name: "image",
          type: "image",
         title: "Country Image",
          options: { hotspot: true } 
        },
        {
          name: "daysOfUmrah",
          type: "number",
          title: "Days of Umrah",
        },
        {
          name: "description",
          type: "number",
          title: "Short description about offer",
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
      
    ],
  };
  