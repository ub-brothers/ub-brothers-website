"use client"

import ContactForm from "../contactForm/page";
import ServicesSection from "../ourService/page";
import { motion } from "framer-motion";
import PaymentDetails from "../payment/page";
import ContactInfo from "../contactDiv/page";


export default function ContactUs() {
    return (
      <div className="sm:my-10 my-6 sm:mx-auto relative">
        <motion.h1
          className="sm:text-4xl text-2xl font-serif text-blue-800 font-bold text-center mb-1 sm:mb-4"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Contact Us
        </motion.h1>
  
        <h1 className="text-center my-2 mx-6">
          We'd love to hear from you, and respond as soon as possible!
        </h1>
  
        {/* Background Image Wrapper */}
        <div
          className="relative bg-cover bg-center bg-no-repeat flex items-center justify-center py-20"
          style={{ backgroundImage: "url('/image/luxx.jpg')" }}
        >
          {/* Form */}
          <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg max-w-lg w-full sm:mx-auto mx-4 relative z-10">
            <ContactForm />
          </div>
        </div>

        <ContactInfo/>
  
  
        <div className="my-4">
          <ServicesSection />
        </div>
        <div className="mb-4">
          <PaymentDetails />
        </div>
      </div>
    );
  }
  