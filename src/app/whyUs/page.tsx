"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const WhyUs = () => {
  return (
    <section className="bg-gray-100 py-16 px-6 md:px-12 my-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
        
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
          className="w-full md:w-1/2"
        >
          <Image
            src="/image/aero.jpg"
            alt="Why Us"
            width={500}
            height={400}
            className="rounded-2xl shadow-lg"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
          className="w-full md:w-1/2 text-center md:text-left"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Us?</h2>
          <p className="text-gray-600 mb-6">
            We offer the best travel experiences with personalized packages, exclusive deals, and 24/7 customer support.
          </p>
          <ul className="space-y-3">
            <motion.li
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              <CheckCircle className="text-green-500" size={24} />
              Expert Travel Guides
            </motion.li>
            <motion.li
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              <CheckCircle className="text-green-500" size={24} />
              Budget-Friendly Packages
            </motion.li>
            <motion.li
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              <CheckCircle className="text-green-500" size={24} />
              24/7 Customer Support
            </motion.li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyUs;
