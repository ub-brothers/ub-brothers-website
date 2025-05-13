"use client"
import Link from "next/link";
import { usePathname} from "next/navigation";
import { motion } from 'framer-motion';
import { FaMapMarkerAlt } from "react-icons/fa";
import UmrahFloatingOffer from "../umrahOfferIcon/page";
import LocationInfo from "../locationInfo/page";


export default function DestinationLayout( {children,
}: Readonly<{
  children: React.ReactNode;
}>
){
    const pathname = usePathname(); 
    return(
        <>
        <UmrahFloatingOffer/>
        <div className="my-4 text-center ">
           <Link href="/umrah" className="mx-2">
          <button
            className={`${
              pathname.startsWith ("/umrah") ? "bg-blue-500" : "bg-orange-500"
            } w-[120px] rounded-2xl h-6 text-white font-bold font-sans hover:bg-blue-700 hover:shadow-[0_4px_14px_rgba(0,0,0,0.2)] transition duration-300 shadow-lg`}
          >
            Umrah
          </button>
        </Link>
        <Link href="/hajj">
          <button
            className={`${
              pathname.startsWith ("/hajj") ? "bg-blue-500" : "bg-orange-500"
            } w-[100px] rounded-2xl h-6 text-white font-bold font-sans hover:bg-blue-700 hover:shadow-[0_4px_14px_rgba(0,0,0,0.2)] transition duration-300 shadow-lg`}
          >
            Hajj
          </button>
        </Link>
        
    
    
        <div className="sm:text-right text-center m-4 sm:text-md text-sm">
        <h1  className="font-bold">Mirza Ali:</h1>
        <p>03414314000</p></div>
      </div>
        {children}


        <div className="w-full p-8">
      <h2 className="text-3xl font-bold font-sans mb-8 text-center text-blue-900">You Can Directly Contact:</h2>
      
  

    
      <div className="text-center">
        <p className="sm:text-2xl text-lg font-semibold font-serif">Mirza Ali</p>
        <p className="text-sm text-gray-500 mt-2">03414314000</p>
        <p className="text-sm text-gray-500">&#9993;  visa@ubbrothers.com</p>
    
      </div>
 <div className="my-6 flex items-center justify-center ">
      <LocationInfo />
    </div>


      
    </div>
        </>
    )
    
}