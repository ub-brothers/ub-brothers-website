"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { useRouter } from "next/navigation";
import { jwtDecode } from 'jwt-decode';

type IranOfferType = {
    title: string;
    image1: string;
    image2: string;
    destination: string;
    route: string;
    description: string;
    originalPrice: number;
    discountedPrice: number;
    originalPriceForUsers:number,
    discountedPriceForUsers:number,
  };

export default function IranOfferCard() {
  const [isApprovedUser, setIsApprovedUser] = useState(false);
    const [offer, setOffer] = useState<IranOfferType | null>(null);
  
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
        const data: IranOfferType = await client.fetch(`*[_type == "iranOffer"][0] {
          title,
          "image1": image1.asset->url,
          "image2": image2.asset->url,
          destination,
          route,
          description,
          originalPrice,
          discountedPrice,
        originalPriceForUsers,
        discountedPriceForUsers,
        }`);
        console.log("Fetched Data:", data);
        setOffer(data);
      };
      fetchOffer();
    }, []);
  
    if (!offer) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <h1 className="text-6xl font-bold text-gray-500">No Offer Available Now!</h1>
        </div>
      );
    }
  
    const router = useRouter();

const handleApplyNow = () => {
  const queryParams = new URLSearchParams({
    title: offer.title,
    originalPrice: offer.originalPrice.toString(),
    discountedPrice: offer.discountedPrice.toString(),
    discountedPriceForUsers: offer.discountedPriceForUsers.toString(),
   destination: offer.destination,
   route: offer.route,
  }).toString();

  router.push(`/iranOfferForm?${queryParams}`);
};



    return (
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden p-8 border border-gray-300 mt-10 mb-10">
        <h2 className="text-3xl font-serif font-bold text-gray-900 text-center mb-6"><u>{offer.title}</u></h2>

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

         <p className="text-gray-600 text-lg mt-6 text-center">{offer.description}</p>
        <p className="text-gray-700 text-lg mt-2 text-center"><span className="font-semibold">Place Of Ziyarat: {offer.destination}</span></p>
        <p className="text-gray-700 text-lg mt-2 text-center"><span className="font-semibold">Route: {offer.route}</span></p>
       
        <div className="mt-6 flex justify-center items-center text-center">
          <p className="text-gray-500 text-2xl line-through mr-4">Rs. {isApprovedUser ? offer.originalPriceForUsers: offer.originalPrice}</p>
          <p className="text-3xl font-bold text-green-600">Rs. {isApprovedUser ? offer.discountedPriceForUsers: offer.discountedPrice}</p>
        </div>
        <div className="flex justify-center mt-6">
          <button onClick={handleApplyNow} className="px-8 py-3 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 transition">Book Now</button>
        </div>
      </div>
    );
  }
  