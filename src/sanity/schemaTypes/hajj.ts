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
        title: 'Price sharing',
        type: 'string',
              
      },
      {
        name: "sharingPriceForUsers",
        title: "Sharing Price for Login Users",
        type: "number",
      },
      {
        name: 'prize2',
        title: 'Price triple',
        type: 'string',
              
      },
      {
        name: "triplePriceForUsers",
        title: "Triple Price for Login Users",
        type: "number",
      },
      {
        name: 'prize3',
        title: 'Price double',
        type: 'string',
              
      },
      {
        name: "doublePriceForUsers",
        title: "Double Price for Login Users",
        type: "number",
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
  