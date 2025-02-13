'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Hotels from '../hotelUi/page';
// import airplane from '@/public/airplane.png'; // Add your airplane PNG in public folder
// import image1 from '@/public/image1.jpg'; // Replace with your actual image
// import image2 from '@/public/image2.jpg'; // Replace with your actual image

export default function UmrahPackage() {
  return (
  <div>
    <div className="flex flex-col items-center text-center px-4 py-12 space-y-6 max-w-3xl mx-auto">
      {/* Main Heading with Animated Airplane */}
      <div className="relative">
        <motion.h1 
          className="text-3xl sm:text-5xl font-serif mt-4 text-blue-800 font-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
         Exclusive Umrah Package
        </motion.h1>
        <motion.div 
          className="absolute -top-10 left-1/2 -translate-x-1/2 w-12 mb-4 h-12"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <Image src="/image/aerop.png" alt="Airplane" width={200} height={200} />
        </motion.div>
      </div>

      {/* Description */}
      <p className="text-lg text-gray-600">
        Experience a hassle-free and spiritually fulfilling Umrah journey with our exclusive packages, 
        tailored to provide comfort and convenience at every step.
      </p>

      {/* Animated Images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <motion.div 
          className="rounded-lg overflow-hidden shadow-lg"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
        >
          <Image src="/image/umrah2.jpg" alt="Umrah Image 1" width={500} height={300} className="w-full " />
        </motion.div>
        <motion.div 
          className="rounded-lg overflow-hidden shadow-lg"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
        >
          <Image src="/image/makkah.jpg" alt="Umrah Image 2" width={500} height={300} className="w-full h-auto" />
        </motion.div>
      </div>

      {/* Additional Info */}
      <div className="text-gray-700 text-lg space-y-2">
   <h1>Experience a comfortable Umrah journey with our premium package! You can visit holy sites with guided Ziyarat services, ensuring a spiritually enriching experience. We offer complete flexibility—you can select the number of days and hotels based on your preference, and we will arrange everything accordingly. Whether you prefer a budget-friendly stay or a luxury experience, we customize the package to fit your needs. Let us take care of all the details while you have a peaceful and memorable Umrah. Book your personalized package today and embark on a stress-free spiritual journey! </h1>
      </div>

      {/* Book Now Button */}
      <div>
      <h3 className="text-xl font-semibold">Book Your Stay Now!</h3>
      <p className="text-gray-600 mt-2">Contact us to customize your package as per your needs.</p></div>
      <Link href="/umrahForm2">
      <motion.button 
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-300 hover:bg-orange-500"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Book Now
      </motion.button></Link>

     
    </div>
     <Hotels/>
    </div>
  );
}
