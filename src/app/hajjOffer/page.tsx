"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { useRouter } from "next/navigation";
import { jwtDecode } from 'jwt-decode';

type HajjOfferType = {
  id: string;
  title: string;
  dateOfHajj: string;
  totalDays:string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  originalPriceForUsers: number;
  discountedPriceForUsers: number;
  image1: string;
  image2: string;
  ticketHead: string;
  airlineName: string;
  airlineImage: string;
  dep: string;
  flightNum1: string;
  dateOfFlight1: string;
  route1: string;
  time1: string;
  return: string;
  flightNum2: string;
  dateOfFlight2: string;
  route2: string;
  time2: string;
  makkahHotel: string;
  madinaHotel: string;
  food: string;
  transport: string;
  holyziarat: string;
};

export default function HajjOfferCard() {
  const [isApprovedUser, setIsApprovedUser] = useState(false);
  const [offer, setOffer] = useState<HajjOfferType | null>(null);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        setIsApprovedUser(decoded.approved === true || decoded.approved === "true");
      } catch (error) {
        console.error("Invalid token", error);
      }
    }

    const fetchOffer = async () => {
      try {
        const data: HajjOfferType = await client.fetch(`*[_type == "hajjOffer"][0] {
          title,
          "image1": image1.asset->url,
          "image2": image2.asset->url,
          dateOfHajj,
          totalDays,
          description,
          originalPrice,
          discountedPrice,
          originalPriceForUsers,
          discountedPriceForUsers,
          makkahHotel,
          madinaHotel,
          food,
          transport,
          holyziarat,
          ticketHead,
          airlineName,
          "airlineImage": airlineImage.asset->url,
          dep,
          flightNum1,
          dateOfFlight1,
          route1,
          time1,
          return,
          flightNum2,
          dateOfFlight2,
          route2,
          time2
        }`);
        console.log("Fetched Data:", data);
        setOffer(data);
      } catch (error) {
        console.error("Failed to fetch offer:", error);
      }
    };
    fetchOffer();
  }, []);

  if (!offer || Object.keys(offer).length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <h1 className="sm:text-6xl text-xl min-w-[700px] font-bold text-gray-500">No Offer Available Now</h1>
      </div>
    );
  }

  const router = useRouter();
  const handleApplyNow = () => {
    const queryParams = new URLSearchParams({
      totalDays:offer.totalDays,
      makkahHotel:offer.makkahHotel,
      madinaHotel:offer.madinaHotel,
      title: offer.title,
      originalPrice: offer.originalPrice.toString(),
      discountedPrice: offer.discountedPrice.toString(),
      discountedPriceForUsers: offer.discountedPriceForUsers.toString(),
      dateOfHajj: offer.dateOfHajj,
    }).toString();
    router.push(`/hajjOfferForm?${queryParams}`);
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden p-8 border border-gray-300 mt-10 mb-10">
      {/* Offer Heading */}
      <h2 className="text-4xl font-serif font-bold text-gray-900 text-center mb-8">
        <u>{offer.title}</u>
      </h2>

      {/* Images */}
      <div className="flex gap-6 justify-center mb-8">
        <div className="relative md:w-1/2">
          <Image src={offer.image1} alt="Image 1" width={500} 
    height={300}  className="rounded-xl" />
        </div>
        <div className="relative md:w-1/2">
          <Image src={offer.image2} alt="Image 2" width={500} 
    height={300} className="rounded-xl" />
        </div>
      </div>

      {/* Date and Description */}
      <p className="text-gray-700 text-lg text-center mb-2">{offer.dateOfHajj}</p>
      <p className="text-gray-600 text-lg text-center mb-2">{offer.description}</p>
      <p className="text-gray-600 text-lg text-center mb-8">{offer.totalDays}</p>

      {/* Pricing */}
      <h1 className="text-center font-sans mt-6 font-bold text-lg mb-2">Avail This offer at a very reasonable price!</h1>
      <div className="flex justify-center items-center text-center mb-8">
        <p className="text-gray-500 text-2xl line-through mr-4">
          Rs. {isApprovedUser ? offer.originalPriceForUsers : offer.originalPrice}
        </p>
        <p className="text-3xl font-bold text-green-600">
          Rs. {isApprovedUser ? offer.discountedPriceForUsers : offer.discountedPrice}
        </p>
      </div>

      {/* Flight Details Table */}
      <div className="mb-8 overflow-x-auto">
        <h3 className="text-2xl font-bold text-gray-800 text-center mb-4">Flight Details</h3>
        <table className="w-full table-auto border-collapse border border-gray-300 text-sm md:text-base">
          <thead>
          <tr className="bg-gray-100">
        <th className="px-4 py-3 border border-gray-300 min-w-[150px]">Airline</th>
        <th className="px-4 py-3 border border-gray-300 min-w-[120px]">Flight Number</th>
        <th className="px-4 py-3 border border-gray-300 min-w-[120px]">Date</th>
        <th className="px-4 py-3 border border-gray-300 min-w-[120px]">Route</th>
        <th className="px-4 py-3 border border-gray-300 min-w-[120px]">Time</th>
            </tr>
          </thead>
          <tbody>
          <tr>
        <td className="px-4 py-3 border border-gray-300 text-center">
          <div className="flex items-center justify-center gap-2">
            <Image src={offer.airlineImage} alt="Airline" width={40} height={40} className="rounded-full" />
            <span className="whitespace-nowrap">{offer.airlineName}</span>
          </div>
        </td>
        <td className="px-4 py-3 border border-gray-300 text-center">{offer.flightNum1}</td>
        <td className="px-4 py-3 border border-gray-300 text-center">{offer.dateOfFlight1}</td>
        <td className="px-4 py-3 border border-gray-300 text-center">{offer.route1}</td>
        <td className="px-4 py-3 border border-gray-300 text-center">{offer.time1}</td>
      </tr>
      <tr>
        <td className="px-4 py-3 border border-gray-300 text-center">
          <div className="flex items-center justify-center gap-2">
            <Image src={offer.airlineImage} alt="Airline" width={40} height={40} className="rounded-full" />
            <span className="whitespace-nowrap">{offer.airlineName}</span>
          </div>
        </td>
        <td className="px-4 py-3 border border-gray-300 text-center">{offer.flightNum2}</td>
        <td className="px-4 py-3 border border-gray-300 text-center">{offer.dateOfFlight2}</td>
        <td className="px-4 py-3 border border-gray-300 text-center">{offer.route2}</td>
        <td className="px-4 py-3 border border-gray-300 text-center">{offer.time2}</td>
      </tr>
          </tbody>
        </table>
      </div>

      {/* Hotel and Other Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 text-center mb-4">Makkah Hotel</h3>
          <p className="text-gray-600 text-lg text-center">{offer.makkahHotel}</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-800 text-center mb-4">Madina Hotel</h3>
          <p className="text-gray-600 text-lg text-center">{offer.madinaHotel}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 text-center mb-4">Food</h3>
          <p className="text-gray-600 text-lg text-center">{offer.food}</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-800 text-center mb-4">Transport</h3>
          <p className="text-gray-600 text-lg text-center">{offer.transport}</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-800 text-center mb-4">Holy Ziarat</h3>
          <p className="text-gray-600 text-lg text-center">{offer.holyziarat}</p>
        </div>
      </div>

      {/* Book Now Button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={handleApplyNow}
          className="px-8 py-3 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 transition"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}