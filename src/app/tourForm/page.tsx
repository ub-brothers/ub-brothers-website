'use client';

import { useState } from 'react';

import { FaMapMarkerAlt } from "react-icons/fa";
import PaymentDetails from '../payment/page';
import { motion } from 'framer-motion';
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import jsPDF from 'jspdf';


function TourContent(){

  const searchParams = useSearchParams();
  const prize = searchParams.get("prize") || "";
  const countryName = searchParams.get("countryName");


  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    country: '',
    price: '',
    message: '',
  });

  const handleChange = (e:any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleSubmit = async (e:any) => {
    setIsConfirmed(true);
    e.preventDefault();

    const updatedFormData = {
      ...formData,
      country: countryName || "", 
      price: prize || "", 
    };
  
    try {
      const response = await fetch('/api/tourForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFormData),
      });
  
      const result = await response.json();
      
      if (result.success) {
        alert('Submitted successfully!');
        setFormData({ fullName: '', phone: '', email: '', country: '',price:'', message: '' }); // Clear form
      } else {
        alert('Failed to submit. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again later.');
    }
  };


  const generatePDF = () => {
    const doc = new jsPDF();

   
    const companyLogo = "/image/logo.png"; 
    doc.addImage(companyLogo, "PNG", 10, 10, 30, 30); 

    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 128); 
    doc.text("UB Brothers", 45, 20); 

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); 
    doc.text("Tour Package Booking Details", 45, 30);

   
    doc.setFontSize(14);
    let y = 50; 

    
    const addField = (label:any, value:any) => {
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0, 0, 128);
      doc.text(`${label}:`, 10, y); 

      
      const labelWidth = doc.getTextWidth(`${label}:`); 
      const valueX = 15 + labelWidth; 

      doc.setFont("helvetica", "normal"); 
      doc.setTextColor(0, 0, 0); 
      doc.text(value, valueX, y); 

      y += 10; 
    };

    
    addField("Full Name", formData.fullName);
    addField("Phone Number", formData.phone);
    addField("Email Address", formData.email);
    addField("Country", countryName || formData.country);
    addField("Tour Cost Per Person", `${prize} PKR/-`);
    addField("Message", formData.message);


    doc.save("tour-package-booking-details.pdf");
  };
  

  return (
    <div>
          <div className="relative w-full mb-6 h-[380px]">
  <img src="/image/turkk.jpg" className="w-full h-full object-cover" alt="Travel Image" />
  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
    <h2 className="text-white text-2xl md:text-4xl font-bold text-center">
    Discover breathtaking destinations with our exclusive tour packages!
    </h2>
  </div>
  </div>

    <div className=" mx-4 p-6 bg-gray-100 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold font-serif text-center mb-4">Tour Package Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Full Name</label>
          <input
            type="text"
            placeholder="Your Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Phone Number</label>
          <input
            type="tel"
            name="phone"
            placeholder="Phone number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Email Address</label>
          <input
            type="email"
            placeholder="Your email address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Country</label>
          <input
            type="text"
            name="country"
            placeholder="Enter country name"
            value={`${countryName}`}
            readOnly
            
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Tour Cost Per Person</label>
          <input
            type="text"
            name="country"
            placeholder="Enter country name"
            value={`${prize} PKR/-`}
            readOnly
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Your Message / Request</label>
          <textarea
            name="message"
            placeholder="Your message"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-orange-500 transition"
        >
          Submit
        </button>
        {isConfirmed && (
        <button
        type='button' 
         onClick={generatePDF}
          className="w-full bg-blue-600 text-white py-2 mt-4 rounded-md hover:bg-orange-500 transition"
        >
          Download Form Details (PDF)
        </button>)}
      </form>
    </div>
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

export default function TourForm() {
return(
     <div>
         <Suspense fallback={<p className="text-center text-gray-600">Loading...</p>}>
              <TourContent />
            </Suspense>
      </div>
  )
 
}
