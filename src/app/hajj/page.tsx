'use client';
import { useEffect, useState } from "react"
import { IranType} from "../types/destinations"
import {client} from "@/sanity/lib/client"
import Image from 'next/image';
import { FaMapMarkerAlt } from "react-icons/fa";
import { motion } from 'framer-motion';
import { FaPlane, FaHotel, FaUtensils, FaBus, FaMosque } from 'react-icons/fa';
import Link from 'next/link';
import PaymentDetails from '../payment/page';
import { hajjPack } from '@/sanity/lib/queries';



const features = [
  { icon: <FaPlane size={50} className="text-blue-600" />, title: 'Ticket' },
  { icon: <FaHotel size={40} className="text-blue-600" />, title: 'Hotel' },
  { icon: <FaUtensils size={40} className="text-blue-600" />, title: 'Food' },
  { icon: <FaBus size={40} className="text-blue-600" />, title: 'Transport' },
  { icon: <FaMosque size={40} className="text-blue-600" />, title: 'Ziyarat & Ibadat' }
];


export default function HajjPackage() {

  const [ tour, setTour ] = useState<IranType[]>([])

    useEffect(()=>{
        async function fetchedTour(){
            const fetchTour: IranType[] = await client.fetch(hajjPack)
            setTour(fetchTour)
        }
        fetchedTour();
    }, [])


  
  return (
    <div className="min-h-screen  flex flex-col items-center p-6">
      <motion.h1 
        className="text-4xl font-bold text-center font-serif text-blue-800 mb-1 "
        initial={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
        whileInView={{ opacity: 1 }}
        
      >
        Hajj 2025
      </motion.h1>

<motion.p 
        className="text-lg text-center text-gray-700 max-w-2xl mb-6"
        initial={{ opacity: 0, y: 10 }}
      
        transition={{ delay: 0.2, duration: 0.6 }}
        whileInView={{ opacity: 1 }}
      >
        Experience the spiritual journey of Hajj with our exclusive packages. We offer exclusive Hajj packages with flexible durations and pricing based on double, triple, and sharing accommodations. Enjoy a comfortable stay, premium services, and hassle-free arrangements at the best rates. Book now for a spiritually fulfilling journey!
      </motion.p>

      
<h1 className="text-3xl text-center font-bold mt-8 mb-6 mx-4 font-sans">Below are our Hajj Packages, Book your spot Now!</h1>

      

<div className="flex grid lg:grid-cols-3 sm:grid-cols-2 mb-8">
            {tour.map ((tour)=>(
             
<div key={tour._id} className="w-[290px]  rounded-xl border-2  border-gray-300  bg-gray-100 xl:mx-10 mx-2 sm:mx-4 hover:shadow-md hover:shadow-black  text-left my-3">
<Link href={{
  pathname: "/hajjForm",
  query: {
    countryName: tour.countryName,
    shortDescription: tour.shortDescription,
    prize1: tour.prize1,
    prize2: tour.prize2,
    prize3: tour.prize3
  },
}} >
<div className="relative group text-center">
<img src={tour.imageUrl2} alt={tour.countryName} className="mx-auto my-4 h-[250px] rounded-lg w-[250px] sm:w-[270px] transition duration-300 group-hover:brightness-75 " />
 
</div> 

<h3 className=" sm:text-xl text-md text-left flex ml-4 gap-1 font-bold sm:gap-2 text-lg text-black">{tour.countryName}</h3>
<h3 className=" sm:text-lg text-sm text-left flex ml-4 gap-1  sm:gap-2 text-lg text-gray-600">{tour.shortDescription}</h3>
<h2 className="text-left text-gray-700 text-sm ml-4 sm:text-md mt-1">Sharing: <b>{tour.prize1}</b> PKR/-</h2>
<h2 className="text-left text-gray-700 text-sm ml-4 sm:text-md mt-1">Triple: <b>{tour.prize2}</b> PKR/-</h2>
<h2 className="text-left text-gray-700 text-sm ml-4 sm:text-md mt-1">Double: <b>{tour.prize3}</b> PKR/-</h2>
<div className="text-center">
<button className="bg-orange-500 rounded-xl h-8 w-[100px] sm:w-[130px] text-white text-sm sm:text-md mb-4 mt-4 hover:bg-blue-500  hover:shadow-[0_4px_14px_rgba(0,0,0,0.2)] transition duration-300 shadow-lg font-serif text-center">Book Now</button> </div>
</Link>
                   
                </div>
            ))}
        </div>




      {/* <motion.p 
        className="text-lg text-center text-gray-700 max-w-2xl mb-4"
        initial={{ opacity: 0, y: 10 }}
       
        transition={{ delay: 0.6, duration: 0.6 }}
        whileInView={{ opacity: 1 }}
      >
Customize your travel duration according to your convenience and spiritual needs.
Our package offers premium hotels, delicious meals, and comfortable transportation.
All this comes at reasonable prices, ensuring an affordable yet luxurious experience.
Join us for a Hajj journey with unparalleled comfort and peace of mind.
      </motion.p>
      <Link href="/hajjForm">
      <motion.button 
        className="bg-blue-600 text-white px-6 py-3 mt-5 rounded-lg text-lg font-semibold hover:bg-blue-700 transition shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        whileInView={{ opacity: 1 }}
      >
        Book Now
      </motion.button></Link>
<motion.div 
        className="flex flex-col md:flex-row gap-4 mb-6"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        viewport={{ once: true }}
      >
        <Image src="/image/masjid.jpg" alt="Makkah" width={300} height={200} className="rounded-lg shadow-lg" />
        <Image src="/image/makkahh.jpg" alt="Madina" width={300} height={200} className="rounded-lg shadow-lg" />
      </motion.div> */}
      
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className='my-14'>
      <h2 className="text-3xl font-bold font-sans text-center text-gray-900 mb-6">Hajj Package Includes</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {features.map((feature, index) => (
          <motion.div 
            key={index} 
            className="flex flex-col items-center justify-center border-2 border-blue-600 p-6 rounded-lg shadow-md bg-white"
            initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
           
          >
            {feature.icon}
            <p className="mt-3 text-lg font-semibold text-gray-800">{feature.title}</p>
          </motion.div>
        ))}
      </div>
      </div>

      <h1 className="my-4 font-bold text-xl sm:text-2xl font-sans">Stay in Comfortable and Quality Makkah and Madina Hotels!</h1>
      <motion.div 
        className="flex flex-col md:flex-row items-center gap-6 my-12"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        whileHover={{ scale: 1.05 }}
        viewport={{ once: true }}
      >
        <Image src="/image/hotel1.jpeg" alt="Hotel" width={500} height={350} className="rounded-lg shadow-lg" />
        <Image src="/image/hotel2.jpg" alt="Hotel" width={500} height={350} className="rounded-lg shadow-lg" />
      </motion.div>
      
      <p className="text-lg text-center text-gray-700 max-w-2xl mb-6">
        Our 4/5 star hotels are selected to provide the highest level of comfort and convenience. Enjoy luxurious stays with modern amenities, exceptional service, and easy access to holy sites, ensuring a truly peaceful and hassle-free experience.
      </p>
      
      <h3 className="text-2xl font-semibold text-gray-900 text-center mb-6">We'd love to hear from you!</h3>
     
    </div>
    <div className="w-full p-8 bg-gray-100">
      <h2 className="text-3xl font-bold font-sans  mb-8 text-center text-blue-900">You Can Directly Contact:</h2>
      
  

      
      <div className="text-center">
        <p className="sm:text-2xl text-lg font-semibold font-serif">Mirza Shaharyaar Mughal</p>
        <p className="text-sm text-gray-500 mt-2">+92 300 9480157</p>
        <p className="text-sm text-gray-500">&#9993;  ubbrotherspk@gmail.com</p>
      </div>
      <div className="text-center mt-4">
        <p className="sm:text-2xl text-lg font-semibold font-serif">Mirza Ali</p>
        <p className="text-sm text-gray-500 mt-2">+92 326 4214241</p>
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
    <PaymentDetails/>
    </div>
  );
}
