"use client"
import { motion } from "framer-motion";
import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";

export default function ContactInfo() {
  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 items-center justify-center flex-wrap">
    <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        className="bg-white shadow-lg rounded-2xl p-6 w-full md:w-1/3 text-center border-t-4 border-blue-500"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center justify-center gap-2">
          <FaPhoneAlt /> Contact Numbers
        </h2>
        <p className="text-gray-600 text-lg flex items-center justify-center gap-2">
          <FaPhoneAlt /> 03414311000
        </p>
        <p className="text-gray-600 text-lg flex items-center justify-center gap-2">
          <FaPhoneAlt /> 03414314000
        </p>
        <p className="text-gray-600 text-lg flex items-center justify-center gap-2">
          <FaPhoneAlt /> 03414322000
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        className="bg-white shadow-lg rounded-2xl p-6 w-full md:w-1/3 text-center border-t-4 border-green-500"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center justify-center gap-2">
          <FaEnvelope /> Email Us
        </h2>
        <p className="text-gray-600 text-lg flex items-center justify-center gap-2">
          <FaEnvelope /> ubbrotherspk@gmail.com
        </p>
        <p className="text-gray-600 text-lg flex items-center justify-center gap-2">
          <FaEnvelope /> ubbrothersticketing@gmail.com
        </p>
        <p className="text-gray-600 text-lg flex items-center justify-center gap-2">
          <FaEnvelope /> ubbrothersconsultant@gmail.com
        </p>
      </motion.div>


    <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        className="bg-white shadow-lg rounded-2xl p-6 w-full md:w-1/3 text-center border-t-4 border-orange-500"
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
  );
}
