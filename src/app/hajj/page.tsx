'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaPlane, FaHotel, FaUtensils, FaBus, FaMosque } from 'react-icons/fa';
import Link from 'next/link';
import PaymentDetails from '../payment/page';
import ContactInfo from '../contactDiv/page';


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
        className="text-4xl font-bold text-center font-serif text-blue-800 mb-4"
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
        <Image src="/image/mk.jpg" alt="Makkah" width={400} height={300} className="rounded-lg shadow-lg" />
        <Image src="/image/madina.jpg" alt="Madina" width={400} height={300} className="rounded-lg shadow-lg" />
      </motion.div>

      <motion.p 
        className="text-lg text-center text-gray-700 max-w-2xl mb-4"
        initial={{ opacity: 0, y: 10 }}
       
        transition={{ delay: 0.6, duration: 0.6 }}
        whileInView={{ opacity: 1 }}
      >
       Experience the spiritual journey of a lifetime with our Exclusive Hajj Package.
Enjoy a seamless and well-organized pilgrimage with top-tier services and accommodations.
Customize your travel duration according to your convenience and spiritual needs.
Our package offers premium hotels, delicious meals, and comfortable transportation.
All this comes at reasonable prices, ensuring an affordable yet luxurious experience.
Join us for a Hajj journey with unparalleled comfort and peace of mind.
      </motion.p>
      <Link href="/hajjForm">
      <motion.button 
        className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        whileInView={{ opacity: 1 }}
      >
        Book Now
      </motion.button></Link>

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
      <p className="text-lg text-center text-gray-700 max-w-2xl mb-12">
        Experience an unforgettable and comfortable journey with our premium Hajj package. Our dedicated team is here to assist you at every step, ensuring a seamless and spiritually fulfilling experience.
      </p>
    
    </div>
    <ContactInfo/>
    <PaymentDetails/>
    </div>
  );
}
