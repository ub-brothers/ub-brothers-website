import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, phone, email, days, makkahHotel, madinaHotel, roomCategory, totalCost, message } = await req.json();

    if (!name || !phone || !email || !days || !makkahHotel || !madinaHotel || !roomCategory || !totalCost) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Set in .env file
        pass: process.env.EMAIL_PASS, // Set in .env file
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "ubbrotherspk@gmail.com", // Change this to your recipient email
      subject: `New Hajj Booking Request - ${new Date().toLocaleString()}`,
      html: `
        <h2>New Hajj Booking Details</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Days:</strong> ${days}</p>
        <p><strong>Makkah Hotel:</strong> ${makkahHotel}</p>
        <p><strong>Madina Hotel:</strong> ${madinaHotel}</p>
        <p><strong>Room Category:</strong> ${roomCategory}</p>
        <p><strong>Total Cost:</strong> $${totalCost}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: "Email sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
