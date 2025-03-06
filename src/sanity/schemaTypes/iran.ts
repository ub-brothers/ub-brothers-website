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
        title: 'Short Description ',
        type: 'text',
          
      },

    {
        name: 'tourIncludeHeading',
        title: 'Tour Include Head',
        type: 'text',
          
      },
      {
        name: 'tourInclude1',
        title: 'Tour Include1',
        type: 'text',
          
      },
      {
        name: 'tourInclude2',
        title: 'Tour Include2',
        type: 'text',
          
      },
      {
        name: 'tourInclude3',
        title: 'Tour Include3',
        type: 'text',
          
      },
      {
        name: 'tourInclude4',
        title: 'Tour Include4',
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
    
    ]
  }
  