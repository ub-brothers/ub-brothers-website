// Country Schema for Sanity (or your CMS)
export default {
    name: 'umrah',
    title: 'umrah',
    type: 'document',
    fields: [
      {
        name: 'countryName',
        title: 'Country Name',
        type: 'string',
        
      },
      {
        name: 'prize',
        title: 'Prize',
        type: 'number',
              
      },

      {
        name: 'shortDescription',
        title: 'Short Description ',
        type: 'text',
          
      },
    {
        name: 'requirements',
        title: 'Requirements',
        type: 'text',
          
      },
      {
        name: 'requirement1',
        title: 'Requirement 1',
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
        name: 'image3',
        title: 'Image3',
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
    
    ]
  }
  