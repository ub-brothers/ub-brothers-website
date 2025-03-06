"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { useRouter } from "next/navigation";



type HajjOfferType = {
  id: string;
    title:string;
    dateOfHajj: string;
    description:string;
    originalPrice:number;
    discountedPrice:number;
    originalPriceForUsers:number,
    discountedPriceForUsers:number,
    image1: string;
    image2:string;
};

export default function HajjOfferCard() {
    const [offer, setOffer] = useState<HajjOfferType | null>(null);
  
    useEffect(() => {
      const fetchOffer = async () => {
        const data: HajjOfferType = await client.fetch(`*[_type == "hajjOffer"][0] {
          title,
          "image1": image1.asset->url,
          "image2": image2.asset->url,
          dateOfHajj,
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
          <h1 className="text-6xl font-bold text-gray-500">No Offer Available Now</h1>
        </div>
      );
    }


const router = useRouter();
const handleApplyNow = () => {
  const queryParams = new URLSearchParams({
    title: offer.title,
    originalPrice: offer.originalPrice.toString(),
    discountedPrice: offer.discountedPrice.toString(),
    dateOfHajj: offer.dateOfHajj,
  }).toString();
  router.push(`/hajjOfferForm?${queryParams}`);
};

    return (
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden p-8 border border-gray-300 mt-10 mb-10">
        <h2 className="text-3xl font-serif font-bold text-gray-900 text-center mb-6"><u>{offer.title}</u></h2>
        <div className="flex gap-6 justify-center">
          <div className="relative w-1/2 h-64">
            <Image src={offer.image1} alt="Image 1" layout="fill" objectFit="cover" className="rounded-xl" />
          </div>
          <div className="relative w-1/2 h-64">
            <Image src={offer.image2} alt="Image 2" layout="fill" objectFit="cover" className="rounded-xl" />
          </div>
        </div>
        <p className="text-gray-700 text-lg mt-6 text-center">{offer.dateOfHajj}</p>
        <p className="text-gray-600 text-lg mt-2 text-center">{offer.description}</p>
        <div className="mt-6 flex justify-center items-center text-center">
          <p className="text-gray-500 text-2xl line-through mr-4">Rs. {offer.originalPrice}</p>
          <p className="text-3xl font-bold text-green-600">Rs. {offer.discountedPrice}</p>
        </div>
        <div className="flex justify-center mt-6">
          <button onClick={handleApplyNow} className="px-8 py-3 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 transition">Book Now</button>
        </div>
      </div>
    );
  }
  