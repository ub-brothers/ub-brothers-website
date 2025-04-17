export default {
    name: 'makkahHotelImg',
    title: 'Makkah Hotel Images',
    type: 'document',
    fields: [
        {
          name: "hotels",
          title: "Hotels",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "name", title: "Hotel Name", type: "string" },
                { name: "image", title: "Image", type: "image", options: { hotspot: true } },
              ],
            },
          ],
        },
      ],
    };
  