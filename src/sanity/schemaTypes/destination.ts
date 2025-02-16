
export default {
    name: 'destinations',
    title: 'eVisa',
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
        name: 'requirement2',
        title: 'Requirement 2',
        type: 'text',
          
      },
      {
        name: 'requirement3',
        title: 'Requirement 3',
        type: 'text',
          
      },
      {
        name: 'requirement4',
        title: 'Requirement 4',
        type: 'text',
          
      },
      {
        name: 'requirement5',
        title: 'Requirement 5',
        type: 'text',
          
      },
      {
        name: 'requirement6',
        title: 'Requirement 6',
        type: 'text',
          
      },
      {
        name: 'requirement7',
        title: 'Requirement 7',
        type: 'text',
          
      },
      {
        name: 'requirement8',
        title: 'Requirement 8',
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
      {
        name: 'rating',
        title: 'Rating',
        type: 'number',
        
       
      },
      {
        name: 'availability',
        title: 'Availability',
        type: 'string',
        options: {
          list: [
            { title: 'Available Now', value: 'available' },
            { title: 'Coming Soon', value: 'comingSoon' }
          ]
        },
          
      }
    ]
  }
  


