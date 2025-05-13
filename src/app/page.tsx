"use client"

import ClientReviews from "./clientReview/page";
import Hero from "./components/hero";
import Featured from "./featured/page";
import ServicesSection from "./ourService/page";
import PaymentDetails from "./payment/page";
import WhyUs from "./whyUs/page";
import TourPackage from "./tour/page";
import ContactInfo from "./contactDiv/page";
import WhatAreWe from "./whatAreWe/page";
import UmrahPage from "./umrahPage/page";
import { getUmrahAvailability } from "@/sanity/lib/umrahAvailability";
import { getTourPackages } from "@/sanity/lib/getPackages";
export default async function Home() {

  const tour = await getTourPackages(); // ✅ Tour packages fetched from Sanity
  const hasTour = tour.length > 0;       
 const showComingSoonMessage = await getUmrahAvailability();

  return (
    <div>
 
      <Hero/>

       {!showComingSoonMessage && (
        <div className="my-10">
          <UmrahPage />
        </div>
      )}

      <div className="mt-5 bg-gray-100">
        <h2 className="text-gray-100">.</h2>
        <h1 className="font-bold ml-6 text-xl md:text-3xl font-serif mt-4">Our Top Destinations</h1>
         <Featured/>
      </div>


 
  <div className="my- bg-gray-200 text-center">
    <h1>.</h1>
   
  {/* ✅ Only show Tour section if there is data */}
      {hasTour && (
        <div className="bg-gray-200 text-center">
          <TourPackage />
        </div>
      )}
 
  </div>

  <WhatAreWe/>
      <WhyUs/>
  
  <div className="">
    
  <ServicesSection/>
  
 
  </div>




  <div>
    <ClientReviews/>
  
  </div>
  <div>
    <ContactInfo/>
  </div>
  <PaymentDetails/>
    </div>
  );
}
