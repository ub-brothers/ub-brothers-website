"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { useRouter } from "next/navigation";
import { jwtDecode } from 'jwt-decode';


type UmrahOfferType = {
  title: string;
  image1: string;
  image2: string;
  daysOfUmrah: number;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  originalPriceForUsers:number;
  discountedPriceForUsers:number;
  ticketHead: string;
  airlineName: string;
  airlineImage: string;
  dep: string;
  flightNum1: string;
  makkahHotelDays:string;
  makkahHotelDaysH:string;
  madinaHotelDaysH:string;
  madinaHotelDays:string;
  dateOfFlight1: string;
  route1: string;
  time1: string;
  return: string;
  flightNum2: string;
  dateOfFlight2: string;
  route2: string;
  time2: string;
  makkahHotelH: string;
  makkahHotel: string;
  madinaHotelH: string;
  madinaHotel: string;
  foodHead: string;
  food: string;
  transportHead: string;
  transport: string;
  holyZiaratHead: string;
  holyziarat: string;

};


export default function UmrahOfferCard() {
 const [isApprovedUser, setIsApprovedUser] = useState(false);
    const [offer, setOffer] = useState<UmrahOfferType | null>(null);
  
    useEffect(() => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const decoded: any = jwtDecode(token);
       
  
          if (decoded.approved === true || decoded.approved === "true") {
            setIsApprovedUser(true);
          } else {
            setIsApprovedUser(false);
          }
        } catch (error) {
          console.error("Invalid token", error);
        }
      }


      const fetchOffer = async () => {
        const data: UmrahOfferType = await client.fetch(`*[_type == "umrahOffer"][0]{
          title,
          "image1": image1.asset->url,
          "image2": image2.asset->url,
          daysOfUmrah,
          description,
          originalPrice,
          discountedPrice,
originalPriceForUsers,
discountedPriceForUsers,
makkahHotelH,
makkahHotel,
makkahHotelDaysH,
makkahHotelDays,
madinaHotelH,
madinaHotel,
madinaHotelDaysH,
madinaHotelDays,
foodHead,
 food,
    transportHead,
    transport,
    holyZiaratHead,
    holyziarat,
    ticketHead,
    airlineName,
     "airlineImage" : airlineImage.asset->url,
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
      };
      fetchOffer();
    }, []);
  
    if (!offer || Object.keys(offer).length === 0) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <h1 className="sm:text-6xl text-3xl text-center  font-bold text-gray-500">No Offer Available Now!</h1>
        </div>
      );
    }
  
    const router = useRouter();

const handleApplyNow = () => {
  const queryParams = new URLSearchParams({
    title: offer.title,
    originalPrice: offer.originalPrice.toString(),
    discountedPrice: offer.discountedPrice.toString(),
    discountedPriceForUsers : offer.discountedPriceForUsers.toString(),
   daysOfUmrah: offer.daysOfUmrah.toString(),
   makkahHotel: offer.makkahHotel,
   madinaHotel:offer.madinaHotel,
   makkahHotelDays:offer.makkahHotelDays,
   madinaHotelDays:offer.madinaHotelDays,
  }).toString();

  router.push(`/umrahOfferForm?${queryParams}`);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden p-8 border border-gray-300 mt-10 mb-10">
      {/* Title */}
      <h2 className="text-3xl font-serif font-bold text-gray-900 text-center mb-6">
        <u>{offer.title}</u>
      </h2>

      {/* Images */}
      <div className="flex flex-col md:flex-row gap-4 justify-center">
  <div className="relative w-full md:w-1/2 h-40 md:h-48 lg:h-64 overflow-hidden rounded-xl">
    <Image 
      src={offer.image1} 
      alt="Image 1" 
      fill 
      className="object-cover rounded-xl" 
    />
  </div>
  
  <div className="relative w-full md:w-1/2 h-40 md:h-48 lg:h-64 overflow-hidden rounded-xl">
    <Image 
      src={offer.image2} 
      alt="Image 2" 
      fill 
      className="object-cover rounded-xl" 
    />
  </div>
</div>


      {/* Days and Description */}
      <p className="text-gray-700 text-lg mt-6 text-center">
        Days: <span className="font-semibold">{offer.daysOfUmrah} Days</span>
      </p>
      <p className="text-gray-600 text-lg mt-2 text-center">{offer.description}</p>

      {/* Pricing */}
      <h1 className="text-center font-sans mt-6 font-bold text-lg">Avail This offer at a very reasonable price!</h1>
      <div className="mt-2 flex justify-center items-center text-center">
        <p className="text-gray-500 text-2xl line-through mr-4">
          Rs. {isApprovedUser ? offer.originalPriceForUsers : offer.originalPrice}
        </p>
        <p className="text-3xl font-bold text-green-600">
          Rs. {isApprovedUser ? offer.discountedPriceForUsers : offer.discountedPrice}
        </p>
      </div>

      {/* Ticket Details Table */}
      <div className="mt-8">
  <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{offer.ticketHead}</h3>
  
  <div className="flex justify-center mb-4">
    <Image src={offer.airlineImage} alt="Airline Logo" width={100} height={50} className="rounded-lg" />
  </div>
  
  <p className="text-xl font-semibold text-gray-800 text-center mb-4">{offer.airlineName}</p>

  <div className="overflow-x-auto w-full">
    <table className="w-full border-collapse border border-gray-300 text-sm md:text-base">
      <thead>
        <tr className="bg-gray-100">
          <th className="px-4 py-3 border border-gray-300 min-w-[120px]">Flight</th>
          <th className="px-4 py-3 border border-gray-300 min-w-[120px]">Date</th>
          <th className="px-4 py-3 border border-gray-300 min-w-[120px]">Route</th>
          <th className="px-4 py-3 border border-gray-300 min-w-[120px]">Time</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="px-4 py-3 border border-gray-300 text-center whitespace-nowrap">{offer.flightNum1}</td>
          <td className="px-4 py-3 border border-gray-300 text-center whitespace-nowrap">{offer.dateOfFlight1}</td>
          <td className="px-4 py-3 border border-gray-300 text-center whitespace-nowrap">{offer.route1}</td>
          <td className="px-4 py-3 border border-gray-300 text-center whitespace-nowrap">{offer.time1}</td>
        </tr>
        <tr>
          <td className="px-4 py-3 border border-gray-300 text-center whitespace-nowrap">{offer.flightNum2}</td>
          <td className="px-4 py-3 border border-gray-300 text-center whitespace-nowrap">{offer.dateOfFlight2}</td>
          <td className="px-4 py-3 border border-gray-300 text-center whitespace-nowrap">{offer.route2}</td>
          <td className="px-4 py-3 border border-gray-300 text-center whitespace-nowrap">{offer.time2}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

      {/* Hotel Details */}
      <div className="mt-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Hotel Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold text-gray-800 mb-2">{offer.makkahHotelH}</h4>
            <p className="text-gray-700">{offer.makkahHotel}</p>
            <h4 className="text-md font-semibold text-gray-800 mt-2">{offer.makkahHotelDaysH}</h4>
            <p className="text-gray-700">{offer.makkahHotelDays} days.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold text-gray-800 mb-2">{offer.madinaHotelH}</h4>
            <p className="text-gray-700">{offer.madinaHotel}</p>

            <h4 className="text-md font-semibold text-gray-800 mt-2">{offer.madinaHotelDaysH}</h4>
            <p className="text-gray-700">{offer.madinaHotelDays} days</p>
          </div>
        </div>
      </div>

      {/* Food, Transport, and Ziarat Details */}
      <div className="mt-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Additional Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold text-gray-800 mb-2">{offer.foodHead}</h4>
            <p className="text-gray-700">{offer.food}</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold text-gray-800 mb-2">{offer.transportHead}</h4>
            <p className="text-gray-700">{offer.transport}</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold text-gray-800 mb-2">{offer.holyZiaratHead}</h4>
            <p className="text-gray-700">{offer.holyziarat}</p>
          </div>
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
  