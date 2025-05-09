// schemas/exchangeRate.ts
export default {
  name: "exchangeRate",
  title: "Exchange Rate: USD, SAR",
  type: "document",
  fields: [
    {
      name: "sarToPkr",
      title: "SAR to PKR",
      type: "number",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "usdToPkr",
      title: "USD to PKR",
      type: "number",
      validation: (Rule: any) => Rule.required(),
    },
  ],
};
