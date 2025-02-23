"use client";

import { motion } from 'framer-motion'; 
import { FileCons } from "@/app/types/destinations";
import { sanityFetch } from "@/sanity/lib/client";
import {  fileAndConsultancy, fileAndConsultancyDetail } from "@/sanity/lib/queries";
import Link from 'next/link';
import { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";


export default function DetailPage({ params }: { params: { id: string } }) {
  const [countries, setCountries] = useState<FileCons | null>(null);
  const [randomCountries, setRandomCountries] = useState<FileCons[]>([]);

  useEffect(() => {
    async function fetchData() {
      const countryData: FileCons = await sanityFetch({ query: fileAndConsultancyDetail, params: { id: params.id } });
      setCountries(countryData);

      const allCountries: FileCons[] = await sanityFetch({ query: fileAndConsultancy });
      const filteredCountries = allCountries.filter((country) => country._id !== params.id);
      setRandomCountries(filteredCountries.sort(() => 0.5 - Math.random()).slice(0, 4));
    }
    fetchData();
  }, [params.id]);

  if (!countries) return <p>Loading...</p>;

  return (
    <div>
      <div key={countries._id} className="mt-10">
        <div className="text-center flex w-[100%]">
         
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


        <div className=''>
        <div className="mx-6 ">
          <h1 className="sm:text-3xl text-xl font-bold mt-5 sm:mt-10 font-serif"><u>{countries.countryName}:</u></h1>
          <h2 className="my-2 text-sm sm:text-lg">{countries.shortDescription}</h2>
        

          <h1 className="font-bold text-md sm:text-xl mt-4">{countries.requirements}</h1>
          <p>{countries.requirement1}</p>
          <p>{countries.requirement2}</p>
          <p>{countries.requirement3}</p>
          <p>{countries.requirement4}</p>
          <p>{countries.requirement5}</p>
          <p>{countries.requirement6}</p>
          <p>{countries.requirement7}</p>
          <p>{countries.requirement8}</p>
          <p>{countries.requirement9}</p>
          <p>{countries.requirement10}</p>
          <p>{countries.requirement11}</p>
          <p>{countries.requirement12}</p>
          <p>{countries.requirement13}</p>
          <p>{countries.requirement14}</p>
          <p>{countries.requirement15}</p>
          <p>{countries.requirement16}</p>
          <p  className="font-bold text-md sm:text-xl mt-4">{countries.supportiveDoc}</p>
          
          <p>{countries.requirement17}</p>
          <p>{countries.requirement18}</p>
          <p>{countries.requirement19}</p>
          <p>{countries.requirement20}</p>
          <p>{countries.requirement21}</p>
    
          </div>
       
        
        </div>


      </div> 

      <Link href="/fileConsultancyForm">
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

    <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white shadow-lg my-6 rounded-2xl mx-auto p-6 w-full md:w-1/3 text-center border-t-4 border-orange-500"
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center justify-center gap-2">
                  <FaMapMarkerAlt /> Office Locations
                </h2>
                <p className="text-gray-600 text-lg flex items-center justify-center mb-2">
              7-Amin Arcade (Hotel Ambassador) Durand Road, Near Shimla Pahari, Lahore Pakistan.
                </p>
                <hr/>
                <p className="text-gray-600 text-lg flex items-center justify-center mt-2">
               H9W3+P5F, Tariq Shaheed Road, Bhagatpura, Lahore Pakistan.
                </p>
              </motion.div> 




      
            <div className="my-8 w-full bg-gray-200">
              <h1>.</h1>
        <h2 className="text-center text-xl sm:text-2xl font-bold mt-6 mb-5"><u>You May Also Like:</u></h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-6 mx-auto max-w-6xl">
          {randomCountries.map((country) => (
            <div key={country._id} className="sm:w-[290px] w-[150px] border-solid border-black rounded-xl bg-blue-200 xl:mx-10 mx-auto sm:mx-4 hover:shadow-md hover:shadow-black text-center my-3">
              <Link href={`/fileConsult/${country._id}`}>
              <div className="relative group">
  <img src={country.imageUrl} alt={country.countryName} className="mx-auto my-4 sm:h-[250px] h-[100px] w-[130px] rounded-lg sm:w-[270px] transition duration-300 group-hover:brightness-75 " />
  <div className="absolute inset-0 bg-white  bg-opacity-50 opacity-0 group-hover:opacity-100 flex justify-center items-center transition-opacity duration-300">
    <h3 className="sm:text-xl text-md font-bold font-serif text-black">{country.countryName}</h3>
  </div>
</div> 
                    <h2 className="text-center text-sm sm:text-lg mt-2"><b>{country.prize}</b> PKR/-</h2>
                    <button className="bg-orange-500 rounded-xl sm:w-[130px] w-[100px] text-white text-sm sm:text-md mb-4 mt-1 hover:bg-blue-500 hover:shadow-[0_4px_14px_rgba(0,0,0,0.2)] transition duration-300 shadow-lg font-serif">View Details</button>
              </Link>
            </div>
          ))}
        </div>
      </div>   

    </div>
  );
}
