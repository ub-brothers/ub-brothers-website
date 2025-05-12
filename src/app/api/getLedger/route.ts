import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // Replace with your actual Project ID
  dataset: "production",
  useCdn: false,
  apiVersion: "2025-01-30",
  token: process.env.SANITY_API_TOKEN, // Add your Sanity API token in .env
});

const ledgerQuery = `{
  "Tickets": *[_type == "booking" && userEmail == $userEmail] | order(createdAt asc),
  "File & Consultancy": *[_type == "fileBooking" && userEmail == $userEmail] | order(createdAt asc),
  "Iran Ziyarat": *[_type == "iranBooking" && (userEmail == $userEmail || storedUserEmail == $userEmail)] | order(createdAt asc),
  "Sticker Visa": *[_type == "stickerVisaBooking" && userEmail == $userEmail] | order(createdAt asc),
  "Hajj Package": *[_type == "hajjBooking" && (userEmail == $userEmail || storedUserEmail == $userEmail)] | order(createdAt asc),
  "Tour Package": *[_type == "tourBooking" && userEmail == $userEmail] | order(createdAt asc),
  "Umrah Package": *[_type == "umrahBooking" && userEmail == $userEmail] | order(createdAt asc),
  "E-Visa": *[_type == "visaBooking" && userEmail == $userEmail] | order(createdAt asc),
   "Visa Offer": *[_type == "visaOfferBooking" && userEmail == $userEmail] | order(createdAt asc),
    "Iran Ziyarat Offer": *[_type == "iranOfferBooking" && userEmail == $userEmail] | order(createdAt asc),
    "Hajj Offer": *[_type == "hajjOfferBooking" && userEmail == $userEmail] | order(createdAt asc),
    "Umrah Offer": *[_type == "umrahOfferBooking" && userEmail == $userEmail] | order(createdAt asc)
}`;
const cleanPrice = (price: any): number => {
  if (typeof price === "number") return price; // If already a number, return as is
  if (typeof price !== "string") return 0; // If not a string, return 0

  // Remove non-numeric characters (e.g., "PKR", "/-", commas, etc.)
  const cleanedPrice = price.replace(/[^0-9.]/g, "");

  // Convert to a number
  return parseFloat(cleanedPrice) || 0;
};

const exchangeRateQuery = `*[_type == "exchangeRate"][0] {
  sarToPkr,
  usdToPkr
}`;



export const POST = async (req: Request) => {
  try {
    const { storedUserEmail } = await req.json();

    if (!storedUserEmail) {
      return NextResponse.json({ error: "User email is required" }, { status: 400 });
    }

const { sarToPkr = 75, usdToPkr = 280 } = await sanityClient.fetch(exchangeRateQuery);

// Conversion helpers
const convertSARtoPKR = (price: number) => price * sarToPkr;
const convertUSDtoPKR = (price: number) => price * usdToPkr;



    
    const bookings = await sanityClient.fetch(ledgerQuery, { userEmail: storedUserEmail });

    
    let totalCost = 0;
    let totalPaid = 0;
    let totalDue = 0;
    const categories = ["Tickets", "File & Consultancy", "Iran Ziyarat", "Sticker Visa", "Hajj Package", "Tour Package", "Umrah Package", "E-Visa", "Visa Offer", "Iran Ziyarat Offer", "Hajj Offer", "Umrah Offer"];
    categories.forEach((category) => {
      if (bookings[category]) {
        bookings[category].forEach((item: any) => {
            let basePrice =
            cleanPrice(item.totalCost) ||
            cleanPrice(item.totalPrice) ||
            cleanPrice(item.prize) ||
            cleanPrice(item.prizeForUsers) ||
            cleanPrice(item.price) ||
            cleanPrice(item.priceForUsers) ||
            cleanPrice(item.selectedPrize) ||
            cleanPrice(item.Prize) ||
            cleanPrice(item.discountedPriceForUsers) ||
            0;

 let paid = cleanPrice(item.paid || 0);
          let due = cleanPrice(item.due || 0);

const sarRate = item.sarRateAtBooking || sarToPkr;
const usdRate = item.usdRateAtBooking || usdToPkr;

     if (category === "Umrah Package") {
         basePrice = basePrice * sarRate;
  paid = paid * sarRate;
  due = due * sarRate;
          }

          if (category === "Iran Ziyarat" || category === "Iran Ziyarat Offer") {
             basePrice = basePrice * usdRate;
  paid = paid * usdRate;
  due = due * usdRate;
          }

          item.totalCost = basePrice;
          item.paid = paid;
          item.due = due;

          totalCost += basePrice;
          totalPaid += paid;
          totalDue += due;

        });
      }
    });

    return NextResponse.json({ bookings, totalCost, totalPaid,totalDue, exchangeRates: { sarToPkr, usdToPkr } }, { status: 200 });
  } catch (error) {
    console.error("Error fetching ledger data:", error);
    return NextResponse.json({ error: "Failed to fetch ledger data" }, { status: 500 });
  }
};