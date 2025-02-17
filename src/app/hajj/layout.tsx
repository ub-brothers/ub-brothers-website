"use client"
import Link from "next/link";
import { usePathname} from "next/navigation";
import { motion } from 'framer-motion';

export default function DestinationLayout( {children,
}: Readonly<{
  children: React.ReactNode;
}>
){
    const pathname = usePathname(); 
    return(
        <>
        <div className="my-4 text-center ">
           <Link href="/umrah" className="mx-2">
          <button
            className={`${
              pathname.startsWith ("/umrah") ? "bg-blue-500" : "bg-orange-500"
            } w-[140px] rounded-2xl h-6 text-white font-bold font-sans hover:bg-blue-700 hover:shadow-[0_4px_14px_rgba(0,0,0,0.2)] transition duration-300 shadow-lg`}
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
        <h1  className="font-bold">Shaharyaar Mughal:</h1>
        <p>+92 300 9480157</p></div>
      </div>
        {children}

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
          src="/image/ceo.jpeg"
          alt="Visa Applicant"
          className="w-[200px] h-[200px] rounded-full object-cover"
        />
      </motion.div>

      {/* Name and Numbers */}
      <div className="text-center">
        <p className="sm:text-2xl text-lg font-semibold font-serif">Mirza Shaharyaar Mughal</p>
        <p className="text-sm text-gray-500 mt-2">+92 300 9480157</p>
      </div>
    </div>
        </>
    )
    
}