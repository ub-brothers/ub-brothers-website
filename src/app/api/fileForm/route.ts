import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { fullName, phone, email, country, message } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Replace with your email
        pass:  process.env.EMAIL_PASS, // Use Google App Password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "ubbrothersconsultant@gmail.com", // Replace with receiver's email
      subject: `New File and Consultancy Submission - ${new Date().toLocaleString()}`,
      html: `
        <h2>File and consultancy Details</h2>
        <p><strong>Full Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Country Want File and Consultancy for:</strong> ${country}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Submitted successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ success: false, message: "Failed to submit." }, { status: 500 });
  }
}
