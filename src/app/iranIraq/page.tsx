"use client"
import { useEffect, useState } from "react"
import { IranType} from "../types/destinations"
import {client} from "@/sanity/lib/client"
import { iranZiyarat} from "@/sanity/lib/queries"
import Link from "next/link"
import { FaMapMarkerAlt } from "react-icons/fa";
import { motion } from 'framer-motion'; 
import { FaBus, FaPassport, FaTicketAlt, FaHotel, FaUtensils } from "react-icons/fa";


const packages = [
  { icon: <FaBus size={30} className="text-blue-500" />, title: "Transport" },
  { icon: <FaPassport size={30} className="text-blue-500" />, title: "Visa" },
  { icon: <FaTicketAlt size={30} className="text-blue-500" />, title: "Ticket" },
  { icon: <FaHotel size={30} className="text-blue-500" />, title: "Hotel" },
  { icon: <FaUtensils size={30} className="text-blue-500" />, title: "Meal" },
];

const IranIraq = ()=>{
    const [ tour, setTour ] = useState<IranType[]>([])

    useEffect(()=>{
        async function fetchedTour(){
            const fetchTour: IranType[] = await client.fetch(iranZiyarat)
            setTour(fetchTour)
        }
        fetchedTour();
    }, [])


    return(
        <div>
        <div className="container mx-auto p-6 text-center">
      <motion.h1
        className="sm:text-4xl sm:mt-10 text-2xl font-bold text-gray-800"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Iran, Iraq, Shaam Ziyarat
      </motion.h1>
      <motion.p
        className="text-lg text-gray-600 mt-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Experience a spiritual journey with our exclusive Iran-Iraq ziyarat packages.
        We provide seamless travel arrangements to make your trip memorable.
      </motion.p>
      
      <div className="grid grid-cols-2 gap-4 my-6">
        <motion.img
          src="/image/iran.jpg"
          alt="Ziyarat 1"
          className="w-full h-70 object-cover rounded-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.img
          src="/image/iraq.webp"
          alt="Ziyarat 2"
          className="w-full h-70 object-cover rounded-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />
      </div>

<h2 className="sm:text-4xl text-2xl sm:mt-[100px] mt-6 mb-4 font-semibold">Our journey is set to begin in the <b>Second Week of Shawwal.</b> Reserve your spot today!</h2>
<h1 className="text-center mx-2 my-4">Below are our specially designed Ziyarat packages for Iran, Iraq, and Shaam. Choose your journey and book now for a seamless pilgrimage experience!</h1>

      <div className="flex grid lg:grid-cols-3 grid-cols-2 mb-8">
            {tour.map ((tour)=>(
             
                <div key={tour._id} className="sm:w-[290px]  w-[150px] rounded-xl border-2  border-gray-300  bg-gray-100 xl:mx-10 mx-2 sm:mx-4 hover:shadow-md hover:shadow-black  text-left my-3">
                    <Link href={{
      pathname: "/iranForm",
      query: {
      countryName: tour.countryName,
      shortDescription: tour.shortDescription,
      prize: tour.prize,
      },
    }} >
                    <div className="relative group text-center">
  <img src={tour.imageUrl2} alt={tour.countryName} className="mx-auto my-4 sm:h-[250px] h-[100px] w-[130px] rounded-lg sm:w-[270px] transition duration-300 group-hover:brightness-75 " />
 
</div> 

                  <h3 className=" sm:text-xl text-md text-left flex ml-4 gap-1 font-bold sm:gap-2 text-lg text-black">{tour.countryName}</h3>
                  <h3 className=" sm:text-lg text-sm text-left flex ml-4 gap-1  sm:gap-2 text-lg text-gray-600">{tour.shortDescription}</h3>
                   <h2 className="text-left font-semibold text-sm ml-4 sm:text-md mt-1">{tour.prize} PKR/-</h2>
                 
                 <div className="text-center">
                    <button className="bg-orange-500 rounded-xl h-8 w-[100px] sm:w-[130px] text-white text-sm sm:text-md mb-4 mt-4 hover:bg-blue-500  hover:shadow-[0_4px_14px_rgba(0,0,0,0.2)] transition duration-300 shadow-lg font-serif text-center">Book Now</button> </div>
                    </Link>
                   
                </div>
            ))}
        </div>


      <h2 className="text-2xl font-semibold text-gray-800 my-6">Package Includes</h2>
      <div className="grid md:grid-cols-5 sm:grid-cols-2 gap-4">
        {packages.map((pkg, index) => (
          <motion.div
            key={index}
            className="border border-blue-500 rounded-lg p-4 flex flex-col items-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            {pkg.icon}
            <h3 className="text-lg font-medium text-gray-700 mt-2">{pkg.title}</h3>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-10 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold text-gray-800">We'd Love to Hear From You</h2>
        <p className="text-gray-600 mt-2">
          Feel free to reach out for any queries regarding our Ziyarat packages. We're here to help you.
        </p>
      </motion.div>


      <div className="w-full p-8 mt-10 bg-gray-100">
      <h2 className="text-3xl font-semibold mb-4 text-center text-black"><u>You Can Directly Contact:</u></h2>

      <div className="text-center">
        <p className="sm:text-2xl text-lg font-semibold font-serif">Mirza Shaharyaar Mughal</p>
        <p className="text-lg text-gray-800 mt-2">+92 300 9480157</p>
        <p className="sm:text-2xl text-lg font-semibold font-serif mt-4">Mirza Ali</p>
        <p className="text-lg text-gray-800 mt-2">+92 326 4214241</p>
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
    </div>
    </div>
    )
}


export default IranIraq;
