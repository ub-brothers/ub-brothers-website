"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';

const ServicesSection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-500 via-orange-400 to-blue-500">
      <div className="container mx-auto text-center">
        <motion.h2
          className="text-4xl font-bold text-white mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          
        >
          Our Services
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div
            className="service-card bg-white rounded-lg shadow-lg p-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
       
          >
            <h3 className="text-xl font-semibold text-blue-500 mb-4">Visa Processing</h3>
            <p className="text-gray-700 mb-4">
              We handle the entire visa process professionally for all destinations. Trust our experienced team to process your visa applications efficiently and accurately.
            </p>
            <Link href="/destinations">
            <button className="bg-orange-400 text-white py-2 px-6 rounded-full hover:bg-orange-500 transition duration-300">
              Explore
            </button></Link>
          </motion.div>

          <motion.div
            className="service-card bg-white rounded-lg shadow-lg p-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
           
          >
            <h3 className="text-xl font-semibold text-blue-500 mb-4">Tour Packages</h3>
            <p className="text-gray-700 mb-4">
              Explore the world with our exciting tour packages. From exotic destinations to local gems, we provide customized tours for every traveler.
            </p>
            <Link href="/tour">
            <button className="bg-orange-400 text-white py-2 px-6 rounded-full hover:bg-orange-500 transition duration-300">
              View Packages
            </button></Link>
          </motion.div>

          <motion.div
            className="service-card bg-white rounded-lg shadow-lg p-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
           
          >
            <h3 className="text-xl font-semibold text-blue-500 mb-4">Consultation Services</h3>
            <p className="text-gray-700 mb-4">
              Our expert consultants are available to guide you through the process of selecting the best travel and visa options for your needs.
            </p>
            <Link href="/contact">
            <button className="bg-orange-400 text-white py-2 px-6 rounded-full hover:bg-orange-500 transition duration-300">
              Contact
            </button></Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
