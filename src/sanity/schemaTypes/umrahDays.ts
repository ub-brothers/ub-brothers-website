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
    
      },
      {
        name: "price",
        title: "Package Price (Except hotel cost)",
        type: "number",
     
      },
      {
        name: "priceForUsers",
        title: "Package Price for Login Users (Except hotel cost)",
        type: "number",
      },
      {
        name: "visaCost",
        title: "Visa Cost",
        type: "number",
      },
    ],
  };
  