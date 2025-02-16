// Sanity Schema (hajjSchema.js)
export const hajjDays = {
  name: 'hajjDays',
  type: 'document',
  title: 'Hajj Days',
  fields: [
    {
      name: 'days',
      type: 'text',
      title: 'Number of Days',
    },
    {
      name: 'makkahHotel',
      type: 'string',
      title: 'Makkah Hotel',
    },
    {
      name: 'madinaHotel',
      type: 'string',
      title: 'Madina Hotel',
    },
    {
      name: 'roomCategories',
      type: 'array',
      title: 'Room Categories for Selected Days',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'category', type: 'string', title: 'Room Category' },
            { name: 'price', type: 'number', title: 'Price' },
          ],
        },
      ],
    },
  ],
};
