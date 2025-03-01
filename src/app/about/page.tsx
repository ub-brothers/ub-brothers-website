"use client"
import { motion } from "framer-motion";
import Image from "next/image";
import WhyUs from "../whyUs/page";
import ClientReviews from "../clientReview/page";
import WhatAreWe from "../whatAreWe/page";
import ServicesSection from "../ourService/page";

const AboutUs = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      
      <motion.h1
        className="sm:text-4xl text-3xl font-bold text-blue-800 font-serif text-center mb-10"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }} 
      >
        About Us
      </motion.h1>
      
      
      <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
        <motion.div 
          className="w-full md:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }} 
        >
          <Image src="/image/logo.jpeg" width={500} height={300} alt="UB Brothers" className="w-full max-w-xs md:max-w-md rounded-3xl shadow-lg" />
        </motion.div>
        <motion.div 
          className="w-full md:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }} 
        >
          <h1 className="font-bold text-xl font-serif">Your Trusted Partner for Visa & Travel Solutions</h1>
          <p className="text-lg text-gray-700 leading-relaxed">
          At UB Brothers, we specialize in providing hassle-free visa processing and travel consultancy services. Whether you need a visa for work, study, tourism, or business, our expert team is here to guide you every step of the way.
            UB Brothers is a trusted travel agency specializing in visa processing and customized tour packages. Our dedicated team ensures a smooth and hassle-free experience for all your travel needs, offering expert guidance and top-notch customer service.
          </p>
        </motion.div>
      </div>
      
     
      <motion.h2
        className="text-3xl font-semibold text-center mb-10"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }} 
      >
        CEO of UB Brothers
      </motion.h2>
      
      <motion.div 
        className="flex flex-col items-center text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }} 
      >
        <Image src="/image/ceo.jpeg" width={300} height={300} alt="CEO" className="rounded-full shadow-lg mb-4" />
        <p className="text-lg text-gray-700 max-w-2xl">
        Alhaj M. Shaharyaar, our CEO, is a visionary leader dedicated to driving UB Brothers towards excellence. With years of experience in visa consultancy and travel management, he ensures top-tier services and customer satisfaction.
        </p>
      </motion.div>
      
      
      <motion.h2
        className="text-3xl font-semibold text-center my-10"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }} 
      >
        Our Staff
      </motion.h2>
      
      <motion.div 
        className="flex justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }} 
      >
        <Image src="/image/team2.jpg" width={600} height={400} alt="Our Staff" className="rounded-lg shadow-lg" />
      </motion.div>
      
      <motion.p
        className="text-lg text-gray-700 text-center leading-relaxed mt-8 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }} 
      >
        Our experienced staff specializes in visa processing, documentation, and tour planning. With their in-depth knowledge and dedication, we guarantee a seamless and stress-free experience for all our clients.
      </motion.p>

   
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 text-center">
  <div className="p-4 bg-orange-100 rounded-lg shadow-md flex flex-col items-center">
  <img 
      src="/image/ali.jpeg" 
      alt="Mirza Ali" 
      className="w-24 h-24 rounded-full object-cover mb-3"
    />
    <h3 className="text-xl font-semibold">Mirza Ali</h3>
    <p className="text-gray-700">Ticketing Sale Officer</p>
    <p className="text-gray-600"> 03414314000 </p>
  </div>

  <div className="p-4 bg-orange-100 rounded-lg shadow-md flex flex-col items-center">
  <Image 
      src="/image/bilal.jpeg" 
      alt="Bilal Maqsood" 
      width={96} 
      height={96} 
      className="rounded-full object-cover mb-3"
    />
    <h3 className="text-xl font-semibold">Bilal Maqbool</h3>
    <p className="text-gray-700">Sales Executive</p>
    <p className="text-gray-600">03414316000 </p>
  </div>

  <div className="p-4 bg-orange-100 rounded-lg shadow-md">
    <h3 className="text-xl font-semibold">Usman Ali</h3>
    <p className="text-gray-700">Accounts Officer</p>
    <p className="text-gray-600">03414315000</p>
  </div>

  <div className="p-4 bg-orange-100 rounded-lg shadow-md">
    <h3 className="text-xl font-semibold">Narmeen Mughal</h3>
    <p className="text-gray-700">Admin</p>
    <p className="text-gray-600">03414312000</p>
  </div>
</div>

      <div className="my-5">
      <WhatAreWe/>
</div>
      <div>
        <WhyUs/>
      </div>
      <ServicesSection/>
      <div>
        <ClientReviews/>
      </div>
    </div>
  );
};    

export default AboutUs;
