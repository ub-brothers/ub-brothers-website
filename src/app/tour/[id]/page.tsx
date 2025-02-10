'use client';

import { motion } from 'framer-motion'; // Import Framer Motion
import {  TourType } from "@/app/types/destinations";
import { sanityFetch } from "@/sanity/lib/client";
import {  tourDetailQuery} from "@/sanity/lib/queries";
import Link from 'next/link';
import ContactInfo from '@/app/contactDiv/page';



export default async function TourDetail ({params}: {params:{id:string}}){
    
    const tourCountries: TourType = await sanityFetch({ query: tourDetailQuery, params: { id: params.id } });

  return (
    <div>
      <div key={tourCountries._id} className="mt-10">
        <div className="text-center flex w-[100%]">
          {/* Adding Framer Motion to images */}
          <motion.img
            src={tourCountries.imageUrl2}
            className="h-[300px] w-[370px] mx-auto hidden xl:block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
          <motion.img
            src={tourCountries.imageUrl3}
            className="sm:h-[300px] h-[240px] sm:w-[370px] hidden md:block w-[280px] mx-4 sm:mx-auto "
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
          <motion.img
            src={tourCountries.imageUrl}
            className="h-[300px] w-[370px] mx-auto hidden md:block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
           <motion.img
            src={tourCountries.imageUrl4}
            className="h-[170px] w-[200px] mx-4 md:hidden"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        </div>

        <div className="mx-6 flex">
            <div className=''>
          <h1 className="sm:text-3xl text-xl font-bold mt-5 sm:mt-10 font-serif"><u>{tourCountries.countryName}:</u></h1>
          <h2 className="my-2 text-sm sm:text-lg">{tourCountries.shortDescription}</h2>
         
          <h1 className='font-bold font-serif text-xl my-4'><u>{tourCountries.tourIncludeHeading}</u></h1>
            <h2>{tourCountries.tourInclude1}</h2>
            <h3>{tourCountries.tourInclude2}</h3>
            <h2>{tourCountries.tourInclude3}</h2>
            <h1>{tourCountries.tourInclude4}</h1>
            <h2>{tourCountries.tourInclude5}</h2>
            <h3>{tourCountries.tourInclude6}</h3>
            <h2>{tourCountries.tourInclude7}</h2>
            <h1>{tourCountries.tourInclude8}</h1>
            <h2>{tourCountries.tourInclude9}</h2>
          <h2 className='text-xl font-bold font-serif my-4'><u>Itinerary:</u></h2>
      <h1 className='font-bold text-blue-900 text-md'>{tourCountries.heading1}</h1>
      <p className=''>{tourCountries.day1}</p>
      <h2 className='font-bold text-blue-900 text-md mt-3'>{tourCountries.heading2}</h2>
      <p>{tourCountries.day2}</p>
      <h1 className='font-bold text-blue-900 text-md mt-3'>{tourCountries.heading3}</h1>
      <p>{tourCountries.day3}</p>
      <h2 className='font-bold text-blue-900 text-md mt-3'>{tourCountries.heading4}</h2>
      <p>{tourCountries.day4}</p>
      <h1 className='font-bold text-blue-900 text-md mt-3'>{tourCountries.heading5}</h1>
      <p>{tourCountries.day5}</p>
      <h2 className='font-bold text-blue-900 text-md mt-3'>{tourCountries.heading6}</h2>
      <p>{tourCountries.day6}</p>
      <h1 className='font-bold text-blue-900 text-md mt-3'>{tourCountries.heading7}</h1>
      <p>{tourCountries.day7}</p>
      <h2 className='font-bold text-blue-900 text-md mt-3'>{tourCountries.heading8}</h2>
      <p>{tourCountries.day8}</p>
      <h1 className='font-bold text-blue-900 text-md mt-3'>{tourCountries.heading9}</h1>
      <p>{tourCountries.day9}</p>
       <h2 className="my-4 text-md sm:text-xl font-serif"><b>Tour Package cost:</b> {tourCountries.prize} PKR/- Per person.</h2>
       <h1 className='my-4 text-md sm:text-xl font-serif font-bold'><u>Requirements:</u></h1>
        <p className='sm:text-lg text-sm'>Original Passport (Valid for at least 6 months)</p>
          <p>ID Copy (CNIC)</p>
          <p>Recent Photographs (White background)</p>
          <p>Processing Time – Approximately 2 weeks</p>

          <p className="my-2"><b>Note: </b>You will need to visit the office in person to submit the required documents.</p>
         
        </div>

      
</div>
      </div>
      <Link href="/contact"> 
      <motion.button
          className="mt-2 px-6 ml-2 py-3 bg-blue-500 text-white font-semibold rounded-lg"
          initial={{ scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          Contact Now
        </motion.button>
 </Link>

 <ContactInfo/>


      
           
      
    </div>
  );
}