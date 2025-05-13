const aboutUs = {
    name: 'aboutUs',
    title: 'About Us',
    type: 'document',
    fields: [
      {
        name: 'mainHeading',
        title: 'Main Heading',
        type: 'string',
      },
      {
        name: 'aboutText',
        title: 'About Description',
        type: 'text',
      },
      {
        name: 'aboutImage',
        title: 'Main Image',
        type: 'image',
        options: { hotspot: true },
      },
      {
        name: 'ceoHeading',
        title: 'CEO Heading',
        type: 'string',
      },
      {
        name: 'ceoImage',
        title: 'CEO Image',
        type: 'image',
        options: { hotspot: true },
      },
      {
        name: 'ceoText',
        title: 'CEO Description',
        type: 'text',
      },
      {
        name: 'staffHeading',
        title: 'Staff Heading',
        type: 'string',
      },
      {
        name: 'staffImage',
        title: 'Staff Group Image',
        type: 'image',
        options: { hotspot: true },
      },
      {
        name: 'staffText',
        title: 'Staff Description',
        type: 'text',
      },
      {
        name: 'teamMembers',
        title: 'Team Members',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              { name: 'name', title: 'Name', type: 'string' },
              { name: 'role', title: 'Role', type: 'string' },
              { name: 'phone', title: 'Phone Number', type: 'string' },
              
              { name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } },
            ],
          },
        ],
      },
    ],
  };
  
  export default aboutUs;
  