'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const WhatAreWe = () => {
  return (
    <section className="bg-blue-50 py-16 px-6 md:px-20">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Left Side - Content */}
        <motion.div 
          className="w-full md:w-1/2 text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="sm:text-5xl text-xl font-bold text-blue-600">What Are We?</h2>
          <p className="mt-6 text-gray-700 text-lg leading-relaxed">
            We are dedicated to providing the best travel experiences with customized packages,
            exclusive destinations, and top-tier customer service. Explore the world with us!
          </p>
          <p className="mt-4 text-gray-700 text-lg leading-relaxed">
            Our team of experts carefully curates the best travel options, ensuring you get
            a seamless and stress-free journey. Whether you're looking for adventure, relaxation,
            or cultural exploration, we have something for everyone.
          </p>
          <p className="mt-4 text-gray-700 text-lg leading-relaxed">
            With partnerships worldwide, we bring you exclusive deals, top-rated hotels,
            and unforgettable experiences. Let us take care of everything while you enjoy
            your journey to the fullest.
          </p>
          
          <div className="mt-8 flex flex-col space-y-4 text-lg">
            <motion.div 
              className="bg-orange-500 text-white p-5 rounded-lg shadow-md"
              whileHover={{ scale: 1.05 }}
            >
              🌍 Destinations Worldwide - Over many exotic locations.
            </motion.div>
            <motion.div 
              className="bg-orange-500 text-white p-5 rounded-lg shadow-md"
              whileHover={{ scale: 1.05 }}
            >
              🏆 Top-Rated Packages - Verified by thousands of travelers.
            </motion.div>
            <motion.div 
              className="bg-orange-500 text-white p-5 rounded-lg shadow-md"
              whileHover={{ scale: 1.05 }}
            >
              ✈️ Custom Travel Plans - Tailor your trip your way.
            </motion.div>
            <motion.div 
              className="bg-orange-500 text-white p-5 rounded-lg shadow-md"
              whileHover={{ scale: 1.05 }}
            >
              🛎️ 24/7 Support - We're here for you anytime, anywhere.
            </motion.div>
          </div>
          
          <motion.a 
            href="/destinations" 
            className="inline-block mt-8 px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition"
            whileHover={{ scale: 1.1 }}
          >
            Explore Packages
          </motion.a>
        </motion.div>

        {/* Right Side - Image */}
        <motion.div 
          className="w-full md:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Image 
            src="/image/lux3.jpg" 
            alt="About Us" 
            width={600} 
            height={450} 
            className="rounded-2xl shadow-lg"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default WhatAreWe;
