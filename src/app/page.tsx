"use client"

import ClientReviews from "./clientReview/page";
import Hero from "./components/hero";
import TravelPackageForm from "./customizePackage/page";
import { motion } from "framer-motion";
import Featured from "./featured/page";
import ServicesSection from "./ourService/page";
import PaymentDetails from "./payment/page";
import WhyUs from "./whyUs/page";
import TourPackage from "./tour/page";
import ContactInfo from "./contactDiv/page";
import VisaApplication from "./visaApplication/page";

import UmrahBookingForm from "./umrahForm/page";

export default function Home() {
  return (
    <div>
 
      <Hero/>
      <div className="lg:mt-24 mt-10 bg-gray-100">
        <h2 className="text-gray-100">.</h2>
        <h1 className="font-bold ml-6 text-xl md:text-3xl font-serif mt-4">Our Top Destinations</h1>
         <Featured/>
      </div>
{/* <UmrahBookingForm/> */}

      {/* <div
      className="relative bg-cover bg-center bg-no-repeat flex items-center justify-center min-h-screen py-20"
      style={{ backgroundImage: "url('/image/luxury.jpg')" }}
    >
     
      <motion.div
        className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg max-w-lg w-full sm:mx-auto mx-4 relative z-10"
        initial={{ opacity: 0, y: 50 }} // Start position
        animate={{ opacity: 1, y: 0 }} // Animation when component mounts
        transition={{ duration: 0.8, ease: "easeOut" }} // Smooth transition
      >
        <h2 className="text-xl font-bold text-center text-gray-800">
        "Your Trip, Your Way! Let’s Customize It."

    </h2>
    <p className="text-center text-gray-600 my-2">
    📍 Fill out the form & we’ll handle everything for you!
    </p>
        <TravelPackageForm />
      </motion.div>
    </div> */}
     


  <div className="my-6 bg-gray-200 text-center">
    <h1>.</h1>
    <h1 className="font-serif text-2xl text-center mt-6"><u>Explore some of our</u></h1>

  <TourPackage/>
 
  </div>

  
      <WhyUs/>
  
  <div className="my-8">
    
  <ServicesSection/>
  
 
  </div>

  {/* <div>
    <VisaApplication/>
  </div> */}



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
