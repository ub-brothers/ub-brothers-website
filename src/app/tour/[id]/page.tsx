'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; 
import { TourType } from "@/app/types/destinations";
import { sanityFetch } from "@/sanity/lib/client";
import { tourDetailQuery } from "@/sanity/lib/queries";
import Link from 'next/link';


export default function TourDetail({ params }: { params: { id: string } }) {
  const [tourCountries, setTourCountries] = useState<TourType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data: TourType = await sanityFetch({ query: tourDetailQuery, params: { id: params.id } });
      setTourCountries(data);
    };
    fetchData();
  }, [params.id]);

  if (!tourCountries) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div>
      <div key={tourCountries._id} className="mt-10">
        <div className="text-center flex w-[100%] flex-wrap justify-center">
          <motion.img
            src={tourCountries.imageUrl2}
            className="h-[300px] w-[370px] mx-auto hidden xl:block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
          <motion.img
            src={tourCountries.imageUrl3}
            className="sm:h-[300px] h-[240px] sm:w-[370px] hidden md:block w-[280px] mx-4 sm:mx-auto"
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

        <div className="mx-6">
          <h1 className="sm:text-3xl text-xl font-bold mt-5 sm:mt-10 font-serif">
            <u>{tourCountries.countryName}:</u>
          </h1>
          <h2 className="my-2 text-sm sm:text-lg">{tourCountries.shortDescription}</h2>

          <h1 className="font-bold font-serif text-xl my-4"><u>{tourCountries.tourIncludeHeading}</u></h1>
          {[tourCountries.tourInclude1, tourCountries.tourInclude2, tourCountries.tourInclude3, tourCountries.tourInclude4, tourCountries.tourInclude5, tourCountries.tourInclude6, tourCountries.tourInclude7, tourCountries.tourInclude8, tourCountries.tourInclude9].map((item, index) => (
            <h2 key={index}>{item}</h2>
          ))}

          <h2 className="text-xl font-bold font-serif my-4"><u>Itinerary:</u></h2>
          {[{ heading: tourCountries.heading1, day: tourCountries.day1 },
            { heading: tourCountries.heading2, day: tourCountries.day2 },
            { heading: tourCountries.heading3, day: tourCountries.day3 },
            { heading: tourCountries.heading4, day: tourCountries.day4 },
            { heading: tourCountries.heading5, day: tourCountries.day5 },
            { heading: tourCountries.heading6, day: tourCountries.day6 },
            { heading: tourCountries.heading7, day: tourCountries.day7 },
            { heading: tourCountries.heading8, day: tourCountries.day8 },
            { heading: tourCountries.heading9, day: tourCountries.day9 }]
            .map((item, index) => (
              item.heading && (
                <div key={index} className="mt-3">
                  <h1 className="font-bold text-blue-900 text-md">{item.heading}</h1>
                  <p>{item.day}</p>
                </div>
              )
          ))}

          <h2 className="my-4 text-md sm:text-xl font-serif"><b>Tour Package cost:</b> {tourCountries.prize} PKR/- Per person.</h2>

          <h1 className="my-4 text-md sm:text-xl font-serif font-bold"><u>Requirements:</u></h1>
          <p>Original Passport</p>
          <p>Bank statement (Valid for at least 6 months)</p>
          <p>ID Copy (CNIC)</p>
          <p>Recent Photographs (White background)</p>
          <p>Processing Time – Approximately 2 weeks</p>
          <p className="my-2"><b>Note: </b>You will need to visit the office in person to submit the required documents.</p>
        </div>
      </div>

      <Link href="/tourForm">
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

      
    </div>
  );
}
