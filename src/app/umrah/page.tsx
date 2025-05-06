'use client';
import Hotels from '../hotelUi/page';
import UmrahPage from '../umrahPage/page';
import { createClient } from 'next-sanity';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BsClockHistory } from "react-icons/bs";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // Replace with your actual Project ID
  dataset: "production",
  useCdn: false,
  apiVersion: "2025-01-30",
});

export default function UmrahPackage() {
  const [comingSoon, setComingSoon] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchFlag = async () => {
      const result = await client.fetch(`*[_type == "umrahAvailability"][0]{showComingSoonMessage}`);
      setComingSoon(result?.showComingSoonMessage ?? false);
    };
    fetchFlag();
  }, []);

  if (comingSoon === null) return <p className='text-center text-xl h-screen'>Loading...</p>;


  return (
    <div>
    {comingSoon ? (
         <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-400 to-blue-200">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="bg-white/20 backdrop-blur-xl p-10 rounded-2xl shadow-2xl border border-white/30"
          >
            <h1 className="text-white text-5xl flex gap-2 font-extrabold text-center drop-shadow-lg">
            <BsClockHistory/> Coming Soon!
            </h1>
           
          </motion.div>
        </div>
    ) : (
      <>
        <UmrahPage />
        <Hotels />
      </>
    )}
  </div>
  );
}
