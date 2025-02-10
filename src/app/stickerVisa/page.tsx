"use client"
import {client} from "@/sanity/lib/client"
import { useEffect, useState } from "react"
import { Destination } from "../types/destinations"
import { stickerVisa } from "@/sanity/lib/queries"
import Link from "next/link"
import { IoLocationOutline } from "react-icons/io5";

const StickerVisa =()=>{
    const [destination, setDestination] = useState<Destination[]>([])

    useEffect(()=>{
        async function fetchedDestination(){
            const fetchedDestination: Destination[] = await client.fetch(stickerVisa)
            setDestination(fetchedDestination)
        }
        fetchedDestination()
    },[])



  return(
    
    <div>
        <h1 className="text-center my-4 text-3xl font-serif">
        <u> Sticker Visa:</u>
      </h1>
        <div className="flex grid  lg:grid-cols-3 grid-cols-2 xl:grid-cols-4 mb-8 ">
            {destination.map ((destination)=>(
             
                <div key={destination._id} className="sm:w-[290px] w-[150px] border-2  border-gray-400  rounded-xl bg-gray-100 xl:mx-10 mx-2 sm:mx-4 hover:shadow-md hover:shadow-black text-center my-3">
                    <Link href={`/stickerVisa/${destination._id}`}>
                    <div className="relative group">
  <img src={destination.imageUrl} alt={destination.countryName} className="mx-auto my-4 sm:h-[250px] h-[100px] w-[130px] rounded-lg sm:w-[270px] transition duration-300 group-hover:brightness-75 " />
  <div className="absolute inset-0 bg-white  bg-opacity-50 opacity-0 group-hover:opacity-100 flex justify-center items-center transition-opacity duration-300">
    <h3 className="sm:text-xl text-md font-bold font-serif text-black">{destination.countryName}</h3>
  </div>
</div> 

                  <h3 className=" sm:text-md text-sm text-left flex ml-4 gap-1 font-bold sm:gap-2 text-lg text-black"><IoLocationOutline className="mt-1" />{destination.countryName}</h3>
                                      <h2 className="text-left text-sm ml-6 sm:text-md mt-1">Rs. {destination.prize}</h2>

                 
                    <button className="bg-orange-500 rounded-xl w-[100px] sm:w-[130px] text-white text-sm sm:text-md mb-4 mt-4 hover:bg-blue-500 hover:shadow-[0_4px_14px_rgba(0,0,0,0.2)] transition duration-300 shadow-lg font-serif">View Details</button></Link>
                    {/* <h1 className="country text-center font-bold text-xl ">{destination.countryName}</h1>
                   
                  
                    <h2 className="text-center fonr-sans ">{destination.availability}!</h2>
                     */}
                </div>
            ))}
        </div>
    </div>
  )


}

export default StickerVisa;