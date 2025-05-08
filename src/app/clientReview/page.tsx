"use client";
import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { client } from "@/sanity/lib/client";

interface Review {
  _id: string;
  name: string;
  message: string;
  rating: number;
  language?: string;
}

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
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const query = `*[_type == "review"] | order(_createdAt desc) {
          _id,
          name,
          message,
          rating,
          language
        }`;
        
        const result = await client.fetch<Review[]>(query);
        setReviews(result);
      } catch (err) {
        setError("Failed to load reviews. Please try again later.");
        console.error("Error fetching reviews:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return (
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10 font-serif text-blue-800">
            What Our Clients Say
          </h2>
          <div className="flex justify-center">
            <div className="animate-pulse text-lg">Loading reviews...</div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10 font-serif text-blue-800">
            What Our Clients Say
          </h2>
          <div className="text-center text-red-500">{error}</div>
        </div>
      </section>
    );
  }

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
              key={review._id}
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-blue-500 rounded-lg shadow-md p-6 flex flex-col items-center hover:shadow-xl transition duration-300"
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