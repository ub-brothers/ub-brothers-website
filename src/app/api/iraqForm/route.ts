import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { userName, userNumber, userEmail, userMessage, countryName, shortDescription, prize } = await req.json();

    
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });

    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "ubbrothersconsultant@gmail.com", 
      subject:`New  Iran, Iraq Ziyarat Booking Submission - ${new Date().toLocaleString()}` ,
      html: `
        <h2>New Booking Details</h2>
        <p><strong>Name:</strong> ${userName}</p>
        <p><strong>Phone:</strong> ${userNumber}</p>
        <p><strong>Email:</strong> ${userEmail}</p>
        <p><strong>Ziyarat To:</strong> ${countryName}</p>
        <p><strong>Ziyarat Route:</strong> ${shortDescription}</p>
        <p><strong>Price:</strong> ${prize} PKR/-</p>
        <p><strong>Message:</strong> ${userMessage || "No message provided"}</p>
      `,
    };

 
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Submitted successfully!" });
  } catch (error) {
    console.error("Email Error:", error);
    return NextResponse.json({ success: false, message: "Submission failed!" }, { status: 500 });
  }
}
