// Country Schema for Sanity (or your CMS)
export default {
    name: 'iranIraq',
    title: 'Iran Iraq Ziyarat',
    type: 'document',
    fields: [
      {
        name: 'countryName',
        title: 'Country Name',
        type: 'string',
        
      },
      {
        name: 'prize',
        title: 'Price',
        type: 'number',
              
      },
      {
        name: "priceForUsers",
        title: "Price for Login Users",
        type: "number",
      },

      {
        name: 'shortDescription',
        title: 'Short Description / Route',
        type: 'text',
          
      },
      {
        name: 'image2',
        title: 'Image2',
        type: 'image',
        options: {
          hotspot: true
        },
   
      },
    
      {
        name: 'image',
        title: 'Image',
        type: 'image',
        options: {
          hotspot: true
        },
   
      },
      {
        name: 'transport',
        title: 'Transport',
        type: 'text',
          
      },
      {
        name: 'hotel',
        title: 'Hotel',
        type: 'text',
          
      },
      {
        name: 'meal',
        title: 'Meal',
        type: 'text',
          
      },
      {
        name: 'visa',
        title: 'Visa',
        type: 'text',
          
      },
      {
        name: 'ticket',
        title: 'Ticket',
        type: 'text',
          
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

    
    ]
  }
  