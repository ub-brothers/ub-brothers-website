import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userName, userNumber, userEmail, shortDescription, selectedCategory, selectedPrize, userMessage } = body;

    if (!userName || !userNumber || !userEmail || !shortDescription || !selectedCategory || !selectedPrize) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    // 📌 Nodemailer Setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // .env.local میں اپنی Gmail ڈالیں
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "ubbrotherspk@gmail.com", // یہاں اپنی email ڈالیں
      subject:`New Hajj Booking Submission - ${new Date().toLocaleString()}`,
      html: `
        <p><strong>Full Name</strong>: ${userName}</p>
        <p><strong>Phone Number</strong>: ${userNumber}</p> 
        <p><strong>Email</strong>: ${userEmail}</p> 
        <p><strong>Day Duration</strong>: ${shortDescription}</p>
        <p><strong>Category</strong>: ${selectedCategory}</p>
        <p><strong>Price</strong>: ${selectedPrize}</p>
        <p><strong>Message</strong>: ${userMessage}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Booking Submitted Successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Email Sending Error:", error);
    return NextResponse.json({ success: false, message: "Error sending email" }, { status: 500 });
  }
}
