// schemas/comingSoonControl.js
export default {
    name: 'umrahAvailability',
    title: 'Umrah Availability',
    type: 'document',
    fields: [
      {
        name: 'showComingSoonMessage',
        title: 'Coming Soon',
        type: 'boolean',
        initialValue: false,
      },
    ],
  };
  