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
      type: 'array',
      title: 'Makkah Hotels',
      of: [{ type: 'string' }], // Allows multiple hotel names
    },
    {
      name: 'madinaHotel',
      type: 'array',
      title: 'Madina Hotels',
      of: [{ type: 'string' }], // Allows multiple hotel names
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
