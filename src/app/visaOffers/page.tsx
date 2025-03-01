"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";

// Define the type for the Visa Offer
type VisaOfferType = {
    title: string;
    originalPrice: number;
    discountedPrice: number;
    countries: {
      name: string;
      imageUrl?: string | null;
    }[];
  };
export default function VisaOffer() {
  const [offer, setOffer] = useState<VisaOfferType | null>(null);

  useEffect(() => {
    const fetchOffer = async () => {
      const data: VisaOfferType = await client.fetch(`  *[_type == "visaOffer"][0] {
    title,
    originalPrice,
    discountedPrice,
    countries[] {
      name,
      "imageUrl": image.asset->url
    }
  }`);
  console.log("Fetched Data:", data);
      setOffer(data);
    };
    fetchOffer();
  }, []);

  if (!offer) return <p className="text-center text-lg">Loading offer...</p>;

  return (
    <div className="w-full p-8 bg-gray-100 shadow-xl rounded-xl  border border-gray-200">
      {/* Offer Heading */}
      <h1 className="text-4xl font-bold font-serif text-center text-blue-600 mb-6 uppercase">
       <u> {offer.title}</u>
      </h1>
      
      {/* Countries List with Images */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Included Countries</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {offer.countries.map((country, index) => (
  <div key={index} className="flex flex-col items-center bg-gray-800 p-4 rounded shadow-lg">
    {country.imageUrl? (
      <Image 
        src={country.imageUrl} 
        alt={country.name} 
        width={150} 
        height={140} 
        className="object-cover w-full h-44 rounded-md mb-2"
      />
    ) : (
      <div className="w-[150px] h-[100px] bg-gray-200 flex items-center justify-center rounded-md mb-2">
        <span className="text-gray-500 text-sm">No Image</span>
      </div>
    )}
    <p className="text-lg text-white font-bold font-sans">{country.name}</p>
  </div>
))}
        </div>
      </div>
      
      {/* Offer Message */}
      <p className="text-lg text-gray-700 text-center mb-6 font-medium">
      Get visa for all these countries at an exclusive discounted price!
      </p>
      
      {/* Pricing Section */}
      <div className="text-center text-xl font-semibold mb-6 bg-red-100 p-4 rounded-lg">
        <span className="line-through text-gray-500 text-2xl">PKR {offer.originalPrice}</span>
        <span className="text-red-600 text-3xl font-bold ml-3">PKR {offer.discountedPrice}</span>

       
      </div>
      <div className="text-center">
 <button className="bg-blue-500 hover:bg-orange-500 w-[250px] text-white font-bold font-sans rounded-lg h-12">Apply for offer Now!</button></div>
    </div>
  );
}
