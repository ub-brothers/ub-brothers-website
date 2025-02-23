"use client";
import { motion } from 'framer-motion'; 
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function BookForm() {
  const searchParams = useSearchParams();

  
  const countryName = searchParams.get("countryName") || "";
  const shortDescription = searchParams.get("shortDescription") || "";
  const prize = searchParams.get("prize") || "";


  const [userName, setUserName] = useState("");
  const [userNumber, setUserNumber] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userMessage, setUserMessage] = useState("");


  const handleSubmit = async (e:  React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const formData = {
      userName,
      userNumber,
      userEmail,
      userMessage,
      countryName,
      shortDescription,
      prize,
    };
  
    try {
      const res = await fetch("/api/iraqForm", {
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
  <img src="/image/iraq.webp" className="w-full h-full object-cover" alt="Travel Image" />
  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
    <h2 className="text-white text-2xl md:text-4xl font-bold text-center">
    Book your Ziyarat package today and embark on a trip filled with faith and serenity
    </h2>
  </div>
  </div>


    <div className="mt-8 p-6 bg-gray-100 rounded-lg shadow-lg w-[90%] sm:w-[50%] mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">Book Your Ziyarat</h2>
      <form  onSubmit={handleSubmit}>
        <label className="block mb-2 font-semibold text-gray-700">Full Name</label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          placeholder="Enter your name"
        />

        <label className="block mb-2 font-semibold text-gray-700">Phone Number</label>
        <input
          type="text"
          value={userNumber}
          onChange={(e) => setUserNumber(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          placeholder="Enter your number"
        />

        <label className="block mb-2 font-semibold text-gray-700">Email Address</label>
        <input
          type="email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          placeholder="Enter your email"
        />

        <label className="block mb-2 font-semibold text-gray-700">Ziyarat to</label>
        <input
          type="text"
          value={countryName}
          readOnly
          className="w-full p-2 mb-4  border rounded bg-gray-100"
        />

        <label className="block mb-2 font-semibold text-gray-700">Ziyarat Route</label>
        <input
          type="text"
          value={shortDescription}
          readOnly
          className="w-full p-2 mb-4 border rounded bg-gray-100"
        />

        <label className="block mb-2  font-semibold text-gray-700">Price</label>
        <input
          type="text"
          value={`${prize} PKR/-`}
          readOnly
          className="w-full p-2 mb-4 border rounded bg-gray-100"
        />

        <label className="block mb-2 font-semibold text-gray-700">Your Message</label>
        <textarea
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          placeholder="Enter your message (optional)"
          rows={3}
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-orange-500 hover:shadow-md"
        >
          Submit
        </button>
      </form>


    </div>
    <h1 className="text-center mx-2 font-semibold my-5"><i>Thank you for reaching out! We will get back to you as soon as possible.</i></h1>
    <div className="w-full p-8 mt-10 bg-gray-100">
      <h2 className="text-3xl font-semibold mb-4 text-center text-black"><u>You Can Directly Contact:</u></h2>

      
      <div className="text-center">
        <p className="sm:text-2xl text-lg font-semibold font-serif">Mirza Shaharyaar Mughal</p>
        <p className="text-lg text-gray-800 mt-2">+92 300 9480157</p>
        <p className="sm:text-2xl text-lg font-semibold font-serif mt-4">Mirza Ali</p>
        <p className="text-lg text-gray-800 mt-2">+92 326 4214241</p>
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

    </div>
  );
}
