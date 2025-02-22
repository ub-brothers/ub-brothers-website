"use client"
import Link from "next/link";
import { motion } from "framer-motion";
import { FaFacebook, FaInstagram } from "react-icons/fa";

export default function SocialBox() {
  return (
    <motion.div
      className="bg-blue-500 text-white p-6 rounded-2xl shadow-lg w-full max-w-sm mx-auto text-center transition-all duration-300 hover:shadow-2xl hover:scale-105"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-extrabold mb-4 font-serif">Our Social Media:</h2>
      <div className="flex justify-center gap-6">
        <Link href="https://www.instagram.com/ubbrotherstraveltours/" className="text-white text-3xl transition-all duration-300 hover:text-gray-300 hover:scale-110">
          <FaInstagram />
        </Link>
        <Link href="#" className="text-white text-3xl transition-all duration-300 hover:text-gray-300 hover:scale-110">
          <FaFacebook />
        </Link>
      </div>
    </motion.div>
  );
}
