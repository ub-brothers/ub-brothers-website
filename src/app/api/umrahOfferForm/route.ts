import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { fullName, phoneNumber, email, nationality, message, daysOfUmrah, discountedPrice,discountedPriceForUsers } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // .env.local file me define karein
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "ubbrothersticketing@gmail.com",
      subject: `New Umrah Offer Submission - ${new Date().toLocaleString()}`,
      html: `
        <h2>New Umrah Offer Submission</h2>
        <p><strong>Full Name:</strong> ${fullName}</p>
        <p><strong>Phone Number:</strong> ${phoneNumber}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Nationality:</strong> ${nationality}</p>
        <p><strong>Message:</strong> ${message}</p>
        <p><strong>Included Countries:</strong> ${daysOfUmrah}</p>
        <p><strong>Discounted Price:</strong> PKR ${discountedPriceForUsers || discountedPrice}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "Submitted Successfully!" });

  } catch (error) {
    console.error("Email Send Error:", error);
    return NextResponse.json({ message: "Error Submission" }, { status: 500 });
  }
}
