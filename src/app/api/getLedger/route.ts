import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // Replace with your actual Project ID
  dataset: "production",
  useCdn: false,
  apiVersion: "2025-01-30",
  token: process.env.SANITY_API_TOKEN, // Add your Sanity API token in .env
});

export const ledgerQuery = `{
  "Tickets": *[_type == "booking" && userEmail == $userEmail && isConfirmed == true] | order(createdAt asc),
  "File & Consultancy": *[_type == "fileBooking" && userEmail == $userEmail] | order(createdAt asc),
  "Iran Ziyarat": *[_type == "iranBooking" && (userEmail == $userEmail || storedUserEmail == $userEmail)] | order(createdAt asc),
  "Sticker Visa": *[_type == "stickerVisaBooking" && userEmail == $userEmail] | order(createdAt asc),
  "Hajj Package": *[_type == "hajjBooking" && (userEmail == $userEmail || storedUserEmail == $userEmail)] | order(createdAt asc),
  "Tour Package": *[_type == "tourBooking" && userEmail == $userEmail] | order(createdAt asc),
  "Umrah Package": *[_type == "umrahBooking" && userEmail == $userEmail] | order(createdAt asc),
  "E-Visa": *[_type == "visaBooking" && userEmail == $userEmail] | order(createdAt asc)
}`;
const cleanPrice = (price: any): number => {
  if (typeof price === "number") return price; // If already a number, return as is
  if (typeof price !== "string") return 0; // If not a string, return 0

  // Remove non-numeric characters (e.g., "PKR", "/-", commas, etc.)
  const cleanedPrice = price.replace(/[^0-9.]/g, "");

  // Convert to a number
  return parseFloat(cleanedPrice) || 0;
};
const SAR_TO_PKR_RATE = 75;
const convertSARtoPKR = (priceInSAR: number): number => {
  return priceInSAR * SAR_TO_PKR_RATE;
};

export const POST = async (req: Request) => {
  try {
    const { storedUserEmail } = await req.json();

    if (!storedUserEmail) {
      return NextResponse.json({ error: "User email is required" }, { status: 400 });
    }

    // Fetch data from Sanity using the ledgerQuery
    const bookings = await sanityClient.fetch(ledgerQuery, { userEmail: storedUserEmail });

    // Calculate total cost
    let totalCost = 0;
    const categories = ["Tickets", "File & Consultancy", "Iran Ziyarat", "Sticker Visa", "Hajj Package", "Tour Package", "Umrah Package", "E-Visa"];
    categories.forEach((category) => {
      if (bookings[category]) {
        bookings[category].forEach((item: any) => {
          const totalPrice = cleanPrice(item.totalPrice);
          const prize = cleanPrice(item.prize);
          const prizeForUsers = cleanPrice(item.prizeForUsers);
          const price = cleanPrice(item.price);
          const priceForUsers = cleanPrice(item.priceForUsers);
          const selectedPrize = cleanPrice(item.selectedPrize);
          let totalCostField = cleanPrice(item.totalCost); 
          const Prize = cleanPrice(item.Prize);

           if (category === "Umrah Package") {
            totalCostField = convertSARtoPKR(totalCostField);
            item.totalCost = totalCostField;
          }


            totalCost +=
            totalPrice +
            prize +
            prizeForUsers +
            price +
            priceForUsers +
            selectedPrize +
            totalCostField +
            Prize;
        });
      }
    });

    return NextResponse.json({ bookings, totalCost }, { status: 200 });
  } catch (error) {
    console.error("Error fetching ledger data:", error);
    return NextResponse.json({ error: "Failed to fetch ledger data" }, { status: 500 });
  }
};