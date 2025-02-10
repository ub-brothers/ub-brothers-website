"use client"
import { motion } from "framer-motion";
import { FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactInfo() {
  return (
    <div className="flex flex-col md:flex-row gap-6 p-6  min-h-screen items-center justify-center">
      {/* Phone & Contact Numbers */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        whileInView={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.05 }}
        className="bg-white shadow-lg rounded-2xl p-6 w-full md:w-1/2 text-center border-t-4 border-blue-500"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Numbers</h2>
        <p className="text-gray-600 text-lg flex items-center justify-center gap-2"><FaPhoneAlt /> +92 300 9480157</p>
        <p className="text-gray-600 text-lg flex items-center justify-center gap-2"><FaPhoneAlt /> +92 326 4214241</p>
      </motion.div>

      {/* Office Location */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        whileInView={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.05 }}
        className="bg-white shadow-lg rounded-2xl p-6 w-full md:w-1/2 text-center border-t-4 border-orange-500"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center justify-center gap-2"><FaMapMarkerAlt/>Office Location</h2>
        <p className="text-gray-600 text-lg ">7-Amin Arcade (Hotel Ambassador) Durand Road, Near Shimla Pahari, Lahore Pakistan.</p>
      </motion.div>
    </div>
  );
}
