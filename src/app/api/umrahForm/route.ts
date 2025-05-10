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
    const formData = await req.formData();
    const name = formData.get("name");
    const phone = formData.get("phone");
    const days = formData.get("days");
    const makkahHotel = formData.get("makkahHotel");
    const makkahDay = formData.get("makkahDay");
    const makkahCategory = formData.get("makkahCategory");
    const madinaHotel = formData.get("madinaHotel");
    const madinaDay = formData.get("madinaDay");
    const madinaCategory = formData.get("madinaCategory");
    const visaStatus = formData.get("visaStatus");
    const nationality = formData.get("nationality");
    const totalCost = formData.get("totalCost");
    const userEmail = formData.get("userEmail");
    
    
    const personalPhoto = formData.get("personalPhoto");
    const passportScan = formData.get("passportScan");
    
    let attachments = [];
    if (personalPhoto && personalPhoto instanceof Blob) {
      attachments.push({
        filename: personalPhoto.name,
        content: Buffer.from(await personalPhoto.arrayBuffer()),
      });
    }
    if (passportScan && passportScan instanceof Blob) {
      attachments.push({
        filename: passportScan.name,
        content: Buffer.from(await passportScan.arrayBuffer()),
      });
    }

    
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "ubbrothersticketing@gmail.com",
      subject: `New Umrah Booking Submission - ${new Date().toLocaleString()}`,
      html: `
       <h2>Umrah Booking Application Details</h2>
    <p> <strong>  Name:</strong>  ${name}</p>
      <p> <strong> Phone:</strong>  ${phone}</p>
       <p> <strong>Selected Days:</strong>  ${days}</p>
        <p><strong>Makkah Hotel:</strong>  ${makkahHotel}</p>
       <p><strong>Makkah Day:</strong>   ${makkahDay}</p>
        <p><strong>Makkah Room Category:</strong>  ${makkahCategory}</p>
        <p><strong>Madina Hotel:</strong>  ${madinaHotel}</p>
        <p><strong>Madina Day:</strong>  ${madinaDay}</p>
       <p> <strong>Madina Room Category:</strong>  ${madinaCategory}</p>
       <p> <strong>Visa Status:</strong>  ${visaStatus}</p>
       <p><strong> Nationality:</strong> ${nationality}</p>
        <p><strong>Total Cost:</strong>  ${totalCost} SAR/-</p>
      `,
      attachments,
    };

    await transporter.sendMail(mailOptions);

    if (userEmail) {

const rateQuery = `*[_type == "exchangeRate"][0]{ sarToPkr }`;
      const { sarToPkr } = await sanityClient.fetch(rateQuery);

      const umrahDoc = {

        _type: "umrahBooking",
        userEmail: userEmail,
        createdAt: new Date().toISOString(),
        name: name,
        days: days,
        makkahHotel: makkahHotel,
        makkahDay:makkahDay,
        makkahCategory: makkahCategory,
        madinaHotel:madinaHotel,
        madinaDay:madinaDay,
        madinaCategory:madinaCategory,
        totalCost:totalCost,
        visaStatus:visaStatus,
        sarRateAtBooking: sarToPkr,
      };

      await sanityClient.create(umrahDoc);

    
    return NextResponse.json({ success: true, message: "Email sent successfully!" });
  } else {
      return NextResponse.json({ message: "Email sent, but not stored (User not logged in)" }, { status: 200 });
    }}
    catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json({ success: false, message: "Failed to send email." }, { status: 500 });
  }
}
