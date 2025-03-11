// schemas/booking.js
export default {
    name: 'booking', // Schema ka naam
    type: 'document', // Document type
    title: 'Booking', // Schema ka title
    fields: [
      {
        name: "createdAt",
        type: "datetime",
        title: "Created At",
        initialValue: new Date().toISOString(), // ✅ Automatically set current time
      },
      {
        name: 'airlineName',
        type: 'string',
        title: 'Airline Name',
      },
      
      {
        name: 'userEmail',
        type: 'string',
        title: 'Login User',
      },
      {
        name: 'meal',
        type: 'string',
        title: 'Meal',
      },
      {
        name: 'totalPrice',
        type: 'number',
        title: 'Total Price',
      },
      {
        name: 'adults',
        type: 'number',
        title: 'Number of Adults',
      },
      {
        name: 'children',
        type: 'number',
        title: 'Number of Children',
      },
      {
        name: 'infants',
        type: 'number',
        title: 'Number of Infants',
      },
      {
        name: 'passengers',
        type: 'array',
        title: 'Passengers',
        readOnly:true,
        of: [
          {
            type: 'object',
            fields: [
              { name: 'name', type: 'string', title: 'Name' },
              { name: 'surname', type: 'string', title: 'Surname' },
              { name: 'passportNumber', type: 'string', title: 'Passport Number' },
              { name: 'dob', type: 'date', title: 'Date of Birth' },
              { name: 'passportExpiry', type: 'date', title: 'Passport Expiry' },
              { name: 'nationality', type: 'string', title: 'Nationality' },
              { name: 'type', type: 'string', title: 'Type (Adult/Child/Infant)' },
            ],
          },
        ],
      },
      {
        name: 'flights',
        type: 'array',
        title: 'Flights',
        readonly: true,
        of: [
          {
            type: 'object',
            fields: [
              { name: 'date', type: 'datetime', title: 'Date' },
              { name: 'flightNumber', type: 'string', title: 'Flight Number' },
              { name: 'originDestination', type: 'string', title: 'Route' },
              { name: 'time', type: 'string', title: 'Time' },
              { name: 'baggage', type: 'string', title: 'Baggage' },
              { name: 'depOrReturn', type: 'string', title: 'Departure/Return' },
            ],
          },
        ],
      },
      {
        name: 'phoneNumber',
        type: 'string',
        title: 'Phone Number',
      },
      {
        name: 'emailAddress',
        type: 'string',
        title: 'Email Address',
      },
    ],
  };