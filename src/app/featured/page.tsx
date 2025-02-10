"use client"
import { client } from "@/sanity/lib/client"
import { useEffect, useState, useRef } from "react"
import { Destination } from "../types/destinations"
import { featuredestinations } from "@/sanity/lib/queries"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import Link from "next/link"
import { IoLocationOutline } from "react-icons/io5";

const Featured = () => {
  const [destination, setDestination] = useState<Destination[]>([])
  const scrollRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    async function fetchedDestination() {
      const fetchedDestination: Destination[] = await client.fetch(featuredestinations)
      setDestination(fetchedDestination)
    }
    fetchedDestination()
  }, [])

  // Function to handle scroll action
  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="relative">
      {/* Left Arrow */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md z-10"
        onClick={() => handleScroll("left")}
      >
        <FaChevronLeft size={20} />
      </button>

      <div className="flex space-x-4 overflow-x-auto p-4" ref={scrollRef}>
        {destination.map((destination) => (
          <div
            key={destination._id}
            className="sm:min-w-[300px] w-[250px]  flex-shrink-0 border-solid border-black rounded-xl  mx-4 sm:mx-2 hover:shadow-md hover:shadow-black text-center "
          ><Link href={`/destinations/${destination._id}`}>
            <div className="relative group">
              <img
                src={destination.imageUrl}
                alt={destination.countryName}
                className="mx-auto mb-4 h-[200px] w-[250px] sm:h-[300px] rounded-lg sm:w-[350px] transition duration-300 group-hover:brightness-75"
              />
              <div className="absolute inset-0 bg-white bg-opacity-50 opacity-0 group-hover:opacity-100 flex justify-center items-center transition-opacity duration-300">
                <h3 className="sm:text-xl text-lg font-bold font-serif text-black">{destination.countryName}</h3>
              </div>
            </div>
            
           <h3 className=" sm:text-md text-sm text-left flex ml-4 gap-1 font-bold sm:gap-2 text-lg text-black"><IoLocationOutline className="mt-1" />{destination.countryName}</h3>
                               <h2 className="text-left text-sm ml-6 sm:text-md mt-1">Rs. {destination.prize}</h2>
            <button className="bg-orange-500 rounded-xl sm:w-[130px] w-[100px] text-white text-sm sm:text-md mb-4 mt-4 hover:bg-blue-500 hover:shadow-[0_4px_14px_rgba(0,0,0,0.2)] transition duration-300 shadow-lg font-serif">
              View Details
            </button></Link>
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md z-10"
        onClick={() => handleScroll("right")}
      >
        <FaChevronRight size={20} />
      </button>
    </div>
  )
}

export default Featured;
