export default {
    name: "user",
    title: "Users",
    type: "document",
    fields: [
      {
        name: "email",
        title: "Email Of Account Login",
        type: "string",
        validation: (Rule:any) => Rule.required(),
      },
      {
        name: "password",
        title: "Password (Hashed)",
        type: "string",
        hidden: true, // Taake frontend pe show na ho
      },
      {
        name: "approved",
        title: "Approved",
        type: "boolean",
        initialValue: false, // Default false hoga
      },
      {
        name: "officeName",
        title: "Office Name",
        type: "string",
      },
      {
        name: "officialName",
        title: "Official Name",
        type: "string",
      },
      {
        name: "registrationNumber",
        title: "Registration Number",
        type: "string",
      },
      {
        name: "taxNumber",
        title: "Tax / TRN Number",
        type: "string",
      },
      {
        name: "country",
        title: "Country",
        type: "string",
      },
      {
        name: "city",
        title: "City",
        type: "string",
      },
      {
        name: "zipCode",
        title: "Zip Code",
        type: "string",
      },
      {
        name: "address",
        title: "Residence Address",
        type: "string",
      },
      {
        name: "companyUrl",
        title: "Company URL",
        type: "url",
      },
      {
        name: "officialEmail",
        title: "Official Email",
        type: "string",
      },
      {
        name: "title",
        title: "Title",
        type: "string",
        options: {
          list: ["Mr", "Mrs", "Ms"],
        },
      },
      {
        name: "firstName",
        title: "First Name",
        type: "string",
      },
      {
        name: "lastName",
        title: "Last Name",
        type: "string",
      },
      {
        name: "phone",
        title: "Phone",
        type: "string",
      },
      {
        name: "mobile",
        title: "Mobile No.",
        type: "string",
      },
      {
        name: "position",
        title: "Position",
        type: "string",
      },
   
    ],
  };
  