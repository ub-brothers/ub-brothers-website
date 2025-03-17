"use client";

import { motion } from 'framer-motion'; 
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useState,useEffect } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import PaymentDetails from '../payment/page';
import jsPDF from 'jspdf';
import { jwtDecode } from 'jwt-decode';
import { FaTicketAlt, FaUtensils, FaBus, FaHotel, FaMosque, FaClock, FaFileAlt } from "react-icons/fa";
import { Dialog } from "@headlessui/react";

const items = [
  { name: "Ticket", icon: <FaTicketAlt /> },
  { name: "Food", icon: <FaUtensils /> },
  { name: "Transport", icon: <FaBus /> },
  { name: "Hotel", icon: <FaHotel /> },
  { name: "Ziyarat & Ibadat", icon: <FaMosque /> },
  { name: "Day Duration", icon: <FaClock /> },
  { name: "Documents", icon: <FaFileAlt /> }
];




function BookFormContent() {
  const [selected, setSelected] = useState<string | null>(null); 
   const searchParams = useSearchParams();

   const makkahHotel = searchParams.get("makkahHotel") || "";
   const [isApprovedUser, setIsApprovedUser] = useState(false);
   const modalContent = {
    ticketHead: searchParams.get("ticketHead"),
    airlineName: searchParams.get("airlineName"),
    airlineImage: searchParams.get("airlineImage"),
    flightNum1: searchParams.get("flightNum1"),
    dateOfFlight1: searchParams.get("dateOfFlight1"),
    route1: searchParams.get("route1"),
    time1: searchParams.get("time1"),
    flightNum2: searchParams.get("flightNum2"),
    dateOfFlight2: searchParams.get("dateOfFlight2"),
    route2: searchParams.get("route2"),
    time2: searchParams.get("time2"),
    foodHead: searchParams.get("foodHead"),
    food: searchParams.get("food"),
    transportHead: searchParams.get("transportHead"),
    transport: searchParams.get("transport"),
    hotelHead: searchParams.get("hotelHead"),
    makkahHotel: searchParams.get("makkahHotel"),
    madinaHotel: searchParams.get("madinaHotel"),
    documentsH: searchParams.get("documentsH"),
    doc1: searchParams.get("doc1"),
    doc2: searchParams.get("doc2"),
    doc3: searchParams.get("doc3"),
    doc4: searchParams.get("doc4"),
    doc5: searchParams.get("doc5"),
    doc6: searchParams.get("doc6"),
    holyZiaratHead: searchParams.get("holyZiaratHead"),
    holyziarat: searchParams.get("holyziarat"),
    azizaStay: searchParams.get("azizaStay"),
    azizaStayDetail: searchParams.get("azizaStayDetail"),
    azizaStay2:searchParams.get("azizaStay2"),
    azizaStayDetail2:searchParams.get("azizaStayDetail2"),
    makkahStay:searchParams.get("makkahStay"),
    makkahStayDetail:searchParams.get("makkahStayDetail"),
    madinaStay:searchParams.get("madinaStay"),
    madinaStayDetail:searchParams.get("madinaStayDetail"),
  };

  
  
  const countryName = searchParams.get("countryName") || "";
  
  const madinaHotel= searchParams.get('madinaHotel') || "";
  const shortDescription = searchParams.get("shortDescription") || "";
  const prize1 = searchParams.get("prize1") || "";
  const prize2 = searchParams.get("prize2") || "";
  const prize3 = searchParams.get("prize3") || "";
  const sharingPriceForUsers = searchParams.get("sharingPriceForUsers") || "";
  const triplePriceForUsers = searchParams.get("triplePriceForUsers") || "";
  const doublePriceForUsers = searchParams.get("doublePriceForUsers") || "";

  const [userName, setUserName] = useState("");
  const [userNumber, setUserNumber] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("sharing");
  const [userMessage, setUserMessage] = useState("");

  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleSubmit = async (e:any) => {
    setIsConfirmed(true);
    e.preventDefault();
    const selectedPrize = selectedCategory === "sharing" ? (isApprovedUser ? sharingPriceForUsers : prize1) : selectedCategory === "triple" ? (isApprovedUser ? triplePriceForUsers : prize2) :  (isApprovedUser ? doublePriceForUsers : prize3);
    const storedEmail = localStorage.getItem("userEmail");
    const formData = { userName, userNumber, userEmail, shortDescription, selectedCategory, selectedPrize, userMessage, storedUserEmail:storedEmail, makkahHotel,madinaHotel };
    
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
    doc.text("Hajj & Umrah Form Details", 45, 30);

  
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

  addField("Full Name", userName);
  addField("Phone Number", userNumber);
  addField("Email Address", userEmail);
  addField("Day Duration", shortDescription);
  addField("Makkah Hotel", makkahHotel);
  addField("Madina Hotel", madinaHotel);
  addField("Selected Category", selectedCategory);
  addField("Selected Prize", selectedCategory === "sharing" ? (isApprovedUser ? sharingPriceForUsers : prize1) : selectedCategory === "triple" ? (isApprovedUser ? triplePriceForUsers : prize2) :  (isApprovedUser ? doublePriceForUsers : prize3));

  
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 0, 128); 
  doc.text("Message:", 10, y); 
  y += 7; 
  doc.setFont("helvetica", "normal");
  doc.setTextColor(0, 0, 0);
  const splitMessage = doc.splitTextToSize(userMessage, 180); 
  doc.text(splitMessage, 10, y); 
  y += splitMessage.length * 7;

  
    doc.save("hajj-booking-details.pdf");
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

        <label className="block font-semibold">Makkah Hotel</label>
        <input type="text" value={makkahHotel} readOnly className="w-full p-2 mb-4 border rounded bg-gray-100" />

        <label className="block font-semibold">Madina Hotel</label>
        <input type="text" value={madinaHotel} readOnly className="w-full p-2 mb-4 border rounded bg-gray-100" />

        <label className="block font-semibold">Select Category</label>
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full p-2 mb-4 border rounded">
          <option value="sharing">Sharing - {isApprovedUser ? sharingPriceForUsers : prize1} PKR/-</option>
          <option value="triple">Triple - {isApprovedUser ? triplePriceForUsers: prize2} PKR/-</option>
          <option value="double">Double - {isApprovedUser ? doublePriceForUsers : prize3} PKR/-</option>
        </select>
        
        <label className="block font-semibold">Your Message</label>
        <textarea value={userMessage} onChange={(e) => setUserMessage(e.target.value)} className="w-full p-2 mb-4 border rounded" placeholder="Enter your message (optional)" rows={3} />
        
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-orange-500 hover:shadow-md">Submit</button>
        {isConfirmed && (
           <button type='button' onClick={generatePDF} className="w-full mt-4 bg-blue-500 text-white p-2 rounded hover:bg-orange-500 hover:shadow-md">Download Hajj Form Details (PDF)</button>
        )}
      </form>

      <h1 className="text-center mx-2 font-semibold my-5"><i>Thank you for reaching out! We will get back to you as soon as possible.</i></h1>
<h1 className='mt-4 text-center font-bold text-lg'>This Hajj Package Includes:</h1>
      <div className="flex flex-wrap gap-4 justify-center p-6">
      {items.map((item, index) => (
        <motion.div
          key={index}
          className="w-40 h-40 flex flex-col items-center justify-center border-2 border-blue-500 text-blue-500 font-bold text-center p-4 rounded-lg cursor-pointer hover:shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelected(item.name)}
        >
          <div className="text-4xl mb-2">{item.icon}</div>
          <span>{item.name}</span>
        </motion.div>
      ))}

      {/* Modal */}
      {selected && (
        <Dialog open={!!selected} onClose={() => setSelected(null)} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <Dialog.Panel className="bg-white p-6 rounded-lg shadow-lg w-96">
            <Dialog.Title className="text-xl font-bold text-blue-500 flex items-center">
              {items.find((item) => item.name === selected)?.icon}
              <span className="ml-2">{selected}</span>
            </Dialog.Title>

            <Dialog.Description className="mt-2 text-gray-600">
              {/* ✅ Ticket Details */}
              {selected === "Ticket" && (
            <>
            
              {modalContent.airlineName && <p><b>Airline:</b> {modalContent.airlineName}</p>}
              {modalContent.airlineImage && (
                <img src={modalContent.airlineImage} alt="Airline Logo" className="mt-2 w-24 h-12 object-contain" />
              )}

              {/* ✅ Flight Schedule Table */}
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-4">Flight Schedule</h4>
                <table className="min-w-full bg-white border border-gray-200 text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-2 px-4 border-b">Flight #</th>
                      <th className="py-2 px-4 border-b">Date</th>
                      <th className="py-2 px-4 border-b">Route</th>
                      <th className="py-2 px-4 border-b">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {modalContent.flightNum1 && (
                      <tr>
                      <td className="py-2 px-4 border-b text-center">{modalContent.flightNum1}</td>
                      <td className="py-2 px-4 border-b text-center">{modalContent.dateOfFlight1}</td>
                      <td className="py-2 px-4 border-b text-center">{modalContent.route1}</td>
                      <td className="py-2 px-4 border-b text-center">{modalContent.time1}</td>
                    </tr>
                  )}
                  {/* Return Flight */}
                  {modalContent.flightNum2 && (
                    <tr>
                      <td className="py-2 px-4 border-b text-center">{modalContent.flightNum2}</td>
                      <td className="py-2 px-4 border-b text-center">{modalContent.dateOfFlight2}</td>
                      <td className="py-2 px-4 border-b text-center">{modalContent.route2}</td>
                      <td className="py-2 px-4 border-b text-center">{modalContent.time2}</td>
                    </tr>
                  )}
                  </tbody>
                </table>   
              </div>
            </>
          )}

              {/* ✅ Food Details */}
              {selected === "Food" && (
                <>
                  {modalContent.foodHead && <h3 className="text-xl font-semibold">{modalContent.foodHead}Food</h3>}
                  {modalContent.food && <p>{modalContent.food}</p>}
                </>
              )}

              {/* ✅ Transport Details */}
              {selected === "Transport" && (
                <>
                  {modalContent.transportHead && <h3 className="text-xl font-semibold">{modalContent.transportHead}</h3>}
                  {modalContent.transport && <p>{modalContent.transport}</p>}
                </>
              )}

              {/* ✅ Hotel Details */}
              {selected === "Hotel" && (
                <>
                  {modalContent.hotelHead && <h3 className="text-xl font-semibold">{modalContent.hotelHead}</h3>}
                  {modalContent.makkahHotel && <p><b>Makkah Hotel:</b> {modalContent.makkahHotel}</p>}
                  {modalContent.madinaHotel && <p><b>Madina Hotel:</b> {modalContent.madinaHotel}</p>}
                </>
              )}

              {/* ✅ Documents */}
              {selected === "Documents" && (
                <>
                  {modalContent.documentsH && <h3 className="text-xl font-semibold">{modalContent.documentsH}</h3>}
                  <ul className="list-disc ml-6">
                    {modalContent.doc1 && <li>{modalContent.doc1}</li>}
                    {modalContent.doc2 && <li>{modalContent.doc2}</li>}
                    {modalContent.doc3 && <li>{modalContent.doc3}</li>}
                    {modalContent.doc4 && <li>{modalContent.doc4}</li>}
                    {modalContent.doc5 && <li>{modalContent.doc5}</li>}
                    {modalContent.doc6 && <li>{modalContent.doc6}</li>}
                  </ul>
                </>
              )}

              {/* ✅ Ziyarat & Ibadat */}
              {selected === "Ziyarat & Ibadat" && (
                <>
                  {modalContent.holyZiaratHead && <h3 className="text-xl font-semibold">{modalContent.holyZiaratHead}</h3>}
                  {modalContent.holyziarat && <p>{modalContent.holyziarat}</p>}
                </>
              )}

              {/* ✅ Day Duration */}
              {selected === "Day Duration" && (
                <>
                    {modalContent.azizaStay && <h2 className="text-xl font-bold">{modalContent.azizaStay}</h2>}
          {modalContent.azizaStayDetail && <p className=" text-gray-700">{modalContent.azizaStayDetail}</p>}
          {modalContent.makkahStay && <h2 className="text-xl mt-2 font-bold">{modalContent.makkahStay}</h2>}
          {modalContent.makkahStayDetail && <p className=" text-gray-700">{modalContent.makkahStayDetail}</p>}
          {modalContent.azizaStay2 && <h2 className="text-xl font-bold">{modalContent.azizaStay2}</h2>}
          {modalContent.azizaStayDetail2 && <p className=" text-gray-700">{modalContent.azizaStayDetail2}</p>}
          {modalContent.madinaStay && <h2 className="text-xl mt-2 font-bold">{modalContent.madinaStay}</h2>}
          {modalContent.madinaStayDetail && <p className=" text-gray-700">{modalContent.madinaStayDetail}</p>}
                </>
              )}

            </Dialog.Description>

            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => setSelected(null)}>
              Close
            </button>
          </Dialog.Panel>
        </Dialog>
      )}
    </div>
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
        <p className="sm:text-2xl text-lg font-semibold font-serif">Alhaj M. Shaharyaar</p>
        <p className="text-sm text-gray-500 mt-2">03414311000</p>
        <p className="text-sm text-gray-500">&#9993;  ubbrotherspk@gmail.com</p>
      </div>
      <div className="text-center mt-4">
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
