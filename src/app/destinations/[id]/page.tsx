'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Destination } from '@/app/types/destinations';
import { sanityFetch } from '@/sanity/lib/client';
import { detailCountryEVisa, allDestinations } from '@/sanity/lib/queries';


export default function DetailPage({ params }: { params: { id: string } }) {
  const [countries, setCountries] = useState<Destination | null>(null);
  const [randomCountries, setRandomCountries] = useState<Destination[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const countryData: Destination = await sanityFetch({
          query: detailCountryEVisa,
          params: { id: params.id },
        });

        const allCountriesData: Destination[] = await sanityFetch({
          query: allDestinations,
        });

       
        const filteredCountries = allCountriesData.filter((c) => c._id !== params.id);
        const randomSelection = filteredCountries.sort(() => 0.5 - Math.random()).slice(0, 4);

        setCountries(countryData);
        setRandomCountries(randomSelection);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [params.id]);

  if (!countries) return <p className="text-center mt-10 text-lg">Loading...</p>;

  return (
    <div>
      <div key={countries._id} className="mt-10">
        <div className="text-center flex w-[100%]">
          
          <motion.img
            src={countries.imageUrl2}
            className="h-[300px] w-[370px] mx-auto hidden xl:block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          />
          <motion.img
            src={countries.imageUrl}
            className="sm:h-[300px] h-[240px] sm:w-[370px] w-[280px] mx-4 sm:mx-auto "
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          />
          <motion.img
            src={countries.imageUrl3}
            className="h-[300px] w-[370px] mx-auto hidden md:block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          />
        </div>

        <div className="mx-6">
          <h1 className="sm:text-3xl text-xl font-bold mt-5 sm:mt-10 font-serif">
            <u>{countries.countryName}:</u>
          </h1>
          <h2 className="my-2 text-sm sm:text-lg">{countries.shortDescription}</h2>
          <h2 className="my-4 text-md sm:text-xl font-serif">
            <b>The visa cost:</b> {countries.prize} PKR/-
          </h2>

          <h1 className="font-bold text-md sm:text-xl">{countries.requirements}</h1>
          <p>{countries.requirement1}</p>
          <p>{countries.requirement2}</p>
          <p>{countries.requirement3}</p>
          <p>{countries.requirement4}</p>
          <p>{countries.requirement5}</p>
          <p>{countries.requirement6}</p>
          <p>{countries.requirement7}</p>
          <p>{countries.requirement8}</p>
        </div>
      </div>

      <Link href="/visaApplication">
        <motion.button
          className="mt-2 px-6 ml-2 py-3 bg-blue-500 text-white font-semibold rounded-lg"
          initial={{ scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          Apply Now
        </motion.button>
      </Link>

      <div className="w-full p-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-900">You Can Directly Contact:</h2>
      
     
      <motion.div 
        className="flex justify-center mb-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        whileHover={{ scale: 1.05 }}
        viewport={{ once: false }} 
      >
        <img
          src="/image/ali.jpeg"
          alt="Visa Applicant"
          className="w-[200px] h-[200px] rounded-full object-cover"
        />
      </motion.div>

   
      <div className="text-center">
        <p className="sm:text-2xl text-lg font-semibold font-serif">Mirza Ali</p>
        <p className="text-sm text-gray-500 mt-2">+923 264 214241</p>
        <p className="text-sm text-gray-500">+923 174 141149</p>
        <p className="text-sm text-gray-500">&#9993;  ubbrothersconsultant@gmail.com</p>
      </div>
    </div>

      <div className="my-8 w-full bg-gray-200">
        <h1>.</h1>
        <h2 className="text-center text-xl sm:text-2xl font-bold mt-6 mb-5">
          <u>You May Also Like:</u>
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-8 mx-auto max-w-6xl">
          {randomCountries.map((country) => (
            <div
              key={country._id}
              className="sm:w-[290px] w-[150px] border-solid border-black rounded-xl bg-blue-200 xl:mx-10 mx-auto sm:mx-4 hover:shadow-md hover:shadow-black text-center my-3"
            >
              <Link href={`/destinations/${country._id}`}>
                <div className="relative group">
                  <img
                    src={country.imageUrl}
                    alt={country.countryName}
                    className="mx-auto my-4 sm:h-[250px] h-[100px] w-[130px] rounded-lg sm:w-[270px] transition duration-300 group-hover:brightness-75"
                  />
                  <div className="absolute inset-0 bg-white bg-opacity-50 opacity-0 group-hover:opacity-100 flex justify-center items-center transition-opacity duration-300">
                    <h3 className="sm:text-xl text-md font-bold font-serif text-black">{country.countryName}</h3>
                  </div>
                </div>
                <h2 className="text-center text-sm sm:text-lg mt-2">
                  <b>{country.prize}</b> PKR/-
                </h2>
                <button className="bg-orange-500 rounded-xl sm:w-[130px] w-[100px] text-white text-sm sm:text-md mb-4 mt-1 hover:bg-blue-500 hover:shadow-[0_4px_14px_rgba(0,0,0,0.2)] transition duration-300 shadow-lg font-serif">
                  View Details
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
     
    </div>
  );
}
