
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { createClient } from "@sanity/client";

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // Replace with your actual Project ID
  dataset: "production",
  useCdn: false,
  apiVersion: "2025-01-30",
  token: process.env.SANITY_API_TOKEN, // Add your Sanity API token in .env
});

export async function POST(req: Request) {
  try {
    const { userName, userNumber, userEmail, userMessage, countryName, shortDescription, prize, priceForUsers, storedUserEmail } = await req.json();

    
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });

    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "ubbrotherspk@gmail.com", 
      subject:`New  Iran, Iraq Ziyarat Booking Submission - ${new Date().toLocaleString()}` ,
      html: `
        <h2>New Booking Details</h2>
        <p><strong>Name:</strong> ${userName}</p>
        <p><strong>Phone:</strong> ${userNumber}</p>
        <p><strong>Email:</strong> ${userEmail}</p>
        <p><strong>Ziyarat To:</strong> ${countryName}</p>
        <p><strong>Ziyarat Route:</strong> ${shortDescription}</p>
        <p><strong>Price:</strong> ${priceForUsers || prize} PKR/-</p>
        <p><strong>Message:</strong> ${userMessage || "No message provided"}</p>
      `,
    };


 
    await transporter.sendMail(mailOptions);

    if (storedUserEmail) { 
      const iranBookingDoc = {
      _type: 'iranBooking',
      storedUserEmail:storedUserEmail,
      shortDescription:shortDescription,
      countryName:countryName,
      userName:userName,
      createdAt: new Date().toISOString(),
      prize:priceForUsers || prize,

     
    };

    await sanityClient.create(iranBookingDoc);

    return NextResponse.json({ success: true, message: "Submitted successfully!" });
  }else {
    return NextResponse.json({ message: "Email sent, but not stored (User not logged in)" }, { status: 200 });
  }}
   catch (error) {
    console.error("Email Error:", error);
    return NextResponse.json({ success: false, message: "Submission failed!" }, { status: 500 });
  }
}
