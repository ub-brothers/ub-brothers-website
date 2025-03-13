import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { createClient } from "@sanity/client";

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // Replace with your actual Project ID
  dataset: "production",
  useCdn: false,
  apiVersion: "2025-01-30",
  token: process.env.SANITY_API_TOKEN, // Add your Sanity API token in .env
});


export async function POST(req: NextRequest) {
  try {
    const { fullName, phone, email, country,price, message,priceForUsers, userEmail } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass:  process.env.EMAIL_PASS, 
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "ubbrothersconsultant@gmail.com", 
      subject: `New Tour Package Submission - ${new Date().toLocaleString()}`,
      html: `
        <h2>Tour Package Details</h2>
        <p><strong>Full Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Country Want Package for:</strong> ${country}</p>
          <p><strong>Cost Per Person:</strong> ${priceForUsers || price}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };


    await transporter.sendMail(mailOptions);


    if (userEmail) {
      const tourDoc = {
        _type: "tourBooking",
        userEmail: userEmail,
        country: country,
        createdAt: new Date().toISOString(),
        price: priceForUsers || price,
        fullName: fullName,
      };

      await sanityClient.create(tourDoc);

    return NextResponse.json({ success: true, message: "Submitted successfully!" }, { status: 200 });
  } else {
    return NextResponse.json({ message: "Email sent, but not stored (User not logged in)" }, { status: 200 });
  }}
  catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ success: false, message: "Failed to submit." }, { status: 500 });
  }
}
