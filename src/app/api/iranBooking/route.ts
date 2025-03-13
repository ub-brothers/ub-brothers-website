
import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function POST(req: Request) {
    try {
      const { storedUserEmail } = await req.json();
    
  
      if (!storedUserEmail) {
        return NextResponse.json({ error: "User email is required" }, { status: 400 });
      }

  
      const query = `*[_type == "iranBooking" && storedUserEmail == $storedUserEmail] | order(createdAt asc)`;
     
  
      const bookings = await client.fetch(query, { storedUserEmail });
    
  
      return NextResponse.json(bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
    }
  }
  