"use client"
import React from "react";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";


const reviews = [
  {
    id: 1,
    name: "Ahmed Jamal",
  
    message:
      "Amazing service! I loved the support and attention to detail.",
    rating: 5,
  },
  {
    id: 2,
    name: "Zain Siddiqui",
    
    message: "اعلیٰ معیار اور بروقت سپورٹ کی وجہ سے میں بہت مطمئن ہوں۔",
    rating: 4,
  },
  {
    id: 3,
    name: "Hashim Khan",
   
    message:
      "مجھے ویزا کے لیے بہترین سروس ملی۔ ہر سوال کا فوری اور درست جواب ملا، جس سے میرا اعتماد بڑھا۔",
    rating: 3,
  },
  {
    id: 4,
    name: "Usman Saeed",
    
    message:
      "پروفیشنل ٹیم، ویزا کے لیے درخواست کا عمل بہت آسان اور شفاف تھا۔ ٹیم نے ہر قدم پر مکمل رہنمائی فراہم کی، جس سے مجھے کوئی پریشانی پیش نہیں آئی۔",
    rating: 5,
  },
  {
    id: 5,
    name: "Muhammad Tariq Hussain",
   
    message: "Outstanding service! They went above and beyond my expectations.",
    rating: 4,
  },
  {
    id: 6,
    name: "Abdullah Sheikh",
   
    message: "Excellent service, professional, efficient, and highly recommended!",
    rating: 5,
  },
];


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ClientReviews = () => {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 font-serif text-blue-800">
          What Our Clients Say
        </h2>
       
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-blue-500 rounded-lg shadow-md p-6 flex flex-col items-center  hover:shadow-xl transition duration-300"
            >
             <h1 className="font-bold text-white text-xl my-4">{review.name}</h1>
              <p className="text-white text-center italic mb-4">
                {review.message}
              </p>
              <div className="flex">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <FaStar key={i} className="text-orange-500 mr-1" />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ClientReviews;
