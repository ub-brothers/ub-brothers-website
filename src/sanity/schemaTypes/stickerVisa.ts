  // Country Schema for Sanity (or your CMS)
  export default {
    name: 'stickerVisa',
    title: 'Sticker',
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
        name: 'requirements',
        title: 'Requirements',
        type: 'text',
          
      },
  
      {
        name: 'requirements1',
        title: 'Requirements1',
        type: 'text',
          
      },
      {
        name: 'requirements2',
        title: 'Requirements2',
        type: 'text',
          
      },
      {
        name: 'requirements3',
        title: 'Requirements3',
        type: 'text',
          
      },
      {
        name: 'requirements4',
        title: 'Requirements4',
        type: 'text',
          
      },
      {
        name: 'requirements5',
        title: 'Requirements5',
        type: 'text',
          
      },
      {
        name: 'requirements6',
        title: 'Requirements6',
        type: 'text',
          
      },
      {
        name: 'requirements7',
        title: 'Requirements7',
        type: 'text',
          
      },
      {
        name: 'requirements8',
        title: 'Requirements8',
        type: 'text',
          
      },
      {
        name: 'requirements9',
        title: 'Requirements9',
        type: 'text',
          
      },
      {
        name: 'requirements10',
        title: 'Requirements10',
        type: 'text',
          
      },
      {
        name: 'requirements11',
        title: 'Requirements11',
        type: 'text',
          
      },
      {
        name: 'requirements12',
        title: 'Requirements12',
        type: 'text',
          
      },
      {
        name: 'requirements13',
        title: 'Requirements13',
        type: 'text',
          
      },
      {
        name: 'requirements14',
        title: 'Requirements14',
        type: 'text',
          
      },
      {
        name: 'requirements15',
        title: 'Requirements15',
        type: 'text',
          
      },
      {
        name: 'requirements16',
        title: 'Requirements16',
        type: 'text',
          
      },
      {
        name: 'requirements17',
        title: 'Requirements17',
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
        name: 'shortDescription',
        title: 'Description',
        type: 'text',
          
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