import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

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
        <p><strong>Total Cost:</strong>  ${totalCost} Sr</p>
      `,
      attachments,
    };

    await transporter.sendMail(mailOptions);
    
    return NextResponse.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json({ success: false, message: "Failed to send email." }, { status: 500 });
  }
}
