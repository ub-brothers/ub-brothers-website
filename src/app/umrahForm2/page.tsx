"use client";

import { useState, useEffect } from "react";
import {client} from "@/sanity/lib/client"
import Hotels from "../hotelUi/page";
import PaymentDetails from "../payment/page";
import { motion } from 'framer-motion';
import { FaMapMarkerAlt } from "react-icons/fa";
import jsPDF from 'jspdf';
import { jwtDecode } from 'jwt-decode';

const UmrahBookingForm2 = () => {
   const [isApprovedUser, setIsApprovedUser] = useState(false);
  const [visaStatus, setVisaStatus] = useState("yes");
  
  const [daysOptions, setDaysOptions] = useState<{ days: number; price: number, priceForUsers:number, visaCost:number }[]>([]);
  const [categories, setCategories] = useState<{ categoryName: string; price: number, priceForUsers:number }[]>([]);
  const [selectedDays, setSelectedDays] = useState<number>(7);
  
  const [availableMakkahCategories, setAvailableMakkahCategories] = useState< { categoryName: string; price: number, priceForUsers:number }[]>([]);
  const [availableMadinaCategories, setAvailableMadinaCategories] = useState< { categoryName: string; price: number,priceForUsers:number }[]>([]);

  type Hotel = {
    hotelName: string;
    price: number;
    applicableCategories: { categoryName: string; price: number , priceForUsers:number}[];
  };
  const [makkahHotels, setMakkahHotels] = useState<Hotel[]>([]);
  const [madinaHotels, setMadinaHotels] = useState<Hotel[]>([]);
  const [selectedMakkahHotel, setSelectedMakkahHotel] = useState("");
  const [selectedMadinaHotel, setSelectedMadinaHotel] = useState("");
  const [selectedMakkahCategory, setSelectedMakkahCategory] = useState<string>("");
const [selectedMadinaCategory, setSelectedMadinaCategory] = useState<string>("");
  const [totalCost, setTotalCost] = useState<number>(0);
  const [formData, setFormData] = useState({ name: "", phone: "", nationality: "", makkahDay: 0, madinaDay: 0 });
    
  // Makkah hotel selection logic
  const handleMakkahHotelChange = (hotelName: string) => {
    const selectedHotel = makkahHotels.find((hotel) => hotel.hotelName === hotelName);
    setSelectedMakkahHotel(hotelName);
  
    // Store full objects instead of just category names
    setAvailableMakkahCategories(selectedHotel ? selectedHotel.applicableCategories : []);
  };
  
  
  
  // Madina hotel selection logic
  const handleMadinaHotelChange = (hotelName: string) => {
    const selectedHotel = madinaHotels.find((hotel) => hotel.hotelName === hotelName);
    setSelectedMadinaHotel(hotelName);
  
    // Store full objects instead of just category names
    setAvailableMadinaCategories(selectedHotel ? selectedHotel.applicableCategories : []);
  };
  

  useEffect(() => {

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


    const fetchData = async () => {
      const makkahData = await client.fetch<{ hotelName: string; price: number, applicableCategories: { categoryName: string; price: number,priceForUsers:number }[] }[]>(`*[_type == "makkahHotel"]{hotelName, price, applicableCategories[]{ categoryName, price,priceForUsers } }`);
      const madinaData = await client.fetch<{ hotelName: string; price: number , applicableCategories: { categoryName: string; price: number,priceForUsers:number }[] }[]>(`*[_type == "madinaHotel"]{hotelName, price, applicableCategories[]{ categoryName, price,priceForUsers } }`);


      const daysData = await client.fetch<{ days: number; price: number,priceForUsers:number, visaCost:number }[]>(`*[_type == "umrahDays"]{days, price,priceForUsers, visaCost}`);
      const categoriesData = await client.fetch<{ categoryName: string; price: number, priceForUsers:number }[]>(`*[_type == "roomCategories"]{categoryName, price}`);

      setMakkahHotels(makkahData);
      setMadinaHotels(madinaData);

     
      setDaysOptions(daysData);
      setCategories(categoriesData);
    };

    fetchData();
  }, []);

  
  const calculateCost = () => {
    const selectedMakkahHotelObj = makkahHotels.find((h) => h.hotelName === selectedMakkahHotel);
    const selectedMadinaHotelObj = madinaHotels.find((h) => h.hotelName === selectedMadinaHotel);


    const selectedMakkahCategoryObj = selectedMakkahHotelObj?.applicableCategories.find(
        (c) => c.categoryName === selectedMakkahCategory
    );
    const selectedMakkahCategoryPrice = selectedMakkahCategoryObj ? (isApprovedUser ? selectedMakkahCategoryObj.priceForUsers : selectedMakkahCategoryObj.price) * formData.makkahDay : 0;

    const selectedMadinaCategoryObj = selectedMadinaHotelObj?.applicableCategories.find(
        (c) => c.categoryName ===  selectedMadinaCategory
    );
    const selectedMadinaCategoryPrice = selectedMadinaCategoryObj ? (isApprovedUser ? selectedMadinaCategoryObj.priceForUsers : selectedMadinaCategoryObj.price) * formData.madinaDay : 0;

    let total =  selectedMakkahCategoryPrice + selectedMadinaCategoryPrice;

    const visaCost = daysOptions[0]?.visaCost || 0;
    if (visaStatus === "no" && proceedClicked) {
        total += visaCost;
    }

    setTotalCost(total);
};
const [proceedClicked, setProceedClicked] = useState(false);
const [errorMessage, setErrorMessage] = useState("");
const handleConfirmProceed = () => {
  if (visaStatus === "no") {
    if (!personalPhoto || !passportScan || !formData.nationality) {
      setErrorMessage("All fields are required!");
      return;
    }
  }

  setErrorMessage("");
  setProceedClicked(true);
};


const [personalPhoto, setPersonalPhoto] = useState<File | null>(null);
const [passportScan, setPassportScan] = useState<File | null>(null);
const [isConfirmed, setIsConfirmed] = useState(false);
const [isSubmitting, setIsSubmitting] = useState(false); 
const handleSubmit = async (e: React.FormEvent) => {
  setIsConfirmed(true);
  e.preventDefault();
  setIsSubmitting(true);
  try {

  const formDataToSend = new FormData();
  formDataToSend.append("name", formData.name);
  formDataToSend.append("phone", formData.phone);
  formDataToSend.append("days", selectedDays.toString());
  formDataToSend.append("makkahHotel", selectedMakkahHotel);
  formDataToSend.append("makkahDay", String(formData.makkahDay));
  formDataToSend.append("makkahCategory", selectedMakkahCategory);
  formDataToSend.append("madinaHotel", selectedMadinaHotel);
  formDataToSend.append("madinaDay", String(formData.madinaDay));
  formDataToSend.append("madinaCategory", selectedMadinaCategory);
  formDataToSend.append("visaStatus", visaStatus);
  formDataToSend.append("nationality", formData.nationality);
  formDataToSend.append("totalCost", totalCost.toString());

  const userEmail = localStorage.getItem("userEmail");
  if (userEmail) {
   formDataToSend.append("userEmail", userEmail);
 }

  if (personalPhoto) {
    formDataToSend.append("personalPhoto", personalPhoto);
  }
  if (passportScan) {
    formDataToSend.append("passportScan", passportScan);
  }

  const response = await fetch("/api/umrahForm", {
    method: "POST",
    body: formDataToSend, 
  });

  if (response.ok) {
    alert("Booking Submitted Successfully!");
  } else {
    alert("Failed to Submit Booking");
  }
  
}catch (error) {
  console.error("Error submitting form:", error);
  alert("Something went wrong. Please try again.");
} finally {
  setIsSubmitting(false); // ✅ always re-enable button
}
};


const generatePDF = () => {
  const doc = new jsPDF();

  // Add company logo
  const companyLogo = "/image/logo.png";
  doc.addImage(companyLogo, "PNG", 10, 10, 30, 30);

  // Add company name and title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(0, 0, 128); // Navy blue color
  doc.text("UB Brothers Travel & Tours", 45, 20);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0); // Black color
  doc.text("Umrah Booking Details", 45, 30);

  // Set initial y position for content
  let y = 50;

  // Function to split text into multiple lines
  const splitTextIntoLines = (text:any, maxWidth:any) => {
    const words = text.split(" ");
    const lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const width = doc.getTextWidth(currentLine + " " + word);
      if (width < maxWidth) {
        currentLine += " " + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);
    return lines;
  };

  // Function to add a field with label and value
  const addField = (label:any, value:any, x:any, maxWidth:any) => {
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 128); // Navy blue color
    doc.text(`${label}:`, x, y);

    const labelWidth = doc.getTextWidth(`${label}:`);
    const valueX = x + labelWidth + 5; // Add a small gap after the label

    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0); // Black color

    // Split the value into multiple lines if it's too long
    const valueLines = splitTextIntoLines(value, maxWidth);
    valueLines.forEach((line, index) => {
      doc.text(line, valueX, y + index * 10); // Add each line below the previous one
    });

    y += valueLines.length * 10; // Move y position based on the number of lines
  };
  
  addField("Full Name", formData.name, 10, 180); // Max width for full page
  addField("Phone Number", formData.phone, 10, 180);
  addField("Selected Days", `${selectedDays} Days`, 10, 180);
  // Function to draw a box around content
  const drawBox = (x:any, y:any, width:any, height:any) => {
    doc.setDrawColor(0, 0, 128); // Navy blue border color
    doc.setLineWidth(0.5); // Border thickness
    doc.rect(x, y, width, height); // Draw rectangle
  };

  // Add Makkah details
  const makkahX = 10;
  const makkahY = y;
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 0, 128);
  
  y += 10;

  addField("Makkah Hotel", selectedMakkahHotel, makkahX, 180); // Max width for Makkah box
  addField("Makkah Room Category", selectedMakkahCategory, makkahX, 180);
  addField("Makkah Days of Stay", formData.makkahDay.toString(), makkahX, 180);

  // Draw a box around Makkah details
  drawBox(makkahX - 5, makkahY - 5, 190, y - makkahY + 10);

  // Add spacing between Makkah and Madina details
  y += 20;

  // Add Madina details
  const madinaX = 10;
  const madinaY = y;
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 0, 128);
 
  y += 10;

  addField("Madina Hotel", selectedMadinaHotel, madinaX, 180); // Max width for Madina box
  addField("Madina Room Category", selectedMadinaCategory, madinaX, 180);
  addField("Madina Days of Stay", formData.madinaDay.toString(), madinaX, 180);

  // Draw a box around Madina details
  drawBox(madinaX - 5, madinaY - 5, 190, y - madinaY + 10);

  // Add spacing between Madina and other details
  y += 20;

  // Add other fields below the boxes

  addField("Visa Status", visaStatus === "yes" ? "Yes" : "No", 10, 180);
  addField("Nationality", formData.nationality, 10, 180);
  addField("Total Cost", `${totalCost} SAR/-`, 10, 180);

  // Add personal photo if available
  if (personalPhoto) {
    const personalPhotoURL = URL.createObjectURL(personalPhoto);
    doc.addPage();
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 128);
    doc.text("Personal Photo:", 10, 20);
    doc.addImage(personalPhotoURL, "JPEG", 10, 30, 80, 80);
  }

  // Add passport scan if available
  if (passportScan) {
    const passportScanURL = URL.createObjectURL(passportScan);
    doc.addPage();
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 128);
    doc.text("Passport Scan:", 10, 20);
    doc.addImage(passportScanURL, "JPEG", 10, 30, 80, 80);
  }

  // Save the PDF
  doc.save("umrah-booking-details.pdf");
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
    <form onSubmit={handleSubmit} className="mx-  p-8 bg-gray-100 shadow-xl rounded-2xl">
      <h2 className="text-2xl font-bold mb-6 text-center font-serif">Umrah Package</h2>


      <div className="lg:flex fllex-cols items-center mx-auto gap-6 my-2">
        <div>
      <p className="font-semibold">Full Name:</p>
      <input type="text" name="name" placeholder="Your name"  onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full p-3 mb-5 border rounded-md" required></input></div>
      <div>
      <p className="font-semibold">Phone Number:</p>
      <input type="text" name="phone" placeholder="Your phone number" onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full p-3 mb-5 border rounded-md" required ></input></div>
    
     


  <div>
      <label className="font-semibold">Select Days</label>
      <select onChange={(e) => setSelectedDays(Number(e.target.value))} className="w-full p-3 mb-5 border rounded-md">
        {daysOptions.map((day) => (
          <option key={day.days} value={day.days}>{`${day.days} Days`}</option>
        ))}
      </select></div>
       </div> 
      <hr></hr>


<div className="lg:flex flex-cols gap-6 my-6">
  <div>
<label className="font-semibold">Makkah Hotel</label>
      <select onChange={(e) => handleMakkahHotelChange(e.target.value)} className="w-full p-3 mb-5 border rounded-md">
        <option value="">Select a Makkah hotel</option>
        {makkahHotels.map((hotel) => (
          <option key={hotel.hotelName} value={hotel.hotelName}>
            {hotel.hotelName}
          </option>
        ))}
      </select></div>

<div>
 <label className="font-semibold">Makkah Room Category</label>
 <select 
  disabled={availableMakkahCategories.length === 0} 
  onChange={(e) => setSelectedMakkahCategory(e.target.value)} 
  className="w-full p-3 mb-5 border rounded-md" 
>
  <option>Select Room Category</option>
{availableMakkahCategories.length > 0 ? (
    availableMakkahCategories.map((catObj) => (
      <option key={catObj.categoryName} value={catObj.categoryName}>
        {catObj.categoryName}: {isApprovedUser ? catObj.priceForUsers : catObj.price} SAR/- (per night).
      </option>
    ))
  ) : (
    <option value="">Not applicable</option>
  )}
</select></div>


      <div>
      <p className="font-semibold">Days of Stay:</p>
      <input type="number"  min="0"  name="makkahDay" placeholder="Enter number of days"  onChange={(e) => setFormData({ ...formData, makkahDay: Number(e.target.value) })} className="w-full p-3 mb-5 border rounded-md" required></input>
      </div>
      
</div>

<hr></hr>

<div className="lg:flex flex-cols my-6 gap-6">
  <div>
      <label className="font-semibold mt-6">Madina Hotel</label>
      <select onChange={(e) => handleMadinaHotelChange(e.target.value)} className="w-full p-3 mb-5 border rounded-md">
        <option value="">Select a Madina hotel</option>
        {madinaHotels.map((hotel) => (
          <option key={hotel.hotelName} value={hotel.hotelName}>
            {hotel.hotelName}
          </option>
        ))}
      </select></div>

<div>
         <label className="font-semibold">Madina Room Category</label>
         <select 
  disabled={availableMadinaCategories.length === 0} 
  onChange={(e) => setSelectedMadinaCategory(e.target.value)}
  className="w-full p-3 mb-5 border rounded-md"
>
<option>Select Room Category</option>
{availableMadinaCategories.length > 0 ? (
    availableMadinaCategories.map((catObj) => (
      <option key={catObj.categoryName} value={catObj.categoryName}>
        {catObj.categoryName}: {isApprovedUser ? catObj.priceForUsers : catObj.price} SAR/- (per night).
      </option>
    ))
  ) : (
    <option value="">Not applicable</option>
  )}
</select></div>


<div>
      <p className="font-semibold">Days of Stay:</p>
      <input type="number"  min="0"  name="madinaDay" placeholder="Enter number of days"  onChange={(e) => setFormData({ ...formData, madinaDay: Number(e.target.value) })} className="w-full p-3 mb-5 border rounded-md" required></input>

</div>

</div>

      
<label className="font-semibold">You Have Visa?</label>
      <select onChange={(e) => setVisaStatus(e.target.value)} className="w-full p-3 mb-5 border rounded-md">
        <option value="">Select</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>

      {visaStatus === "no" && (
        <div className="bg-gray-100 p-4 rounded-md">
          <h3 className="font-bold">Fill out the form and apply for Visa!</h3>
          <h3 className="font-bold mb-2">Visa Cost: {daysOptions[0]?.visaCost} SAR/-</h3>

          <label className="font-semibold">Personal Photo (White BG)</label>
          <input type="file" accept="image/*" onChange={(e) => setPersonalPhoto(e.target.files?.[0] || null)} className="w-full p-3 border mb-5 rounded-md" />

          <label className="font-semibold">Passport Scan Copy</label>
          <input type="file" accept="image/*" onChange={(e) => setPassportScan(e.target.files?.[0] || null)} className="w-full p-3 mb-5 border rounded-md" />

          <label className="font-semibold">Nationality</label>
          <input
            placeholder="Nationality"
            name="nationality"
            onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
            className="w-full p-3 mb-5 border rounded-md"
          />

          <button
            type="button"
            onClick={handleConfirmProceed}
            className="mt-2 bg-blue-800 hover:bg-orange-500 text-white p-3 rounded-md font-semibold"
          >
            Confirm & Proceed
          </button>

          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
          {proceedClicked && <p className="text-green-600 font-bold mt-2">Confirmed ✅</p>}
        </div>
      )}
        

      <button type="button" onClick={calculateCost} className="w-full bg-blue-500 hover:bg-orange-500 text-white p-3 rounded-md font-semibold mb-2">
        Calculate Cost
      </button>

      {totalCost > 0 && (
        <div className="mt-4 p-4 text-center bg-gray-200 rounded-md">
          <p className="font-bold text-lg">Total Cost: {totalCost} SAR/-</p>
        </div>
      )}
      <button disabled={isSubmitting} className={`w-full my-2 text-white py-2 my-2 rounded-md transition 
            ${isSubmitting 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-orange-500'}`}>{isSubmitting ? 'Submitting...' : 'Submit'}</button>
      {isConfirmed && (
        <button
        type="button"
         onClick={generatePDF}
          className="w-full mt-2 bg-blue-600  text-white py-2 rounded-md hover:bg-orange-500 transition"
        >
          Download Form Details (PDF)
        </button>)} 
    </form>
    <h1 className="text-center mx-2 font-semibold my-5"><i>Thank you for reaching out! We will get back to you as soon as possible.</i></h1>
    
    <div className="w-full p-8">
      <h2 className="text-3xl font-bold mb-8 text-center font-sans text-blue-900">You Can Directly Contact:</h2>
      
  

      <div className="text-center">
        <p className="sm:text-2xl text-lg font-semibold font-serif">Narmeen Mughal</p>
        <p className="text-sm text-gray-500 mt-2">03414312000</p>
        <p className="text-sm text-gray-500">&#9993;  ubbrothersticketing@gmail.com</p>
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
             UGF/24-42, Empress Tower 46-Empress Road,Lahore, Pakistan.
                </p>
                <hr/>
                <p className="text-gray-600 text-lg flex items-center justify-center mt-2">
               H9W3+P5F, Tariq Shaheed Road, Bhagatpura, Lahore Pakistan.
                </p>
              </motion.div> 


    <Hotels/>
    <PaymentDetails/>
    
    </div>
  );
};

export default UmrahBookingForm2;
