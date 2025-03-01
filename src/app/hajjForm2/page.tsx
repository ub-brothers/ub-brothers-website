"use client"

import { useState, useEffect } from 'react';
import {client} from "@/sanity/lib/client"
import PaymentDetails from '../payment/page';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt } from "react-icons/fa";


interface RoomCategory {
  category: string;
  price: number;
}

interface HajjDay {
  days: string;
  makkahHotel: string[];
  madinaHotel: string[];
  roomCategories: RoomCategory[];
}

export default function HajjForm() {
  const [availableDays, setAvailableDays] = useState<HajjDay[]>([]);
  const [selectedDay, setSelectedDay] = useState<HajjDay | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<RoomCategory | null>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");


  useEffect(() => {
    client.fetch("*[_type == 'hajjDays']").then((data: HajjDay[]) => {
      setAvailableDays(data);
      if (data.length > 0) {
        setSelectedDay(data[0]); 
      }
    });
  }, []);


  const handleSubmit = async () => {
    if (!name || !phone || !email || !selectedDay || !selectedRoom) {
      alert("Please fill in all required fields.");
      return;
    }

    const response = await fetch("/api/hajjForm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        phone,
        email,
        days: selectedDay.days,
        makkahHotel: selectedDay.makkahHotel,
        madinaHotel: selectedDay.madinaHotel,
        roomCategory: selectedRoom.category,
        totalCost: selectedRoom.price,
        message,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Submitted successfully!");
    } else {
      alert(`Error: ${data.error}`);
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
    <div className=" mx-4 p-6 bg-gray-100 shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-center font-serif">Hajj Booking Form</h1>
      <h1 className="block mb-2 font-semibold">Full Name:</h1>
      <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)}  className="w-full p-2 border rounded mb-4" required></input>
      <h1 className="block mb-2 font-semibold">Phone Number:</h1>
      <input type="number" placeholder="Your Phone Number"  value={phone} onChange={(e) => setPhone(e.target.value)}  className="w-full p-2 border rounded mb-4" required></input>
      <h1 className="block mb-2 font-semibold">Email Address:</h1>
      <input type="text" placeholder="Email Address"  value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded mb-4" required></input>

      <label className="block mb-2 font-semibold">Select Days:</label>
      <select
        className="w-full p-2 border rounded mb-4"
        onChange={(e) => {
          const selectedValue = String(e.target.value);
          const day = availableDays.find((d) => d.days === selectedValue) || null;
          setSelectedDay(day);
        }}
      >
        {availableDays.map((day) => (
          <option key={day.days} value={day.days}>{day.days} Days</option>
        ))}   
      </select>

      
      <label className="block mb-2 font-semibold">Makkah Hotel:</label>
<select className="w-full p-2 border rounded mb-4">
  <option value="">Select Hotel</option>
  {selectedDay?.makkahHotel?.map((hotel, index) => (
    <option key={index} value={hotel}>
      {hotel}
    </option>
  ))}
</select>
  
<label className="block mb-2 font-semibold">Madina Hotel:</label>
<select className="w-full p-2 border rounded mb-4">
  <option value="">Select Hotel</option>
  {selectedDay?.madinaHotel?.map((hotel, index) => (
    <option key={index} value={hotel}>
      {hotel}
    </option>
  ))}
</select>


      <label className="block mb-2 font-semibold">Select Room Category:</label>
      <select
        className="w-full p-2 border rounded mb-4"
        onChange={(e) => {
          const selectedCategory = selectedDay?.roomCategories.find((room) => room.category === e.target.value) || null;
          setSelectedRoom(selectedCategory);
        }}
      >
        {selectedDay?.roomCategories.map((room, idx) => (
          <option key={idx} value={room.category}>{room.category}</option>
        ))}
      </select>

      {selectedRoom && (
        <div className="my-4 p-3 bg-gray-100 rounded ">
          <label className="block font-semibold">Total Cost:</label>
          <p className="text-lg font-bold">${selectedRoom.price}</p>
        </div>
      )}
     
      <h1 className="block mb-2 font-semibold">Message:</h1>
      <input type="text" placeholder="Your Message" value={message} onChange={(e) => setMessage(e.target.value)}  className="w-full p-2 border h-14 rounded mb-4" required></input>

      <button onClick={handleSubmit} className="w-full mt-2 bg-blue-500 hover:bg-orange-500 text-white p-3 rounded-md font-semibold">Submit</button>
    </div>


    
    <h1 className="text-center mx-2 font-semibold my-5"><i>Thank you for reaching out! We will get back to you as soon as possible.</i></h1>
    <div className="w-full p-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-900">You Can Directly Contact:</h2>
      
     
      <motion.div 
        className="flex justify-center mb-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        whileHover={{ scale: 1.05 }}
        viewport={{ once: false }} 
      >
        <img
          src="/image/ceo.jpeg"
          alt="Visa Applicant"
          className="w-[200px] h-[200px] rounded-full object-cover"
        />
      </motion.div>

   
      <div className="text-center">
        <p className="sm:text-2xl text-lg font-semibold font-serif">Mirza Shaharyaar Mughal</p>
        <p className="text-sm text-gray-500 mt-2">03414311000</p>
        <p className="text-sm text-gray-500">&#9993;  ubbrotherspk@gmail.com</p>
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
