"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { motion } from 'framer-motion';
import { FaMapMarkerAlt } from "react-icons/fa";
import PaymentDetails from '../payment/page';
import jsPDF from 'jspdf';
import { jwtDecode } from 'jwt-decode';


function FormContent(){
    const [isApprovedUser, setIsApprovedUser] = useState(false);
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    nationality: "",
    message: "",
  });

  const dateOfHajj = searchParams.get("dateOfHajj") || "";
  const discountedPrice = searchParams.get("discountedPrice") || "";
const discountedPriceForUsers = searchParams.get("discountedPriceForUsers") || "";
const title = searchParams.get("title")|| "";
const totalDays = searchParams.get("totalDays")||"";
const makkahHotel = searchParams.get("makkahHotel")||"";
const madinaHotel = searchParams.get("madinaHotel")||"";

  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsConfirmed(true);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const storedEmail = localStorage.getItem("userEmail");
    try {
      const response = await fetch("/api/hajjOfferForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          title,
          makkahHotel,
          madinaHotel,
          totalDays,
          dateOfHajj,
          discountedPrice,
          discountedPriceForUsers,
          userEmail:storedEmail,
        }),
      });
  
      const data = await response.json();
      alert(data.message); 
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form. Please try again.");
    }
  };


  useEffect(()=>{
    
    
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded: any = jwtDecode(token);
     

        if (decoded.approved === true || decoded.approved === "true") {
          setIsApprovedUser(true);
        } else {
          setIsApprovedUser(false);
        }
      } catch (error) {
        console.error("Invalid token", error);
      }
    }

  }, [])



  const generatePDF = () => {
    const doc = new jsPDF();

   
    const companyLogo = "/image/logo.png";
    doc.addImage(companyLogo, "PNG", 10, 10, 30, 30);


    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 128); 
    doc.text("UB Brothers Travel & Tours", 45, 20); 

   
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); 
    doc.text("Hajj Offer Booking Details", 45, 30);

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
    addField("Phone Number", formData.phoneNumber);
    addField("Email Address", formData.email);
    addField("Nationality", formData.nationality);
    addField("Date Of Hajj", `${dateOfHajj}`);
    addField("Total Days", `${totalDays}`);
    addField("Makkah Hotel", `${makkahHotel}`);
    addField("Madina Hotel", `${madinaHotel}`);
    addField("Discounted Price", `PKR ${isApprovedUser ? discountedPriceForUsers : discountedPrice}`);

   
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 128); 
    doc.text("Message:", 10, y); 
    y += 7;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0); 
    const splitMessage = doc.splitTextToSize(formData.message, 180); 
    doc.text(splitMessage, 10, y); 
    y += splitMessage.length * 7; 

  
    doc.save("hajj-offer-booking-details.pdf");
  };

  
  return (


    <div className=" bg-white rounded-lg">
     <div className="relative w-full mb-6 h-[380px]">
  <img src="/image/makkah2.jpg"  className="w-full h-full object-cover" alt="Travel Image" />
  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
    <h2 className="text-white text-2xl md:text-4xl font-bold text-center">
    Apply now for this exclusive Hajj offer and take the first step towards a spiritual journey!
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

        <label className="block text-lg font-semibold mb-2">Hajj Date</label>
        <input type="text" value={`${dateOfHajj}`} readOnly className="w-full p-3 border bg-gray-200 rounded-lg mb-4" />

        <label className="block text-lg font-semibold mb-2">Hajj Day Duration</label>
        <input type="text" value={`${totalDays}`} readOnly className="w-full p-3 border bg-gray-200 rounded-lg mb-4" />

        <label className="block text-lg font-semibold mb-2">Makkah Hotel</label>
        <input type="text" value={`${makkahHotel}`} readOnly className="w-full p-3 border bg-gray-200 rounded-lg mb-4" />
        <label className="block text-lg font-semibold mb-2">Madina Hotel</label>
        <input type="text" value={`${madinaHotel}`} readOnly className="w-full p-3 border bg-gray-200 rounded-lg mb-4" />

        <label className="block text-lg font-semibold mb-2">Discounted Price</label>
        <input type="text" value={`PKR ${isApprovedUser? discountedPriceForUsers: discountedPrice}`} readOnly className="w-full p-3 border bg-gray-200 rounded-lg mb-4" />

        <label className="block text-lg font-semibold mb-2">Nationality</label>
        <input type="text" name="nationality" placeholder="Your Nationality" value={formData.nationality} onChange={handleChange} className="w-full p-3 border bg-gray-100 rounded-lg mb-4" required />

        <label className="block text-lg font-semibold mb-2">Message</label>
        <textarea name="message" placeholder="Any Message" value={formData.message} onChange={handleChange} className="w-full p-3 border bg-gray-100 rounded-lg mb-4" rows={4} required></textarea>

        <button type="submit" className="w-full bg-blue-500 hover:bg-orange-500 text-white font-bold rounded-lg p-3">Submit</button>
        {isConfirmed && (
        <button
         onClick={generatePDF} type="button"
          className="w-full bg-blue-600 text-white py-2 mt-4 rounded-md hover:bg-orange-500 transition"
        >
          Download Form Details (PDF)
        </button>)}
      </form>

      <h1 className="text-center mx-2 font-semibold my-5"><i>Thank you for reaching out! We will get back to you as soon as possible.</i></h1>
    
   

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
