"use client"


import { motion } from "framer-motion";
import Link from "next/link";

export default function IranFloatingOffer() {
  return (
<div>
  <Link href="/iranOffers">
    <div className="fixed bottom-4 right-4 sm:top-20 sm:left-10 sm:bottom-auto sm:right-auto flex flex-col items-center z-50">
      
      
      <motion.img 
        src="/image/offer4.png" 
        alt="Offer Icon" 
        className="sm:w-24 sm:h-24 h-16 w-16 mt-4 hover:shadow-xl"
        animate={{ y: [0, -5, 0] }} 
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      />
    </div>
    </Link>
    </div>
  );
}