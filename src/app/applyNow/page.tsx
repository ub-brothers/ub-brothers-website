"use client"
import { motion } from "framer-motion";
import ContactForm from "../contactForm/page";

export default function ApplyNow() {
  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-r from-blue-200 to-orange-200 flex justify-center items-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div 
        className="w-full max-w-4xl bg-gray-200 shadow-lg rounded-2xl p-8 space-y-6"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <h1 className="text-3xl font-bold text-center text-blue-700">Apply Here!</h1>
        <p className="text-center text-gray-600">Fill out the form below to apply for your visa.</p>

        {/* Form will be called here */}
        <div id="application-form" className="w-full">
            <ContactForm/>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            className="flex flex-col items-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <img src="/image/visa3.jpg" alt="Visa Application" className="w-full h-40 object-cover rounded-xl shadow-md" />
            <p className="text-gray-700 mt-2 text-center">Start your visa process today.</p>
          </motion.div>
          <motion.div 
            className="flex flex-col items-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <img src="/image/visa.jpg" alt="Visa Approval" className="w-full h-40 object-cover rounded-xl shadow-md" />
            <p className="text-gray-700 mt-2 text-center">Fast and easy visa approval process.</p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
