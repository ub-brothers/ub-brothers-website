"use client"
import {client} from "@/sanity/lib/client"
import { useEffect, useState } from "react"
import { Destination } from "../types/destinations"
import { allDestinations } from "@/sanity/lib/queries"
import Link from "next/link"


const Card =()=>{
    const [destination, setDestination] = useState<Destination[]>([])

    useEffect(()=>{
        async function fetchedDestination(){
            const fetchedDestination: Destination[] = await client.fetch(allDestinations)
            setDestination(fetchedDestination)
        }
        fetchedDestination()
    },[])



  return(
    
    <div>
        <div className="flex grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
      
            {destination.map ((destination)=>(
                <div key={destination._id} className="sm:w-[290px] w-[150px] border-solid border-black rounded-xl bg-blue-200 xl:mx-10 mx-2 sm:mx-4 hover:shadow-md hover:shadow-black text-center my-3">
                 
                    <div className="relative group">
  <img src={destination.imageUrl} alt={destination.countryName} className="mx-auto my-4 sm:h-[250px] h-[100px] w-[130px] rounded-lg sm:w-[270px] transition duration-300 group-hover:brightness-75 " />
  <div className="absolute inset-0 bg-white  bg-opacity-50 opacity-0 group-hover:opacity-100 flex justify-center items-center transition-opacity duration-300">
    <h3 className="sm:text-xl text-md font-bold font-serif text-black">{destination.countryName}</h3>
  </div>
</div> 
{/* <h3 className="mx-4 text-center font-sans font-italic mt-2">{destination.shortDescription}</h3> */}
                    <h2 className="text-center text-sm sm:text-lg mt-2"><b>{destination.prize}</b> PKR/-</h2>
              
                    <button className="bg-orange-500 rounded-xl sm:w-[130px] w-[100px] text-white text-sm sm:text-md mb-4 mt-1 hover:bg-blue-500 hover:shadow-[0_4px_14px_rgba(0,0,0,0.2)] transition duration-300 shadow-lg font-serif">View Details</button>
                   
                </div>
            ))}
        </div>
    </div>
  )


}

export default Card;