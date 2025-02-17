import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";


export const POST = async (req:Request) => {
  try {
    const formData = await req.formData();
    const fields: { [key: string]: string }  = {};
    const attachments = [];
    for (const entry of formData.entries()) {
      console.log(entry);
    }
    
    // Extract Text Fields & Files
    for (let [key, value] of formData.entries()) {
      if (value instanceof Blob) {
        // Handle File Uploads
        const buffer = Buffer.from(await value.arrayBuffer());
        const filePath = path.join("/tmp", value.name);
        fs.writeFileSync(filePath, buffer);

        attachments.push({
          filename: value.name,
          content: buffer, // ✅ Using content instead of path
        });
      } else {
        // Handle Text Fields
        fields[key] = value as string;
      }
    }

    // Nodemailer Transporter Setup
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "emailforclient88@gmail.com", 
        pass: "mwba rpmh ldur gmyg", 
      },
    });

    // Email Content in HTML
    const mailOptions = {
      from: "emailforclient88@gmail.com",
      to: "samiaurooj386@gmail.com",
      subject: `New E-Visa Application Submission - ${new Date().toLocaleString()}`,
      html: `
        <h2>Visa Application Details</h2>
        <p><strong>Visa Type:</strong> ${fields.visaType}</p>
        <p><strong>Nationality:</strong> ${fields.nationality}</p>
 
 <p><strong>Country want visa for:</strong> ${fields.countryName}</p>
        <p><strong>Full Name:</strong> ${fields.firstName}</p>
     
        <p><strong>Father's Name:</strong> ${fields.fatherName}</p>
        <p><strong>Gender:</strong> ${fields.gender}</p>
        
        
       
        <p><strong>Phone Number:</strong> ${fields.phone}</p>
        <p><strong>Email:</strong> ${fields.email}</p>
      
        <p><strong>Residence Address:</strong> ${fields.residenceAddress}</p>
        <p><strong>Passport Number:</strong> ${fields.passportNumber}</p>
      
  
        <p><strong>Arrival Date:</strong> ${fields.approximateArrivalDate}</p>
        <p><strong>Departure Date:</strong> ${fields.approximateDepartureDate}</p>
      `,
      attachments, // ✅ Images are properly attached
    };

    // Send Email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Submitted successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ message: "Failed to submit" }, { status: 500 });
  }
};

