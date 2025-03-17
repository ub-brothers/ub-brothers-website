import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function POST(req: Request) {
    try {
      const { userEmail } = await req.json();
    
  
      if (!userEmail) {
        return NextResponse.json({ error: "User email is required" }, { status: 400 });
      }

  
      const query = `*[_type == "iranOfferBooking" && userEmail == $userEmail]`;
     
  
      const bookings = await client.fetch(query, { userEmail });
  
    
  
      return NextResponse.json(bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
    }
  }
  