import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { createClient } from "@sanity/client";
import { v4 as uuidv4 } from "uuid"; 



const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // Replace with your actual Project ID
  dataset: "production",
  useCdn: false,
  apiVersion: "2025-01-30",
  token: process.env.SANITY_API_TOKEN, // Add your Sanity API token in .env
});
type Flight = {
  _key?: string;
  depOrReturn: string;
  date: string;
  flightNumber: string;
  originDestination: string;
  time: string;
};

type Passenger = {
  _key?: string;
  type: string;
  name: string;
  surname: string;
  passportNumber: string;
  dob: string;
  passportExpiry: string;
  nationality: string;
};


export async function POST(req: Request) {


  
  try {
    
    const body = await req.json();

    // ✅ Yeh Step Zaroori Hai (TypeScript Ko Bata Raha Hai ke yeh kis Type ka Data Hai)
    const {
      airlineName,
     
      meal,
      totalPrice,
      adults,
      infants,
      children,
      passengers,
      flights,
      phoneNumber,
      emailAddress,
      storedUserEmail,
      userEmail,
    }: {
      airlineName: string;
      
      meal: string;
      totalPrice: number;
      adults: number;
      infants: number;
      children: number;
      passengers: Passenger[];
      flights: Flight[];
      phoneNumber: string;
      storedUserEmail:string;
      emailAddress: string;
      userEmail: string;
    } = body;




      const updatedPassengers: Passenger[] = passengers.map((passenger:Passenger) => ({
        ...passenger,
        _key: uuidv4(),
      }));


  
      const updatedFlights: Flight[] = flights.map((flight:Flight) => ({
        ...flight,
        _key: uuidv4(),
      }));

  // 1️⃣ **Save Booking Data to Sanity**
  if (storedUserEmail) {
  const bookingDoc = {
    _type: "booking",
    userEmail: storedUserEmail, 
    emailAddress, // Store user email
    airlineName,
    createdAt: new Date().toISOString(),
    meal,
    totalPrice,
    adults,
    infants,
    children,
    phoneNumber,
    isConfirmed: false,
    flights:updatedFlights,
    passengers:updatedPassengers,
    
  };

  await sanityClient.create(bookingDoc);
}


    
    

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
      to: "samiaurooj386@gmail.com",
      subject: `New Ticket Booking - ${new Date().toLocaleString()}`,
      html: `
     <p><strong>Airline</strong>: ${airlineName}</p> 
   <p><strong>Total Price (Adults)</strong>: ${totalPrice}</p> 
<p><strong>Total Adults</strong>: ${adults}</p>
<p><strong>Total Child</strong>: ${children}</p>
<p><strong>Total Infants</strong>: ${infants}</p>
<p><strong>Phone Number</strong>: ${phoneNumber}</p>
<p><strong>Email Address</strong>: ${emailAddress}</p>
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
