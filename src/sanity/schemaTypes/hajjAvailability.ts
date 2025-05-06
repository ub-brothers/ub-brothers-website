// schemas/comingSoonControl.js
export default {
    name: 'hajjAvailability',
    title: 'Hajj Availability',
    type: 'document',
    fields: [
      {
        name: 'showNotAvailableMessage',
        title: 'Not Available',
        type: 'boolean',
        initialValue: false,
      },
    ],
  };
  