export default {
    name: "iranOffer",
    type: "document",
    title: "Iran Ziyarat Offer",
    fields: [
      {
        name: "title",
        type: "string",
        title: "Offer Title",
      },
      {
         name: "image1",
          type: "image",
         title: "Image 1",
          options: { hotspot: true } 
        },
        {
          name: "image2",
           type: "image",
          title: "Image 2",
           options: { hotspot: true } 
         },
        {
          name: "destination",
          type: "string",
          title: "Destination",
        },
        {
            name: "route",
            type: "string",
            title: "Route",
          },
        {
          name: "description",
          type: "string",
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
  