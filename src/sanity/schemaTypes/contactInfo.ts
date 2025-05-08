const contactInfo = {
    name: 'contactInfo',
    title: 'Contact Info',
    type: 'document',
    fields: [
      {
        name: 'phoneNumbers',
        title: 'Phone Numbers',
        type: 'array',
        of: [{ type: 'string' }]
      },
      {
        name: 'emails',
        title: 'Email Addresses',
        type: 'array',
        of: [{ type: 'string' }]
      },
      {
        name: 'locations',
        title: 'Office Locations',
        type: 'array',
        of: [{ type: 'string' }]
      }
    ]
  };
  
  export default contactInfo;
  