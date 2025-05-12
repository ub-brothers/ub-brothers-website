import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import {client} from "@/sanity/lib/client"
import { createClient } from "@sanity/client";

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // Replace with your actual Project ID
  dataset: "production",
  useCdn: false,
  apiVersion: "2025-01-30",
  token: process.env.SANITY_API_TOKEN, // Add your Sanity API token in .env
});

export const POST = async (req:Request) => {
  try {
    const formData = await req.formData();
    const fields: { [key: string]: string }  = {};
    const attachments = [];
    for (const entry of formData.entries()) {
      console.log(entry);
    }
    const storedUserEmail = formData.get("storedUserEmail");
   
    for (let [key, value] of formData.entries()) {
      if (value instanceof Blob) {
      
        const buffer = Buffer.from(await value.arrayBuffer());
        const filePath = path.join("/tmp", value.name);
        fs.writeFileSync(filePath, buffer);

        attachments.push({
          filename: value.name,
          content: buffer, 
        });
      } else {
        
        fields[key] = value as string;
      }
    }

    
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "emailforclient88@gmail.com", 
        pass: "mwba rpmh ldur gmyg", 
      },
    });

   
    const mailOptions = {
      from: "emailforclient88@gmail.com",
      to: "ubbrothersconsultant@gmail.com",
      subject: `New E-Visa Application Submission - ${new Date().toLocaleString()}`,
      html: `
        <h2>E-Visa Application Details</h2>
        <p><strong>Visa Type:</strong> ${fields.visaType}</p>
        <p><strong>Nationality:</strong> ${fields.nationality}</p>
 
 <p><strong>Visa Country:</strong> ${fields.countryName}</p>
 <p><strong>Visa Cost:</strong> ${fields.prizeForUsers || fields.prize}</p>
        <p><strong>Full Name:</strong> ${fields.firstName}</p>
     
        <p><strong>Father's Name:</strong> ${fields.fatherName}</p>
        <p><strong>Gender:</strong> ${fields.gender}</p>
        
        
       
        <p><strong>Phone Number:</strong> ${fields.phone}</p>
        <p><strong>Email:</strong> ${fields.email}</p>
      
        <p><strong>Residence Address:</strong> ${fields.residenceAddress}</p>
        <p><strong>Passport Number:</strong> ${fields.passportNumber}</p>
      
      `,
      attachments,
    };

    // Send Email
    await transporter.sendMail(mailOptions);
  
    // ✅ Store in Sanity Only if User is Logged In
    if (storedUserEmail) {
      const visaDoc = {
        _type: "visaBooking",
        userEmail: storedUserEmail,
        countryName: fields.countryName,
        createdAt: new Date().toISOString(),
        prize: fields.prizeForUsers || fields.prize,
        firstName: fields.firstName,
       
       
      };

      await sanityClient.create(visaDoc);

    return NextResponse.json({ message: "Submitted successfully!" }, { status: 200 });
  }else {
    return NextResponse.json({ message: "Email sent, but not stored (User not logged in)" }, { status: 200 });
  }}
   catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ message: "Failed to submit" }, { status: 500 });
  }
};

