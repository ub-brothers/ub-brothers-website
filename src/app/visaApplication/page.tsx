"use client";

import { useState, useEffect } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import PaymentDetails from "../payment/page";
import { motion } from 'framer-motion';
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import jsPDF from 'jspdf';
import { jwtDecode } from 'jwt-decode';

function EVisaContent(){
 const [isApprovedUser, setIsApprovedUser] = useState(false);



  const searchParams = useSearchParams();
  
  const countryName = searchParams.get("countryName");

  const [photo, setPhoto] = useState(null);
  const [passportPhoto, setPassportPhoto] = useState(null);
  const [idCardPhoto, setIdCardPhoto] = useState(null);
  const [photoValid, setPhotoValid] = useState(null);
  const [passportValid, setPassportValid] = useState(null);
  const [idCardValid, setIdCardValid] = useState(null);
const prize = searchParams.get("prize") || "";
const prizeForUsers = searchParams.get("prizeForUsers")||"";
console.log("Prize For Users:", searchParams.get("prizeForUsers"));

const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    visaType: "",
    nationality: "",
    firstName: "",
    countryName:"",
   prize: "",
   prizeForUsers:"",
    fatherName: "",
    gender: "",
  
    phone: "",
    email: "",
    residenceAddress: "",
    passportNumber: "",
   
   
  });

  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleSubmit = async (e: any) => {
    setIsConfirmed(true);
    e.preventDefault();
    setIsSubmitting(true);
    try {
    const formDataToSend = new FormData();

    formDataToSend.append("visaType", formData.visaType);
    formDataToSend.append("nationality", formData.nationality);
    formDataToSend.append("firstName", formData.firstName);
    formDataToSend.append("countryName", `${countryName}`);
    formDataToSend.append("prize", `${isApprovedUser ? prizeForUsers : prize} PKR/-`);
    formDataToSend.append("fatherName", formData.fatherName);
    formDataToSend.append("gender", formData.gender);
 
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("email", formData.email);

    formDataToSend.append("residenceAddress", formData.residenceAddress);
    formDataToSend.append("passportNumber", formData.passportNumber);
 
 const storedEmail = localStorage.getItem("userEmail");
 if (storedEmail) {
  formDataToSend.append("storedUserEmail", storedEmail);
}

    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        formDataToSend.append(key, value);
      }
    });
     
    if (photo) formDataToSend.append("photo", photo);
    if (passportPhoto) formDataToSend.append("passportPhoto", passportPhoto);
    if (idCardPhoto) formDataToSend.append("idCardPhoto", idCardPhoto);

    for (let pair of formDataToSend.entries()) {
    
    }

 
    const response = await fetch("/api/visaForm", {
      method: "POST",
      body: formDataToSend,
      
    });
  
    const result = await response.json();
    alert(result.message);
  } catch (error) {
    console.error("Error submitting visa form:", error);
    alert("Something went wrong while submitting the form.");
  } finally {
    setIsSubmitting(false); // ✅ Always reset the button state
  }
};



 



  const handleChange = (e:any) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };
  const handleFileChange = (e: any) => {
    setPhoto(e.target.files[0]);
    
  };

  

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
 

  const checkImageQuality = (file: File, checkWhiteBg: boolean, setValidState: any , setImage: (image: string)=> void) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
  
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
  
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          console.error("Canvas context is null"); 
          return;
        }
  
        ctx.drawImage(img, 0, 0, img.width, img.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
  
        let totalBrightness = 0;
        let whitePixelCount = 0;
        let pixelCount = pixels.length / 4;
  
        for (let i = 0; i < pixels.length; i += 4) {
          const r = pixels[i];
          const g = pixels[i + 1];
          const b = pixels[i + 2];
  
        
          const brightness = (r + g + b) / 3;
          totalBrightness += brightness;
  
          
          if (r > 230 && g > 230 && b > 230) {
            whitePixelCount++;
          }
        }
  
        const avgBrightness = totalBrightness / pixelCount;
        const whitePercentage = (whitePixelCount / pixelCount) * 100;
  
        const isImageClear = avgBrightness > 80;
        const isWhiteBg = whitePercentage > 40;
  
        if (checkWhiteBg) {
          setValidState(isImageClear && isWhiteBg);
        } else {
          setValidState(isImageClear);
        }
        setImage(URL.createObjectURL(file));
      };
    };
  };
  
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement> , fileType: string , setValidState:  any, checkWhiteBg = false) => {
    const file = event.target.files?.[0];
    if (file) {
      await checkImageQuality(file, checkWhiteBg, setValidState, () => {
       
        setFormData((prevFormData) => ({
          ...prevFormData,
          [fileType]: file,
        }));
      });
    }
  };
  
  
    
  const generatePDF = async () => {
    const doc = new jsPDF();
  
    // Add company logo (static image)
    const companyLogo = "/image/logo.png"; // Ensure this path is correct
    doc.addImage(companyLogo, "PNG", 10, 10, 30, 30); // Add logo at top-left corner
  
    // Add header text
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 128); // Navy blue color
    doc.text("UB Brothers Travel & Tours", 45, 20); // Add company name
  
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Black color
    doc.text("E-Visa Application Details", 45, 30); // Add subtitle
  
   // Function to add a field with blue bold label and normal black value
  const addField = (label: string, value: string, yOffset: number): number => {
    // Add label (blue and bold)
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 128); // Navy blue color
    doc.text(`${label}:`, 10, yOffset);

    // Calculate the width of the label
    const labelWidth = doc.getTextWidth(`${label}:`);

    // Add value (normal black text)
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0); // Black color
    doc.text(value, 15 + labelWidth, yOffset); // Position value next to the label

    return yOffset + 10; // Return updated Y offset
  };

  // Add form data to PDF
  let yOffset = 50; // Start Y position for form data
  yOffset = addField("Visa Type", formData.visaType, yOffset);
  yOffset = addField("Nationality", formData.nationality, yOffset);
  yOffset = addField("First Name", formData.firstName, yOffset);
  yOffset = addField("Country Name", `${countryName}`, yOffset);
  yOffset = addField("Prize", `${isApprovedUser ? prizeForUsers : prize}`, yOffset);
  yOffset = addField("Father's Name", formData.fatherName, yOffset);
  yOffset = addField("Gender", formData.gender, yOffset);
  yOffset = addField("Phone", formData.phone, yOffset);
  yOffset = addField("Email", formData.email, yOffset);
  yOffset = addField("Residence Address", formData.residenceAddress, yOffset);
  yOffset = addField("Passport Number", formData.passportNumber, yOffset);

  // Add images to new pages
  if (photo) {
    const photoURL = URL.createObjectURL(photo);
    doc.addPage(); // Create a new page for the photo
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 128);
    doc.text("Personal Photo:", 10, 20);
    doc.addImage(photoURL, "JPEG", 10, 30, 80, 80); // Add the photo
  }

  if (passportPhoto) {
    const passportPhotoURL = URL.createObjectURL(passportPhoto);
    doc.addPage(); // Create a new page for the passport photo
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 128);
    doc.text("Passport Photo:", 10, 20);
    doc.addImage(passportPhotoURL, "JPEG", 10, 30, 80, 80); // Add the passport photo
  }

  if (idCardPhoto) {
    const idCardPhotoURL = URL.createObjectURL(idCardPhoto);
    doc.addPage(); // Create a new page for the ID card photo
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 128);
    doc.text("ID Card Photo:", 10, 20);
    doc.addImage(idCardPhotoURL, "JPEG", 10, 30, 80, 80); // Add the ID card photo
  }

  // Save the PDF
  doc.save("visa_application.pdf");
};

  return (
    <div>

  <div className="relative w-full mb-6 h-[380px]">
  <img src="/image/travel3.jpg" className="w-full h-full object-cover" alt="Travel Image" />
  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
    <h2 className="text-white text-2xl md:text-4xl font-bold text-center">
    Secure & Smooth Visa Processing Starts Here!
    </h2>
  </div>
  </div>


    <div className="max-w-6xl mx-auto p-6 bg-gray-100 shadow-md  space-y-6">
      <form onSubmit={handleSubmit}>
      <h2 className="text-3xl font-bold text-center mb-6">Visa Application</h2>
      
      <section>
        <h3 className="text-xl font-semibold text-blue-800 mb-2"><u>Visa Information</u></h3>
        <p>Visa Type</p>
        <select className="w-full p-2 border rounded mb-2" name="visaType" value={formData.visaType} onChange={handleChange}  >
          <option>Select Visa Type</option>
          <option>Tourist</option>
          <option>Business</option>
        </select>

        <p>Nationality:</p>
        <input className="w-full p-2 border rounded mb-2" placeholder="Your nationality" type="text" name="nationality" value={formData.nationality} onChange={handleChange} >
        </input>

       
        <p>Visa Country:</p>
        <input placeholder="Enter Country name" name="countryName" readOnly type="text" value={`${countryName}`} className="w-full p-2 border rounded mb-2">
         
        </input>

        <p>Visa Cost:</p>
        <input placeholder="Enter Country name" name="countryName" readOnly type="text" value={`${isApprovedUser ? prizeForUsers : prize} PKR/-`} className="w-full p-2 border rounded mb-2">
         
        </input>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-blue-800 mb-2 mt-10"><u>Personal Information</u></h3>
        <p>Full Name</p>
        <input type="text" placeholder="Enter Full Name" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
      
        <p>Father’s Name</p>
        <input type="text" placeholder="Enter Father’s Name" name="fatherName" value={formData.fatherName} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
        <p>Gender</p>
        <select className="w-full p-2 border rounded mb-2" name="gender" value={formData.gender} onChange={handleChange}>
          <option>Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
    
        <section>
        <h3 className="text-lg mb-2">Personal Photo (White Background & Clear)</h3>
        <input type="file" name="photo" onChange={(e) => handleFileUpload(e,"photo",  setPhotoValid, true)}  className="w-full p-2 border rounded mb-2" />
        {photo && <img src={photo} alt="Personal" className="h-24 mt-2" />} 
        {photoValid !== null && (photoValid ? "✅" : "❌ Photo is not clear or background is not white")}
      </section>

      </section>

      <section>
        <h3 className="text-xl font-semibold text-blue-800 mb-2 mt-10"><u>Contact Information</u></h3>
        <p>Phone Number</p>
        <input type="text" placeholder="Enter Phone Number" name="phone" value={formData.phone}  onChange={handleChange} className="w-full p-2 border rounded mb-2" />
        <p>Email</p>
        <input type="text" placeholder="Enter Email" name="email" value={formData.email}  onChange={handleChange} className="w-full p-2 border rounded mb-2" />
        <p>Residence Address</p>
        <input type="text" placeholder="Enter Address" name="residenceAddress" value={formData.residenceAddress}  onChange={handleChange} className="w-full p-2 border rounded mb-2" />
      </section>
        <section>
        <h3 className="text-lg  mb-2">ID Card Photo (Clear Image)</h3>
        <input type="file"  name="idCardPhoto" onChange={(e) => handleFileUpload(e, "idCardPhoto", setIdCardValid)} className="w-full p-2 border rounded mb-2" />
        {idCardPhoto && <img src={idCardPhoto} alt="ID Card" className="h-24 mt-2" />} 
        {idCardValid !== null && (idCardValid ? "✅" : "❌ Photo is not clear")}
      </section>

      <section>
        <h3 className="text-xl font-semibold text-blue-800 mb-2 mt-10"><u>Passport Information</u></h3>
        <p>Passport Number</p>
        <input type="text" placeholder="Enter Passport Number" name="passportNumber" value={formData.passportNumber} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
       
       
        <section>
        <h3 className="text-lg mb-2">Passport Scan Copy (Clear Image)</h3>
        <input type="file"  name="passportPhoto" onChange={(e) => handleFileUpload(e, "passportPhoto", setPassportValid)} className="w-full p-2 border rounded mb-2" />
        {passportPhoto && <img src={passportPhoto} alt="Passport" className="h-24 mt-2" />} 
        {passportValid !== null && (passportValid ? "✅" : "❌ Photo is not clear")}
      </section>
       
      </section>
      <div className="text-center mt-6">
        <button disabled={isSubmitting} className={`w-full text-white py-2 rounded-md transition 
            ${isSubmitting 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-orange-500'}`}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
        {isConfirmed && (
        <button
        type='button'
         onClick={generatePDF}
          className="w-full bg-blue-600 text-white py-2 mt-4 rounded-md hover:bg-orange-500 transition"
        >
          Download Form Details (PDF)
        </button>)}
      </div>
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
              
      <div className="my-4">
      <PaymentDetails/></div>
      
    </div>
  );
}

export default function VisaApplication() {
  return(
       <div>
           <Suspense fallback={<p className="text-center text-gray-600">Loading...</p>}>
                <EVisaContent />
              </Suspense>
        </div>
    )
  
}
