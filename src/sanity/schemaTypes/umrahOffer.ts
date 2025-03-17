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
          title: "Total Days of Umrah",
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
      {
        name: 'makkahHotelH',
        title: 'Makkah Hotel Heading',
        type: 'string',
          
      },
      {
        name: 'makkahHotel',
        title: 'Makkah Hotel',
        type: 'string',
          
      },
      {
        name: 'makkahHotelDaysH',
        title: 'Makkah Hotel Days Heading',
        type: 'string',
          
      },
      {
        name: 'makkahHotelDays',
        title: 'Makkah Hotel Days',
        type: 'string',
          
      },
      {
        name: 'madinaHotelH',
        title: 'Madina Hotel Heading',
        type: 'string',
          
      },
 {
        name: 'madinaHotel',
        title: 'Madina Hotel',
        type: 'string',
          
      },
      {
        name: 'madinaHotelDaysH',
        title: 'Madina Hotel Days Heading',
        type: 'string',
          
      },
      {
        name: 'madinaHotelDays',
        title: 'Madina Hotel Days',
        type: 'string',
          
      },
      {
        name: 'foodHead',
        title: 'Food Heading',
        type: 'string',
          
      },
      {
        name: 'food',
        title: 'Food Included',
        type: 'string',
          
      },
      {
        name: 'transportHead',
        title: 'Transport Heading',
        type: 'string',
          
      },
      {
        name: 'transport',
        title: 'Transport detail',
        type: 'string',
          
      },
      {
        name: 'holyZiaratHead',
        title: 'Holy Ziarat Heading',
        type: 'string',
          
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
        title: 'Departure Heading',
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
        title: 'Return Heading',
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

    ],
  };
  