"use client"
import { useEffect, useState } from "react"
import { IranType} from "../types/destinations"
import {client} from "@/sanity/lib/client"
import { iranZiyarat} from "@/sanity/lib/queries"
import Link from "next/link"
import { FaMapMarkerAlt } from "react-icons/fa";
import { motion } from 'framer-motion'; 
import { jwtDecode } from 'jwt-decode';
import { MdOutlineDoNotDisturbOnTotalSilence } from "react-icons/md";
import LocationInfo from "../locationInfo/page"

const IranIraq = ()=>{
  const [activeTab, setActiveTab] = useState("By Air");
  
    const [ tour, setTour ] = useState<IranType[]>([])
    const [isApprovedUser, setIsApprovedUser] = useState(false);
    const byAirTours = tour.filter(t => t.shortDescription?.toLowerCase().includes("by air"));
    const byRoadTours = tour.filter(t => t.shortDescription?.toLowerCase().includes("by road"));
    useEffect(()=>{

      const token = localStorage.getItem("token");

      if (token) {
        try {
          const decoded: any = jwtDecode(token);
       
  
          if (decoded.approved === true || decoded.approved === "true") {
            setIsApprovedUser(true);
          } else {
            setIsApprovedUser(false);
          }
        } catch (error) {
          console.error("Invalid token", error);
        }
      }
  


        async function fetchedTour(){
            const fetchTour: IranType[] = await client.fetch(iranZiyarat)
            setTour(fetchTour)
        }
        fetchedTour();
    }, [])

if (tour.length === 0){
  return (
    <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
  )
}

    if (tour.length === 0) {
      return (
         <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-400 to-blue-200">
             <motion.div
               initial={{ opacity: 0, y: 50 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, ease: 'easeOut' }}
               className="bg-white/20 backdrop-blur-xl p-10 rounded-2xl shadow-2xl border border-white/30"
             >
               <h1 className="text-white text-5xl flex gap-2 font-extrabold text-center drop-shadow-lg">
              <MdOutlineDoNotDisturbOnTotalSilence/>   Not Available Now!
               </h1>
              
             </motion.div>
           </div>
      );
    }

    return(
        <div>
        <div className="container mx-auto p-6 text-center">
      <motion.h1
        className="sm:text-4xl sm:mt-10 text-2xl font-bold text-gray-800"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }} 
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

<h2 className="sm:text-4xl text-2xl sm:mt-[100px] mt-6 mb-4 font-semibold"> Reserve your spot today!</h2>
<h1 className="text-center mx-2 my-4">Below are our specially designed Ziyarat packages for Iran, Iraq, and Shaam. Choose your journey and book now for a seamless pilgrimage experience!</h1>
<div className="flex justify-center my-6 gap-4">
  <button
    onClick={() => setActiveTab("By Air")}
    className={`px-6 py-2 rounded-full font-semibold ${activeTab === "By Air" ? "bg-blue-600 text-white" : "bg-gray-200 text-black"}`}
  >
    By Air
  </button>
  <button
    onClick={() => setActiveTab("By Road")}
    className={`px-6 py-2 rounded-full font-semibold ${activeTab === "By Road" ? "bg-blue-600 text-white" : "bg-gray-200 text-black"}`}
  >
    By Road
  </button>
</div>
<div className="flex grid lg:grid-cols-3 grid-cols-2 mb-8">
   {(activeTab === "By Air" ? byAirTours : byRoadTours).length === 0 ? (
    <div className="col-span-full text-center text-red-600 font-semibold text-xl my-10 flex flex-col items-center gap-2 mb-20">
      <MdOutlineDoNotDisturbOnTotalSilence className="text-4xl" />
      No Ziyarat available for {activeTab.toLowerCase()}.
    </div>
  ) : (
  (activeTab === "By Air" ? byAirTours : byRoadTours).map((tour) => (
    <div key={tour._id} className="sm:w-[290px]  w-[150px] rounded-xl border-2  border-gray-300  bg-gray-100 xl:mx-10 mx-2 sm:mx-4 hover:shadow-md hover:shadow-black  text-left my-3">
      <Link href={{
        pathname: "/iranForm",
        query: {
          countryName: tour.countryName,
          shortDescription: tour.shortDescription,
          
          prize: tour.prize,
          priceForUsers : tour.priceForUsers,
          transport: tour.transport,
          hotel:tour.hotel,
          meal: tour.meal,
          visa :tour.visa,
          ticket:tour.ticket,
          airlineName:tour.airlineName,
          airlineImage:tour.airlineImage,
          dep:tour.dep,
          flightNum1:tour.flightNum1,
          dateOfFlight1 :tour.dateOfFlight1,
          route1:tour.route1,
          time1:tour.time1,
          return:tour.return,
          flightNum2:tour.flightNum2,
          dateOfFlight2:tour.dateOfFlight2,
          route2:tour.route2,
          time2:tour.time2,
        },
      }}>
        <div className="relative group text-center">
          <img src={tour.imageUrl2} alt={tour.countryName} className="mx-auto my-4 sm:h-[250px] h-[100px] w-[130px] rounded-lg sm:w-[270px] transition duration-300 group-hover:brightness-75 " />
        </div> 
        <h3 className=" sm:text-xl text-md text-left flex ml-4 gap-1 font-bold sm:gap-2 text-lg text-black">{tour.countryName}</h3>
        <h3 className=" sm:text-lg text-sm text-left flex ml-4 gap-1  sm:gap-2 text-lg text-gray-600">{tour.shortDescription}</h3>
        <h2 className="text-left font-semibold text-md ml-4 mb-2 sm:text-md mt-1">${isApprovedUser ? tour.priceForUsers : tour.prize}</h2>
        <h3 className=" sm:text-lg text-sm text-left flex ml-4 gap-1  sm:gap-2 text-lg text-gray-600">{tour.shortDescriptionReal}</h3>
        
        
        <div className="text-center">
          <button className="bg-orange-500 rounded-xl h-8 w-[100px] sm:w-[130px] text-white text-sm sm:text-md mb-4 mt-4 hover:bg-blue-500  hover:shadow-[0_4px_14px_rgba(0,0,0,0.2)] transition duration-300 shadow-lg font-serif text-center">Book Now</button>
        </div>
      </Link>
    </div>
  )))}
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
      <h2 className="text-3xl font-semibold font-sans mb-4 text-center text-black"><u>You Can Directly Contact:</u></h2>

      <div className="text-center">
        <p className="sm:text-2xl text-lg font-semibold font-serif">Alhaj M. Shaharyaar</p>
        <p className="text-lg text-gray-800 mt-2">03414311000</p>
        <p className="sm:text-2xl text-lg font-semibold font-serif mt-4">Mirza Ali</p>
        <p className="text-lg text-gray-800 mt-2">03414314000</p>
      </div>
    </div>
    
 <div className="my-6 flex items-center justify-center ">
      <LocationInfo/>
    </div>
    </div>
    </div>
    )
}


export default IranIraq;
