import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";



export const POST = async (req) => {
  try {
    const formData = await req.formData();
    const fields = {};
    const attachments = [];
    console.log([...formData.entries()]);
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
        fields[key] = value;
      }
    }

    // Nodemailer Transporter Setup
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "emailforclient88@gmail.com", // Apna email
        pass: "mwba rpmh ldur gmyg", // Apna app password
      },
    });

    // Email Content in HTML
    const mailOptions = {
      from: "emailforclient88@gmail.com",
      to: "samiaurooj386@gmail.com",
      subject: "New Visa Application Submission",
      html: `
        <h2>Visa Application Details</h2>
        <p><strong>Visa Type:</strong> ${fields.visaType}</p>
        <p><strong>Nationality:</strong> ${fields.nationality}</p>
        <p><strong>First Name:</strong> ${fields.firstName}</p>
        <p><strong>Surname:</strong> ${fields.surname}</p>
        <p><strong>Father's Name:</strong> ${fields.fatherName}</p>
        <p><strong>Gender:</strong> ${fields.gender}</p>
        <p><strong>Former Nationality:</strong> ${fields.formerNationality}</p>
         <p><strong>Place of Birth:</strong> ${fields.placeOfIssue}</p>
        <p><strong>Place of Birth:</strong> ${fields.placeOfBirth}</p>
        <p><strong>Date of Birth:</strong> ${fields.dateOfBirth}</p>
        <p><strong>Marital Status:</strong> ${fields.maritalStatus}</p>
        <p><strong>Occupation:</strong> ${fields.occupation}</p>
        <p><strong>Phone Number:</strong> ${fields.phone}</p>
        <p><strong>Email:</strong> ${fields.email}</p>
        <p><strong>Zip Code:</strong> ${fields.zipCode}</p>
        <p><strong>Residence Address:</strong> ${fields.residenceAddress}</p>
        <p><strong>Passport Number:</strong> ${fields.passportNumber}</p>
        <p><strong>Type of Passport:</strong> ${fields.passportType}</p>
        <p><strong>Date of Issue:</strong> ${fields.dateOfIssue}</p>
        <p><strong>Date of Expiration:</strong> ${fields.dateOfExpiration}</p>
        <p><strong>Duration of Stay:</strong> ${fields.durationOfStay}</p>
        <p><strong>Type of Entry:</strong> ${fields.entryType}</p>
        <p><strong>Arrival Date:</strong> ${fields.approximateArrivalDate}</p>
        <p><strong>Departure Date:</strong> ${fields.approximateDepartureDate}</p>
      `,
      attachments, // ✅ Images are properly attached
    };

    // Send Email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Email sent successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ message: "Failed to send email" }, { status: 500 });
  }
};

