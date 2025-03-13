import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // Replace with your actual Project ID
  dataset: "production",
  useCdn: false,
  apiVersion: "2025-01-30",
  token: process.env.SANITY_API_TOKEN, // Add your Sanity API token in .env
});
interface VisaBooking {
  _id: string;
  visaType: string;
  countryName: string;
  fullName: string;
  price: number;
  priceForUsers?: number;
  createdAt: string;
}


export const POST = async (req: Request) => {
  try {
    const { userEmail } = await req.json();

    if (!userEmail) {
      return NextResponse.json({ error: "User email is required" }, { status: 400 });
    }

    const visaQuery = `*[_type == "visaBooking" && userEmail == $userEmail] | order(createdAt asc)`;
    const stickerQuery = `*[_type == "stickerVisaBooking" && userEmail == $userEmail] | order(createdAt asc)`;
    const [visaBookings, stickerBookings]: [any[], any[]] = await Promise.all([
      sanityClient.fetch(visaQuery, { userEmail }),
      sanityClient.fetch(stickerQuery, { userEmail }),
    ]);
    const formattedStickerBookings: VisaBooking[] = stickerBookings.map((booking:any) => ({
      _id: booking._id,
      visaType: "Sticker Visa",
      countryName: booking.countryName,
      fullName: booking.fullName || booking.firstName,
      price: booking.price || booking.prize,
      priceForUsers: booking.priceForUsers || booking.prizeForUsers, // Normalize price for users
      createdAt: booking.createdAt,
    }));

    const formattedVisaBookings: VisaBooking[] = visaBookings.map((booking:any) => ({
      _id: booking._id,
      visaType: "E-Visa",
      countryName: booking.countryName,
      fullName: booking.firstName|| booking.fullName, // Convert `firstName` to `fullName`
      price: booking.prize || booking.price,
      priceForUsers: booking.prizeForUsers || booking.priceForUsers, // Normalize price for users
      createdAt: booking.createdAt,
    }));
    const params = { userEmail };

    const allBookings = [...formattedVisaBookings, ...formattedStickerBookings];

    return NextResponse.json(allBookings, { status: 200 });
  } catch (error) {
    console.error("Error fetching visa applications:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
};
