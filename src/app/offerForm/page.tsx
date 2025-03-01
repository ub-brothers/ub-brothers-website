"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { motion } from 'framer-motion';
import { FaMapMarkerAlt } from "react-icons/fa";
import PaymentDetails from '../payment/page';


function FormContent(){
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    nationality: "",
    message: "",
  });

  const countries = searchParams.get("countries")?.split(",") || [];
  const discountedPrice = searchParams.get("discountedPrice") || "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const response = await fetch("/api/offerForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          countries: countries.join(", "),
          discountedPrice,
        }),
      });
  
      const data = await response.json();
      alert(data.message); // Show success message
  
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form. Please try again.");
    }
  };
  
  return (


    <div className=" bg-white rounded-lg">
     <div className="relative w-full mb-6 h-[380px]">
  <img src="/image/nature.jpg"  className="w-full h-full object-cover" alt="Travel Image" />
  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
    <h2 className="text-white text-2xl md:text-4xl font-bold text-center">
    Apply now for this exclusive visa offer and explore the world at unbeatable prices!
    </h2>
  </div>
  </div>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white p-6 shadow-lg rounded-lg border border-gray-300 mt-10"> 
        <h1 className="sm:text-3xl text-2xl font-bold text-center mb-6 font-sans">Fill the form below!</h1>
        <label className="block text-lg font-semibold mb-2">Full Name</label>
        <input type="text" placeholder="Your Name" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full p-3 border bg-gray-100 rounded-lg mb-4" required />

        <label className="block text-lg font-semibold mb-2">Phone Number</label>
        <input type="tel" name="phoneNumber" placeholder="Your Number" value={formData.phoneNumber} onChange={handleChange} className="w-full p-3 border bg-gray-100 rounded-lg mb-4" required />

        <label className="block text-lg font-semibold mb-2">Email Address</label>
        <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} className="w-full p-3 border bg-gray-100 rounded-lg mb-4" required />

        <label className="block text-lg font-semibold mb-2">Included Countries</label>
        <input type="text" value={countries.join(", ")} readOnly className="w-full p-3 border bg-gray-200 rounded-lg mb-4" />

        <label className="block text-lg font-semibold mb-2">Discounted Price</label>
        <input type="text" value={`PKR ${discountedPrice}`} readOnly className="w-full p-3 border bg-gray-200 rounded-lg mb-4" />

        <label className="block text-lg font-semibold mb-2">Nationality</label>
        <input type="text" name="nationality" placeholder="Your Nationality" value={formData.nationality} onChange={handleChange} className="w-full p-3 border bg-gray-100 rounded-lg mb-4" required />

        <label className="block text-lg font-semibold mb-2">Message</label>
        <textarea name="message" placeholder="Any Message" value={formData.message} onChange={handleChange} className="w-full p-3 border bg-gray-100 rounded-lg mb-4" rows={4} required></textarea>

        <button type="submit" className="w-full bg-blue-500 hover:bg-orange-500 text-white font-bold rounded-lg p-3">Submit</button>
      </form>

      <h1 className="text-center mx-2 font-semibold my-5"><i>Thank you for reaching out! We will get back to you as soon as possible.</i></h1>
    <div className="w-full p-8">
      <h2 className="text-3xl font-bold font-sans mb-8 text-center text-blue-900">You Can Directly Contact:</h2>
      
      <motion.div 
        className="flex justify-center mb-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        whileHover={{ scale: 1.05 }}
        viewport={{ once: false }} 
      >
        <img
          src="/image/ali.jpeg"
          alt="Visa Applicant"
          className="w-[200px] h-[200px] rounded-full object-cover"
        />
      </motion.div>

      
      <div className="text-center">
        <p className="sm:text-2xl text-lg font-semibold font-serif">Mirza Ali</p>
        <p className="text-sm text-gray-500 mt-2">03414314000</p>
       
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

export default function ApplyForm() {
  return(
    <div>
        <Suspense fallback={<p className="text-center text-gray-600">Loading...</p>}>
           <FormContent/>
          </Suspense>
    </div>
  )

}
