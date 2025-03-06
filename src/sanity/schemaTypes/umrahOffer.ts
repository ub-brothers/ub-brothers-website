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
          name: "daysOfUmrah",
          type: "number",
          title: "Days of Umrah",
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
  