export default {
  name: "umrahBooking",
  title: "Umrah Booking",
  type: "document",
  fields: [
    {
      name: "fullName",
      title: "Full Name",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule: any) => Rule.email().required(),
    },
    {
      name: "phone",
      title: "Phone Number",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "days",
      title: "Number of Days",
      type: "number",
      options: {
        list: [7, 15, 21, 28],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "makkahHotel",
      title: "Makkah Hotel",
      type: "string",
      options: {
        list: [
          "Dayar Matar",
          "Land Premium/ Dewania",
          "Johra/ Dairy",
          "Lolo Eman",
          "Saif Al Majad",
          "Nada Al Majad/ Mathar Al Jawad",
          "Diyafat Al Rahman",
          "Kiswa Tower",
        ],
      },
    },
    {
      name: "madinaHotel",
      title: "Madina Hotel",
      type: "string",
      options: {
        list: [
          "Rehab Ul Madien",
          "Minar Al Madina",
          "Dar Al Taiba old Dar Akbar",
          "Diamond Rose/ Shaza Munawara",
          "Ansar Plus",
          "Zahrat Al Munawarah",
          "Arjawan Madina/ Karam Golden",
          "Deewan Al Madina",
        ],
      },
    },
    {
      name: "category",
      title: "Room Category",
      type: "string",
      options: {
        list: ["sharing", "penta", "quad", "triple", "doubled"],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "visaStatus",
      title: "Visa Status",
      type: "string",
      options: {
        list: ["yes", "no"],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "visaDocuments",
      title: "Visa Documents",
      type: "object",
      fields: [
        { name: "passportCopy", title: "Passport Scan Copy", type: "image" },
        { name: "personalPhoto", title: "Personal Photo", type: "image" },
        { name: "nationality", title: "Nationality", type: "string" },
      ],
      hidden: ({ document }: { document: Record<string, any> }) => document.visaStatus === "yes",
    },
    {
      name: "totalCost",
      title: "Total Cost",
      type: "number",
    },
  ],
};
