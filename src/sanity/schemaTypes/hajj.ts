// Country Schema for Sanity (or your CMS)
export default {
    name: 'hajjPackage',
    title: 'Hajj Package',
    type: 'document',
    fields: [
      {
        name: 'countryName',
        title: 'Country Name',
        type: 'string',
        
      },
      {
        name: 'prize1',
        title: 'Prize sharing',
        type: 'string',
              
      },
      {
        name: 'prize2',
        title: 'Prize triple',
        type: 'string',
              
      },
      {
        name: 'prize3',
        title: 'Prize double',
        type: 'string',
              
      },
      {
        name: 'shortDescription',
        title: 'Short Description ',
        type: 'text',
          
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
        name: 'image2',
        title: 'Image2',
        type: 'image',
        options: {
          hotspot: true
        },
   
      },
    
    
    
    ]
  }
  