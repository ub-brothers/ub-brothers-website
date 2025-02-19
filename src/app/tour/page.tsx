"use client"
import { useEffect, useState } from "react"
import { TourType } from "../types/destinations"
import {client} from "@/sanity/lib/client"
import { tourPackage } from "@/sanity/lib/queries"
import Link from "next/link"
import { motion } from 'framer-motion'; 


const TourPackage = ()=>{
    const [ tour, setTour ] = useState<TourType[]>([])

    useEffect(()=>{
        async function fetchedTour(){
            const fetchTour: TourType[] = await client.fetch(tourPackage)
            setTour(fetchTour)
        }
        fetchedTour();
    }, [])


    return(
        <div>
        <h1 className="text-left xl:mx-10 sm:mx-4 mx-2 my-4 text-lg sm:text-3xl font-serif">
        <u>Tour Packages:</u>
      </h1>
        <div className="flex grid grid-cols-2 mb-8">
            {tour.map ((tour)=>(
             
                <div key={tour._id} className="sm:w-[290px]  w-[150px] rounded-xl border-2  border-gray-300  bg-gray-100 xl:mx-10 mx-2 sm:mx-4 hover:shadow-md hover:shadow-black  text-left my-3">
                    <Link href={`/tour/${tour._id}`} >
                    <div className="relative group text-center">
  <img src={tour.imageUrl4} alt={tour.countryName} className="mx-auto my-4 sm:h-[250px] h-[100px] w-[130px] rounded-lg sm:w-[270px] transition duration-300 group-hover:brightness-75 " />
  <div className="absolute inset-0 bg-white  bg-opacity-50 opacity-0 group-hover:opacity-100 flex justify-center items-center transition-opacity duration-300">
    <h3 className="text-sm font-bold font-serif text-black">{tour.countryName}</h3>
  </div>
</div> 
{/* <h1 className="text-black text-sm text-left ml-6">{tour.shortDescription}</h1> */}

                  <h3 className=" sm:text-md text-sm text-left flex ml-4 gap-1 font-bold sm:gap-2 text-lg text-black">{tour.countryName}</h3>
                                      <h2 className="text-left text-sm ml-4 sm:text-md mt-1">Rs. {tour.prize}</h2>
                 
                    <button className="bg-orange-500 rounded-xl w-[100px] sm:w-[130px] text-white text-sm sm:text-md mb-4 mt-4 hover:bg-blue-500 ml-6 hover:shadow-[0_4px_14px_rgba(0,0,0,0.2)] transition duration-300 shadow-lg font-serif text-center">View Details</button>
                    </Link>
                   
                </div>
            ))}
        </div>

        <div className="w-full p-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-800">You Can Directly Contact:</h2>
      
      {/* Image with animation */}
      <motion.div 
        className="flex justify-center mb-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        whileHover={{ scale: 1.05 }}
        viewport={{ once: false }} // Trigger animation only once when in view
      >
        <img
          src="/image/ali.jpeg"
          alt="Visa Applicant"
          className="w-[200px] h-[200px] rounded-full object-cover"
        />
      </motion.div>

      {/* Name and Numbers */}
      <div className="text-center">
        <p className="sm:text-2xl text-lg font-semibold font-serif">Mirza Ali</p>
        <p className="text-sm text-gray-500 mt-2">+923 264 214241</p>
        <p className="text-sm text-gray-500">+923 174 141149</p>
      </div>
    </div>
    </div>
     
    )


}


export default TourPackage;