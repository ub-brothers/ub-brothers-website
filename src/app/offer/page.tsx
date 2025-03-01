"use client"


import { motion } from "framer-motion";
import Link from "next/link";

export default function FloatingOffer() {
  return (
<div>
  <Link href="/visaOffers">
    <div className="fixed top-20 ml- left-10 mt-4 flex flex-col items-center z-50">
      
      
      <motion.img 
        src="/image/offers.png" 
        alt="Offer Icon" 
        className="w-16 h-16 rounded-xl"
        animate={{ y: [0, -5, 0] }} 
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      />
    </div>
    </Link>
    </div>
  );
}