import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const name = formData.get("name");
    const phone = formData.get("phone");
    const days = formData.get("days");
    const makkahHotel = formData.get("makkahHotel");
    const makkahCategory = formData.get("makkahCategory");
    const madinaHotel = formData.get("madinaHotel");
    const madinaCategory = formData.get("madinaCategory");
    const visaStatus = formData.get("visaStatus");
    const totalCost = formData.get("totalCost");
    
    // Handle file attachments (if any)
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

    // Nodemailer setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email app password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "samiaurooj386@gmail.com", // Change to the email where you want to receive details
      subject: `New Umrah Booking request - ${new Date().toLocaleString()}`,
      text: `
        Name: ${name}
        Phone: ${phone}
        Selected Days: ${days}
        Makkah Hotel: ${makkahHotel}
        Makkah Room Category: ${makkahCategory}
        Madina Hotel: ${madinaHotel}
        Madina Room Category: ${madinaCategory}
        Visa Status: ${visaStatus}
        Total Cost: ${totalCost} PKR
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
