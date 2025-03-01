import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { airlineName, meal, price, adults, infants, passengers, flights } =
      await req.json();

    // Nodemailer Transporter Setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "ubbrothersticketing@gmail.com",
      subject: `New Ticket Booking - ${new Date().toLocaleString()}`,
      html: `
     <p><strong>Airline</strong>: ${airlineName}</p> 
   <p><strong>Price per Person(Adult)</strong>: ${price}</p> 
<p><strong>Total Adults</strong>: ${adults}</p>
<p><strong>Total Infants</strong>: ${infants}</p>

<p><strong>Flights:</strong></p>
${flights
  .map(
    (flight: any, index: number) =>
      `<p>${index + 1}. <strong>${flight.depOrReturn}</strong> - ${flight.date}, <strong>Flight No</strong>: ${
        flight.flightNumber
      }, <strong>Route</strong>: ${flight.originDestination}, <strong>Time</strong>: ${flight.time}, <strong>Meal</strong>: ${meal}</p>`
  )
  .join("\n")}

<p><strong>Passengers:</strong></p>
${passengers
  .map(
    (p: any, index: number) =>
      `<p>${index + 1}. <strong>Type</strong>: ${p.type}, <strong>Name</strong>: ${p.name} ${p.surname}, <strong>Passport Number</strong>: ${
        p.passportNumber
      }, <strong>Date of Birth</strong>: ${p.dob}, <strong>Passport Expiry</strong>: ${p.passportExpiry}, <strong>Nationality</strong>: ${p.nationality}</p>`
  )
  .join("\n")}`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Booking confirmed!" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
