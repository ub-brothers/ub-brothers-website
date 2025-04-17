export default {
    name: 'bank',
    title: 'Bank Details',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Bank Name',
        type: 'string',
      },
      {
        name: 'logo',
        title: 'Bank Logo',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'accountTitle',
        title: 'Account Title',
        type: 'string',
      },
      {
        name: 'account',
        title: 'Account Number',
        type: 'string',
      },
      {
        name: 'branch',
        title: 'Branch',
        type: 'string',
      },
      {
        name: 'order',
        title: 'Display Order',
        type: 'number',
      },
    ],
    orderings: [
      {
        title: 'Order by Display Order',
        name: 'displayOrderAsc',
        by: [{ field: 'order', direction: 'asc' }],
      },
    ]
  }
  