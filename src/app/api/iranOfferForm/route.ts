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
    const { fullName, phoneNumber, email, nationality, message, destination, route, discountedPrice , discountedPriceForUsers, userEmail,title} = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // .env.local file me define karein
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "ubbrotherspk@gmail.com",
      subject: `New Iran Ziyarat Offer Submission - ${new Date().toLocaleString()}`,
      html: `
        <h2>New Iran Ziyarat Offer Submission</h2>
        <p><strong>Full Name:</strong> ${fullName}</p>
        <p><strong>Phone Number:</strong> ${phoneNumber}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Nationality:</strong> ${nationality}</p>
        
        <p><strong>Destination:</strong> ${destination}</p>
          <p><strong>Route:</strong> ${route}</p>
        <p><strong>Discounted Price:</strong> $${discountedPriceForUsers || discountedPrice}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    if (userEmail) { 
      const iranOfferDoc = {
      _type: 'iranOfferBooking',
      title:title,
      userEmail,
      createdAt: new Date().toISOString(),
      destination:destination,
      route:route,
    discountedPriceForUsers: discountedPriceForUsers,
     
    };

    await sanityClient.create(iranOfferDoc);


    return NextResponse.json({ message: "Submitted Successfully!" });

  } else {
      return NextResponse.json({ message: "Email sent, but not stored (User not logged in)" }, { status: 200 });
    }}
   catch (error) {
    console.error("Email Send Error:", error);
    return NextResponse.json({ message: "Error Submission" }, { status: 500 });
  }
}
