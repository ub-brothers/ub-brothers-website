'use client';
import { FaMapMarkerAlt } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from 'framer-motion';
import PaymentDetails from '../payment/page';
import jsPDF from 'jspdf';
import { jwtDecode } from 'jwt-decode';

function FileContent(){
  const [isApprovedUser, setIsApprovedUser] = useState(false);

  const searchParams = useSearchParams();
  const prize = searchParams.get("prize") || "";
  const prizeForUsers = searchParams.get("prizeForUsers") || "";
  const countryName = searchParams.get("countryName");
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    country: '',
    price:'',
    prizeForUsers:"",
    message: '',
    userEmail:'',
  });

  const [isSubmitting, setIsSubmitting] = useState(false)
  useEffect(() => {
      const token = localStorage.getItem("token");
    
      if (token) {
        try {
          const decoded: any = jwtDecode(token);
        
          if (decoded.approved) {
            setIsApprovedUser(true);
          } else {
            setIsApprovedUser(false);
          }
        } catch (error) {
          console.error("Invalid token", error);
        }
      }
    }, []);


  const handleChange = (e:any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleSubmit = async (e:any) => {
    setIsConfirmed(true);
    e.preventDefault();
    setIsSubmitting(true);

    const storedEmail = localStorage.getItem("userEmail");

    const updatedFormData = {
      ...formData,
      country: countryName || "", // Ensure it's added
      userEmail: storedEmail || "",
      price: prize || "",
      prizeForUsers: prizeForUsers || "",
    };
  
    try {
      const response = await fetch('/api/fileForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFormData),
      });
  
      const result = await response.json();
      
      if (result.success) {
        alert('Submitted successfully!');
        setFormData({ fullName: '', phone: '', email: '', country: '',price:'', message: '',prizeForUsers:"", userEmail:"" }); // Clear form
      } else {
        alert('Failed to submit. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again later.');
    }
    finally {
      setIsSubmitting(false); // 👈 enable button again
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();


    const companyLogo = "/image/logo.png";
    doc.addImage(companyLogo, "PNG", 10, 10, 30, 30); 

   
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("UB Brothers Travel & Tours", 45, 20); 
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text("File & Consultancy Details", 45, 30);

 doc.setFontSize(14);
 doc.setTextColor(0, 0, 0);
 let y = 50; 

 
 const addField = (label: any, value: any) => {
   doc.setFont("helvetica", "bold"); 
   doc.text(`${label}:`, 10, y); 


   const labelWidth = doc.getTextWidth(`${label}:`);
   const valueX = 15 + labelWidth; 

   doc.setFont("helvetica", "normal"); 
   doc.text(value, valueX, y); 

   y += 10; 
 };

 
 addField("Full Name", formData.fullName);
 addField("Phone", formData.phone);
 addField("Email", formData.email);
 addField("Country" , `${countryName}`);
 addField("Price" , `${isApprovedUser ? prizeForUsers : prize} PKR/-`);

 doc.setFont("helvetica", "bold");
 doc.text("Message:", 10, y); 
 y += 7; 
 doc.setFont("helvetica", "normal");
 const splitMessage = doc.splitTextToSize(formData.message, 180); 
 doc.text(splitMessage, 10, y); 
 y += splitMessage.length * 7; 

    
    doc.save("file-consultancy-form-details.pdf");
  };

  

  return (
    <div>
          <div className="relative w-full mb-6 h-[380px]">
  <img src="/image/ukk.jpg" className="w-full h-full object-cover" alt="Travel Image" />
  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
    <h2 className="text-white text-2xl md:text-4xl font-bold text-center">
    Streamline your visa & immigration process with expert consultancy!
    </h2>
  </div>
  </div>

    <div className=" mx-4 p-6 bg-gray-100 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold font-serif text-center mb-4">Fill out Form below</h2>
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
          <label className="block font-semibold mb-1">Country </label>
          <input
            type="text"
            name="country"
            placeholder="Enter country name"
            value={`${countryName}`}
          readOnly
            className="w-full px-4 py-2 border rounded-md focus:outline-none  bg-gray-100 focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
        <label className="block mb-2 font-semibold text-gray-700">Visa Cost</label>
        <input type="text"  value={`${isApprovedUser ? prizeForUsers : prize} PKR/-`}  className="w-full p-2 mb-4 border rounded bg-gray-100" />
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
          disabled={isSubmitting}
          className={`w-full text-white py-2 rounded-md transition 
            ${isSubmitting 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-orange-500'}`}
        >
        {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
        {isConfirmed && (
        <button
        type="button"
         onClick={generatePDF}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-orange-500 transition"
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
            <FileContent />
          </Suspense>
    </div>
  )
  
}
