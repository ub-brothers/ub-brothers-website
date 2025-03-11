export default {
    name: "user",
    title: "Users",
    type: "document",
    fields: [
      {
        name: "email",
        title: "Email Of Account Login",
        type: "string",
        readOnly: true,
        validation: (Rule:any) => Rule.required(),
      },
      {
        name: "password",
        title: "Password (Hashed)",
        type: "string",
        readOnly: true,
        hidden: false, // Taake frontend pe show na ho
      },
      {
        name: "approved",
        title: "Approved",
        type: "boolean",
        initialValue: false, // Default false hoga
      },
      {
        name: "resetToken",
        title: "Reset Token",
        type: "string",
        readOnly: true,
        hidden: false,
      },
      {
        name: "tokenExpiry",
        title: "Token Expiry",
        type: "datetime", // Change type to datetime
        readOnly: true,
        hidden: false,
      },
      
      {
        name: "officeName",
        title: "Office Name",
        readOnly: true,
        type: "string",
      },
    
      {
        name: "country",
        title: "Country",
        readOnly: true,
        type: "string",
      },
      {
        name: "city",
        title: "City",
        readOnly: true,
        type: "string",
      },
      {
        name: "zipCode",
        title: "Zip Code",
        readOnly: true,
        type: "string",
      },
      {
        name: "address",
        title: "Residence Address",
        readOnly: true,
        type: "string",
      },
      {
        name: "officialEmail",
        title: "Official Email",
        readOnly: true,
        type: "string",
      },
      {
        name: "title",
        title: "Title",
        readOnly: true,
        type: "string",
        options: {
          list: ["Mr", "Mrs", "Ms"],
        },
      },
      {
        name: "firstName",
        title: "First Name",
        readOnly: true,
        type: "string",
      },
      {
        name: "lastName",
        title: "Last Name",
        readOnly: true,
        type: "string",
      },
      {
        name: "phone",
        title: "Phone",
        readOnly: true,
        type: "string",
      },
      {
        name: "mobile",
        title: "Mobile No.",
        readOnly: true,
        type: "string",
      },
      {
        name: "position",
        title: "Position",
        readOnly: true,
        type: "string",
      },
   
    ],
    preview: {
      select:
    {
     
      title: "officeName",
    },
  },
  };
  