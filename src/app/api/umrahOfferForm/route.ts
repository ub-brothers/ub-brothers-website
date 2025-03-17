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
    const { fullName, phoneNumber, email, nationality, message, daysOfUmrah, discountedPrice,discountedPriceForUsers, makkahHotel,madinaHotel, userEmail, madinaHotelDays, makkahHotelDays,title } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // .env.local file me define karein
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "samiaurooj286@gmail.com",
      subject: `New Umrah Offer Submission - ${new Date().toLocaleString()}`,
      html: `
        <h2>New Umrah Offer Submission</h2>
        <p><strong>Full Name:</strong> ${fullName}</p>
        <p><strong>Phone Number:</strong> ${phoneNumber}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Nationality:</strong> ${nationality}</p>
        <p><strong>Message:</strong> ${message}</p>
        <p><strong>Included Countries:</strong> ${daysOfUmrah}</p>
         <p><strong>Makkah Hotel:</strong> ${makkahHotel}</p>
          <p><strong>Madina Hotel:</strong> ${madinaHotel}</p>
        <p><strong>Discounted Price:</strong> PKR ${discountedPriceForUsers || discountedPrice}</p>
      `,
    };

    await transporter.sendMail(mailOptions);


    if (userEmail) { 
      const umrahOfferDoc = {
      _type: 'umrahOfferBooking',
      title:title,
      userEmail,
      daysOfUmrah:daysOfUmrah,
      createdAt: new Date().toISOString(),
      makkahHotel:makkahHotel,
      madinaHotel:madinaHotel,
      makkahHotelDays:makkahHotelDays,
      madinaHotelDays:madinaHotelDays,
    discountedPriceForUsers: discountedPriceForUsers,
     
    };

    await sanityClient.create(umrahOfferDoc);

    return NextResponse.json({ message: "Submitted Successfully!" });

  }else {
        return NextResponse.json({ message: "Email sent, but not stored (User not logged in)" }, { status: 200 });
      }}
       catch (error) {
    console.error("Email Send Error:", error);
    return NextResponse.json({ message: "Error Submission" }, { status: 500 });
  }
}
