export default {
    name: "hajjOffer",
    type: "document",
    title: "Hajj Offer",
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
          name: "dateOfHajj",
          type: "string",
          title: "Date of Hajj",
        },
        {
          name: "totalDays",
          type: "string",
          title: "Total Days",
        },
        {
          name: "makkahHotel",
          type: "string",
          title: "Makkah Hotel",
        },
        {
          name: "madinaHotel",
          type: "string",
          title: "Madina Hotel",
        },
        {
          name: "food",
          type: "string",
          title: "Food",
        },
        {
          name: "transport",
          type: "string",
          title: "Transport",
        },
        {
          name: 'holyziarat',
          title: 'Holy Ziarat Detail',
          type: 'string',
            
        },
        {
          name: 'ticketHead',
          title: 'Ticket Heading',
          type: 'string',
            
        },
        {
          name: 'airlineName',
          title: 'Airline Name',
          type: 'string',
            
        },
        {
          name: 'airlineImage',
          title: 'Airline Image',
          type: 'image',
          options: {
            hotspot: true
          },
     
        },
        {
          name: 'dep',
          title: 'Departure',
          type: 'string',
            
        },
        {
          name: 'flightNum1',
          title: 'Flight Num Dep',
          type: 'string',
            
        },
        {
          name: 'dateOfFlight1',
          title: 'Date Of Flight Dep',
          type: 'string',
            
        },
        {
          name: 'route1',
          title: 'Route Dep',
          type: 'string',
            
        },
        {
          name: 'time1',
          title: 'Time Of Dep',
          type: 'string',
            
        },
        {
          name: 'return',
          title: 'Return Flight',
          type: 'string',
            
        },
        {
          name: 'flightNum2',
          title: 'Flight Num Ret',
          type: 'string',
            
        },
        {
          name: 'dateOfFlight2',
          title: 'Date Of Flight Ret',
          type: 'string',
            
        },
        {
          name: 'route2',
          title: 'Route Ret',
          type: 'string',
            
        },
        {
          name: 'time2',
          title: 'Time Ret',
          type: 'string',
            
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
  