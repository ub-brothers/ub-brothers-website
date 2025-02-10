"use client";


import { useState } from "react";
import { motion } from "framer-motion";
import ContactInfo from "../contactDiv/page";
import PaymentDetails from "../payment/page";

const UmrahBookingForm = () => {
  const [visaStatus, setVisaStatus] = useState("yes");
  const [days, setDays] = useState<7 | 15 | 21 | 28>(7);
  const [makkahHotel, setMakkahHotel] = useState<keyof typeof makkahHotels | "">("");
  const [madinaHotel, setMadinaHotel] = useState<keyof typeof madinaHotels | "">("");
  const [category, setCategory] = useState<keyof typeof categories>("sharing");
  const [totalCost, setTotalCost] = useState(0);
 

  const makkahHotels = { "Dayar Matar": 200, "Land Premium/ Dewania": 300, "Johra/ Dairy": 400, "Lolo Eman": 400, "Saif Al Majad": 400, "Nada Al Majad/ Mathar Al Jawad": 400, "Diyafat Al Rahman": 400, "Kiswa Tower": 400 };
  const madinaHotels = { "Rehab Ul Madien": 250, "Minar Al Madina": 350, "Dar Al Taiba old Dar Akbar": 450, "Diamond Rose/ Shaza Munawara": 400, "Ansar Plus": 400, "Zahrat Al Munawarah": 400, "Arjawan Madina/ Karam Golden": 400, "Deewan Al Madina": 400 };
  const categories = { sharing: 100, penta: 100, quad: 150, triple: 200, doubled: 300 };
  const daysCost = { 7: 500, 15: 900, 21: 1300, 28: 1700 };

  const calculateCost = () => {
    const makkahHotelCost = makkahHotel ? makkahHotels[makkahHotel] : 0;
    const madinaHotelCost = madinaHotel ? madinaHotels[madinaHotel] : 0;
    const cost = daysCost[days] + (categories[category] || 0) + makkahHotelCost + madinaHotelCost;
    setTotalCost(cost);
  };

  return (
    <div>
       <div className="relative w-full mb-6 h-[380px]">
  <img src="/image/umrah2.jpg" className="w-full h-full object-cover" alt="Travel Image" />
  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
    <h2 className="text-white text-2xl md:text-4xl font-bold text-center">
    Book now and take the first step towards a spiritual journey that will change your life forever!
    </h2>
  </div>
  </div>
    <motion.div className="max-w-lg mx-auto p-8 mb-26 bg-white shadow-xl rounded-2xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

      <h2 className="text-2xl font-bold mb-6 text-center">Umrah Package</h2>
      <div className="">
        <label className="font-semibold">Full Name</label>
        <input placeholder="Full Name" className="w-full p-3  mb-5 border rounded-md" />
        
        <label className="font-semibold mt-4">Select Days</label>
        <select onChange={(e) => setDays(Number(e.target.value) as 7 | 15 | 21 | 28)} className="w-full p-3 mb-5 border rounded-md">
          {[7, 15, 21, 28].map((day) => (
            <option key={day} value={day}>{`${day} Days`}</option>
          ))}
        </select>
        
        <label className="font-semibold mt-4">Makkah Hotel</label>
        <select onChange={(e) => setMakkahHotel(e.target.value as keyof typeof makkahHotels)} className="w-full p-3  mb-5 border rounded-md">
          <option value="">Select a hotel</option>
          {Object.keys(makkahHotels).map((hotel) => (
            <option key={hotel} value={hotel}>{hotel} - ${makkahHotels[hotel as keyof typeof makkahHotels]}</option>
          ))}
        </select>
        
        <label className="font-semibold">Madina Hotel</label>
        <select onChange={(e) => setMadinaHotel(e.target.value as keyof typeof madinaHotels)} className="w-full p-3  mb-5 border rounded-md">
          <option value="">Select a hotel</option>
          {Object.keys(madinaHotels).map((hotel) => (
            <option key={hotel} value={hotel}>{hotel} - ${madinaHotels[hotel as keyof typeof madinaHotels]}</option>
          ))}
        </select>
        
        <label className="font-semibold">Room Category</label>
        <select onChange={(e) => setCategory(e.target.value as keyof typeof categories)} className="w-full p-3  mb-5 border rounded-md">
          {Object.keys(categories).map((cat) => (
            <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
          ))}
        </select>
        
        <label className="font-semibold">Do you have a visa?</label>
        <select onChange={(e) => setVisaStatus(e.target.value)} className="w-full p-3  mb-5 border rounded-md">
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        
        {visaStatus === "no" && (
          <div className=" bg-gray-100 p-4 rounded-md">
            <h3 className="font-bold">Fill out the form and apply for Visa!</h3>
            <label className="font-semibold">Your Name</label>
            <input placeholder="Your Name" className="w-full p-3  mb-5 border rounded-md" />
            <label className="font-semibold">Your Number</label>
            <input placeholder="Your Number" type="tel" className="w-full p-3  mb-5 border rounded-md" />
            <label className="font-semibold">Personal Photo (White BG)</label>
            <input type="file" accept="image/*" className="w-full p-3 border mb-5 rounded-md" />
            <label className="font-semibold">Passport Scan Copy</label>
            <input type="file" accept="image/*" className="w-full p-3 mb-5 border rounded-md" />
            <label className="font-semibold">Nationality</label>
            <input placeholder="Nationality" className="w-full p-3 mb-5 border rounded-md" />
          </div>
        )}
        
        <button onClick={calculateCost} className="w-full bg-blue-500 hover:bg-orange-500 text-white p-3 rounded-md font-semibold">Calculate Cost</button>
        
        {totalCost > 0 && (
          <motion.div className="mt-4 p-4 text-center bg-gray-200 rounded-md" initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
            <p className="font-bold text-lg">Total Cost: ${totalCost}</p>
          </motion.div>
        )}
      </div>
      <button className="w-full bg-blue-500 hover:bg-orange-500 text-white mt-4 p-3 rounded-md font-semibold">Submit</button>
    </motion.div>
    <ContactInfo/>
    <PaymentDetails/>
    </div>
  );
};

export default UmrahBookingForm;


