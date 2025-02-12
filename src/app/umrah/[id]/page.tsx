'use client';

import { motion } from 'framer-motion'; // Import Framer Motion

import Link from 'next/link';
import { Destination  } from "@/app/types/destinations";
import { sanityFetch } from "@/sanity/lib/client";
import {  umrah, umrahDetail } from "@/sanity/lib/queries";

import ContactInfo from '@/app/contactDiv/page';

export default async function DetailPage({params}: {params:{id:string}}) {
  const countries: Destination = await sanityFetch({ query: umrahDetail, params: { id: params.id } });

 // Fetch all destinations but exclude the current one
 const allCountries: Destination[] = await sanityFetch({ query: umrah });
 const filteredCountries = allCountries.filter((country) => country._id !== params.id);

 // Select 3 random countries
//  const randomCountries = filteredCountries.sort(() => 0.5 - Math.random()).slice(0, 4);

  return (  
    <div>
      <div key={countries._id} className="mt-10">
        <div className="text-center flex w-[100%]">
          {/* Adding Framer Motion to images */}
          <motion.img
            src={countries.imageUrl2}
            className="h-[300px] w-[370px] mx-auto hidden xl:block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
          <motion.img
            src={countries.imageUrl}
            className="sm:h-[300px] h-[240px] sm:w-[370px] w-[280px] mx-4 sm:mx-auto "
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
          <motion.img
            src={countries.imageUrl3}
            className="h-[300px] w-[370px] mx-auto hidden md:block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        </div>

        <div className="mx-6">
          <h1 className="sm:text-3xl text-xl font-bold mt-5 sm:mt-10 font-serif"><u>{countries.countryName}:</u></h1>
          <h2 className="my-2 text-sm sm:text-lg">{countries.shortDescription}</h2>
          
          

          <h1 className="font-bold text-md sm:text-xl">{countries.requirements}</h1>
        
          <p>Original Passport (Valid for at least 6 months).</p>
          <p>Scan copy of Passport.</p>
          <p>ID Copy (CNIC) Front and back.</p>
          <p>Recent Photographs (White background).</p>
          
         
        </div>
      </div> 
      <Link href="/umrahForm">
      <motion.button
          className="mt-2 px-6 ml-2 py-3 bg-blue-500 text-white font-semibold rounded-lg"
          initial={{ scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          Apply Now
        </motion.button></Link>



        <ContactInfo/>      
    

    </div>
  );
}
