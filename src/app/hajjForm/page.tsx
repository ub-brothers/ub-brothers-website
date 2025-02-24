"use client";

import { motion } from 'framer-motion'; 
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import PaymentDetails from '../payment/page';

function BookFormContent() {
  const searchParams = useSearchParams();
  const countryName = searchParams.get("countryName") || "";
  const shortDescription = searchParams.get("shortDescription") || "";
  const prize1 = searchParams.get("prize1") || "";
  const prize2 = searchParams.get("prize2") || "";
  const prize3 = searchParams.get("prize3") || "";

  const [userName, setUserName] = useState("");
  const [userNumber, setUserNumber] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("sharing");
  const [userMessage, setUserMessage] = useState("");

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const selectedPrize = selectedCategory === "sharing" ? prize1 : selectedCategory === "triple" ? prize2 : prize3;
    const formData = { userName, userNumber, userEmail, shortDescription, selectedCategory, selectedPrize, userMessage };
    
    try {
      const res = await fetch("/api/hajjForm2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      if (data.success) {
        alert("Booking Submitted successfully!");
        setUserName("");
        setUserNumber("");
        setUserEmail("");
        setUserMessage("");
      } else {
        alert("Error sending booking request.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
    <div className="relative w-full mb-6 h-[380px]">
  <img src="/image/umrah.jpg" className="w-full h-full object-cover" alt="Travel Image" />
  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
    <h2 className="text-white text-2xl md:text-4xl font-bold text-center">
    Embark on your sacred Hajj journey with the best accommodation and comfort tailored to your needs.
    </h2>
  </div>
  </div>
      <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg shadow-lg w-[90%] sm:w-[50%] mx-2 sm:mx-auto">


           <h2 className="text-xl font-bold text-center mb-4">Book Your Hajj Package</h2>
        <label className="block font-semibold">Full Name</label>
        <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} className="w-full p-2 mb-4 border rounded" placeholder="Enter your name" required />
        
        <label className="block font-semibold">Phone Number</label>
        <input type="text" value={userNumber} onChange={(e) => setUserNumber(e.target.value)} className="w-full p-2 mb-4 border rounded" placeholder="Enter your number" required />
        
        <label className="block font-semibold">Email Address</label>
        <input type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} className="w-full p-2 mb-4 border rounded" placeholder="Enter your email" required />
        
        <label className="block font-semibold">Day Duration</label>
        <input type="text" value={shortDescription} readOnly className="w-full p-2 mb-4 border rounded bg-gray-100" />
        
        <label className="block font-semibold">Select Category</label>
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full p-2 mb-4 border rounded">
          <option value="sharing">Sharing - {prize1} PKR/-</option>
          <option value="triple">Triple - {prize2} PKR/-</option>
          <option value="double">Double - {prize3} PKR/-</option>
        </select>
        
        <label className="block font-semibold">Your Message</label>
        <textarea value={userMessage} onChange={(e) => setUserMessage(e.target.value)} className="w-full p-2 mb-4 border rounded" placeholder="Enter your message (optional)" rows={3} />
        
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-orange-500 hover:shadow-md">Submit</button>
      </form>

      <h1 className="text-center mx-2 font-semibold my-5"><i>Thank you for reaching out! We will get back to you as soon as possible.</i></h1>
      
    </div>
  );
}

export default function BookForm() {
  return (
    <div>
      <Suspense fallback={<p className="text-center text-gray-600">Loading...</p>}>
        <BookFormContent />
      </Suspense>

      <div className="w-full p-8 bg-gray-100">
      <h2 className="text-3xl font-bold font-sans  mb-8 text-center text-blue-900">You Can Directly Contact:</h2>
      
  

      
      <div className="text-center">
        <p className="sm:text-2xl text-lg font-semibold font-serif">Mirza Shaharyaar Mughal</p>
        <p className="text-sm text-gray-500 mt-2">+92 300 9480157</p>
        <p className="text-sm text-gray-500">&#9993;  ubbrotherspk@gmail.com</p>
      </div>
      <div className="text-center mt-4">
        <p className="sm:text-2xl text-lg font-semibold font-serif">Mirza Ali</p>
        <p className="text-sm text-gray-500 mt-2">+92 326 4214241</p>
        <p className="text-sm text-gray-500">&#9993;  ubbrothersconsultant@gmail.com</p>
      </div>
    </div>

      <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white shadow-lg my-6 rounded-2xl mx-auto p-6 w-full md:w-1/3 text-center border-t-4 border-orange-500"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center justify-center gap-2">
              <FaMapMarkerAlt /> Office Locations
            </h2>
            <p className="text-gray-600 text-lg flex items-center justify-center mb-2">
          7-Amin Arcade (Hotel Ambassador) Durand Road, Near Shimla Pahari, Lahore Pakistan.
            </p>
            <hr/>
            <p className="text-gray-600 text-lg flex items-center justify-center mt-2">
           H9W3+P5F, Tariq Shaheed Road, Bhagatpura, Lahore Pakistan.
            </p>
          </motion.div> 
          <PaymentDetails/>
    </div>
  );
}
