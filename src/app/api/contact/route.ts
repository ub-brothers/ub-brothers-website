import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone,   message } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "emailforclient88@gmail.com",
        pass: "mwba rpmh ldur gmyg", // Use Google App Password instead of real password
      },
    });

    const mailOptions = {
      from: email,
      to: "samiaurooj386@gmail.com", // Jahan aapko email receive karni hai
      subject: `Contact Inquery - ${new Date().toLocaleString()}`,
      html: `
        <h2>Visa Inquiry Details</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
       
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
