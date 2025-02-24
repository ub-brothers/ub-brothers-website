"use client"
import Link from "next/link";
import { FaFacebook, FaInstagram, FaPhoneAlt,  FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div>
          <div className="flex items-center space-x-4">
            <motion.img
              src="/image/logo.jpeg"
              alt="Logo"
              className="w-16 h-16 mb-3 rounded-3xl"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            />
            <h1 className="font-serif text-2xl font-bold text-white">UB Brothers</h1>
          </div>
          <p className="text-sm text-gray-200 mt-2">
            Explore the world with us. We offer the best travel packages and experiences tailored just for you.
          </p>
          <div className="flex space-x-4 mt-4">
            <Link href="https://www.facebook.com/profile.php?id=61573095707819" className="text-white hover:text-orange-500 text-2xl">
              <FaFacebook />
            </Link>
            <Link
              href="https://www.instagram.com/ubbrotherstraveltours/"
              className="text-white hover:text-orange-500 text-2xl"
            >
              <FaInstagram />
            </Link>
          </div>
        </div>

       
        <div>
          <h3 className="text-xl font-semibold text-orange-500 mb-3">Contact Us</h3>
          <p className="text-sm text-gray-200 flex items-center">
            <FaPhoneAlt className="mr-2" /> +92 300 9480157
          </p>
          <p className="text-sm text-gray-200 flex items-center">
            <FaPhoneAlt className="mr-2" /> +92 326 421 4241
          </p>
          <h1 className="font-bold mt-2">Office locations:</h1>
          <p className="text-sm text-gray-200 flex items-center">
           7-Amin Arcade (Hotel Ambassador) Durand Road, Near Shimla Pahari, Lahore, Pakistan.
          </p>
          <p className="text-sm text-gray-200 my-1 flex items-center">
           H9W3+P5F, Tariq Shaheed Road, Bhagatpura, Lahore, Pakistan.
          </p>
          <p className="text-sm text-gray-200 flex items-center">
            <FaEnvelope className="mr-2" /> ubbrotherspk@gmail.com
          </p>
         
          
        
        </div>
      </div>

      
      <div className="border-t border-gray-400 text-center mt-6 pt-4 text-sm text-gray-200">
        © {new Date().getFullYear()} UB Brothers. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
