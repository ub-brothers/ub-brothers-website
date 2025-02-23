'use client';

import Image from 'next/image';
import { FaMapMarkerAlt } from "react-icons/fa";
import { motion } from 'framer-motion';
import { FaPlane, FaHotel, FaUtensils, FaBus, FaMosque } from 'react-icons/fa';
import Link from 'next/link';
import PaymentDetails from '../payment/page';



const features = [
  { icon: <FaPlane size={50} className="text-blue-600" />, title: 'Flight' },
  { icon: <FaHotel size={40} className="text-blue-600" />, title: 'Hotel' },
  { icon: <FaUtensils size={40} className="text-blue-600" />, title: 'Food' },
  { icon: <FaBus size={40} className="text-blue-600" />, title: 'Transport' },
  { icon: <FaMosque size={40} className="text-blue-600" />, title: 'Ziyarat & Ibadat' }
];


export default function HajjPackage() {
  return (
    <div className="min-h-screen  flex flex-col items-center p-6">
      <motion.h1 
        className="text-4xl font-bold text-center font-serif text-blue-800 mb-1 sm:mb-4"
        initial={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
        whileInView={{ opacity: 1 }}
        
      >
        Exclusive Hajj Package
      </motion.h1>
      
      <motion.p 
        className="text-lg text-center text-gray-700 max-w-2xl mb-6"
        initial={{ opacity: 0, y: 10 }}
      
        transition={{ delay: 0.2, duration: 0.6 }}
        whileInView={{ opacity: 1 }}
      >
        Experience the spiritual journey of Hajj with our exclusive packages. We ensure a seamless and comfortable pilgrimage with top-notch accommodations and services. Choose your preferred duration and enjoy a blessed journey.
      </motion.p>
      
      <motion.div 
        className="flex flex-col md:flex-row gap-4 mb-6"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        viewport={{ once: true }}
      >
        <Image src="/image/masjid.jpg" alt="Makkah" width={400} height={300} className="rounded-lg shadow-lg" />
        <Image src="/image/makkahh.jpg" alt="Madina" width={400} height={300} className="rounded-lg shadow-lg" />
      </motion.div>

      <motion.p 
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

      <div className="p-6 mt-10 flex flex-col items-center">
  <h2 className="text-lg font-semibold mb-4 text-center">
    Prices vary depending on the number of days you choose
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {[
      { category: "Sharing", price: "1450000 PKR" },
      { category: "Double Bed", price: "1500000 PKR" },
      { category: "Triple Bed", price: "1575000 PKR" },
    ].map((item, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
        className="bg-blue-500 text-white p-4 rounded-lg shadow-lg w-full text-center"
      >
        <h3 className="text-xl font-bold mb-2">{item.category}</h3>
        <p className="text-lg">{item.price}</p>
      </motion.div>
    ))}
  </div>
</div>

      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className='my-14'>
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Hajj Package Features</h2>
      
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

      <h1 className="my-4 font-bold text-xl sm:text-2xl font-serif"><i>Stay in Comfortable and Quality Hotels!</i></h1>
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
      
      <p className="text-lg text-center text-gray-700 max-w-2xl mb-12">
        Our hotels are selected to provide the highest level of comfort and convenience. Enjoy luxurious stays with modern amenities, exceptional service, and easy access to holy sites, ensuring a truly peaceful and hassle-free experience.
      </p>
      
      <h3 className="text-2xl font-semibold text-gray-900 text-center mb-6">We'd love to hear from you!</h3>
     
    </div>
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
          src="/image/ceo.jpeg"
          alt="Visa Applicant"
          className="w-[200px] h-[200px] rounded-full object-cover"
        />
      </motion.div>

      
      <div className="text-center">
        <p className="sm:text-2xl text-lg font-semibold font-serif">Mirza Shaharyaar Mughal</p>
        <p className="text-sm text-gray-500 mt-2">+92 300 9480157</p>
        <p className="text-sm text-gray-500">&#9993;  ubbrotherspk@gmail.com</p>
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
