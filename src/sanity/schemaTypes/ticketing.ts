export default {
  name: 'flights',
  title: 'Ticketing/ Flights',
  type: 'document',
  fields: [
    {
      name: "internalTitle",
      title: "Internal Title (For Admin Only)",
      type: "string",
      description: "Ye sirf admin ke liye hai, frontend pe nahi dikhayega.",
      hidden: false, // Studio me dikhayega
    },
    {
      name: "seats",
      title: "Adult Seats",
      type: "number",
      initialValue: 2
    },
    {
      name: "childSeats",
      title: "Child Seats",
      type: "number",
      
    },
    { name: 'airline', title: 'Airline', type: 'string' },
    { 
      name: 'airlineLogo', 
      title: 'Airline Logo', 
      type: 'image', 
      options: { hotspot: true }
    },
    { 
      name: 'flights', 
      title: 'Flights', 
      type: 'array', 
      of: [
        {
          type: 'object',
          fields: [
            {
              name: "isReturn",
              title: "Is Return Flight",
              type: "boolean",
              description: "Check if this is a return flight",
            },
            { 
              name: 'date', 
              title: 'Date', 
              type: 'date',
              options: { dateFormat: 'DD MMM YYYY' } 
            },
            { name: 'flightNumber', title: 'Flight Number', type: 'string' },
            { name: 'originDestination', title: 'Origin - Destination', type: 'string' },
            { name: 'time', title: 'Time', type: 'string' },
            { name: 'baggage', title: 'Baggage', type: 'string' }
          ]
        }
      ]
    },
    // Yeh meal aur price ab flights ke andar nahi, balki group level par hai
    { name: 'meal', title: 'Meal', type: 'string' },
    { name: 'price', title: 'Price', type: 'string' },

    {
      name: "airlineImage",
      title: "Airline Image",
      type: "image",
      options: { hotspot: true }
    },
    { name: 'airlineName', title: 'Airline Name', type: 'string' },

  ]

};
 