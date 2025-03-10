import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { bookingId} = await req.json();
    if (!bookingId) {
      return NextResponse.json({ error: "Booking ID is required" }, { status: 400 });
    }

    // ✅ Step 1: Fetch full booking details from Sanity
    const booking = await client.fetch(
      `*[_type == "booking" && _id == $bookingId][0]{
        airlineName,
        totalPrice,
        flights,
        passengers,
        phoneNumber,
        userEmail,
        emailAddress,
        adults,
        infants,
        children,
        meal
      }`,
      { bookingId }
    );
 

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // ✅ Step 2: Update status to "cancelled"
    await client.patch(bookingId).set({ status: "cancelled" }).commit();

    // ✅ Step 3: Prepare email content in HTML format
    const emailContent = `
      <h2 style="color: red;">Booking Cancelled</h2>
      <p>User <strong>${booking.userEmail}</strong> has cancelled their booking.</p>
     <p><strong>Phone Number:</strong> ${booking.phoneNumber}</p>
      <p><strong>Email Address:</strong> ${booking.emailAddress}</p>
      <p><strong>Airline:</strong> ${booking.airlineName}</p>
      <p><strong>Total Price:</strong> ${booking.totalPrice} PKR</p>
      <p><strong>Total Adults:</strong> ${booking.adults}</p>
      <p><strong>Total Children:</strong> ${booking.children}</p>
      <p><strong>Total Infants:</strong> ${booking.infants}</p>
     
      <p><strong>Meal:</strong> ${booking.meal}</p>

      <h3>Flights:</h3>
      <ul>
        ${booking.flights
          .map(
            (f: { date: string; flightNumber: string; originDestination: string, depOrReturn: string, time: string }) => 
              `<li><strong>${f.depOrReturn}</strong> - ${f.date}, Flight No: ${f.flightNumber}, Route: ${f.originDestination}, Time: ${f.time}</li>`
          )
          .join("")}
      </ul>

      <h3>Passengers:</h3>
      <ul>
        ${booking.passengers
          .map(
            (p: { name: string; surname: string; passportNumber: string, dob: string, passportExpiry: string, nationality: string }) => 
              `<li><strong>${p.name} ${p.surname}</strong> | Passport Number: ${p.passportNumber}, DOB: ${p.dob}, Expiry: ${p.passportExpiry}, Nationality: ${p.nationality}</li>`
          )
          .join("")}
      </ul>
    `;

    // ✅ Step 4: Send email notification
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "ubbrothersticketing@gmail.com",
      subject: `Ticket Booking Cancelled - ${new Date().toLocaleString()}`,
      html: emailContent, // ✅ Now email will include full booking details in HTML
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error cancelling booking:", error);
    return NextResponse.json({ error: "Failed to cancel booking" }, { status: 500 });
  }
}
