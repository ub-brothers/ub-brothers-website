"use client";

import { useState } from "react";
import ContactInfo from "../contactDiv/page";
import PaymentDetails from "../payment/page";
import { motion } from 'framer-motion';


export default function VisaApplication() {
  const [photo, setPhoto] = useState(null);
  const [passportPhoto, setPassportPhoto] = useState(null);
  const [idCardPhoto, setIdCardPhoto] = useState(null);
  const [photoValid, setPhotoValid] = useState(null);
  const [passportValid, setPassportValid] = useState(null);
  const [idCardValid, setIdCardValid] = useState(null);

  const [formData, setFormData] = useState({
    visaType: "",
    nationality: "",
    firstName: "",
    countryName:"",
   
    fatherName: "",
    gender: "",
  
    phone: "",
    email: "",

    residenceAddress: "",
    passportNumber: "",
   
    approximateArrivalDate: "",
    approximateDepartureDate: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
    formDataToSend.append("visaType", formData.visaType);
    formDataToSend.append("nationality", formData.nationality);
    formDataToSend.append("firstName", formData.firstName);
    formDataToSend.append("countryName", formData.countryName);
    
    formDataToSend.append("fatherName", formData.fatherName);
    formDataToSend.append("gender", formData.gender);
 
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("email", formData.email);

    formDataToSend.append("residenceAddress", formData.residenceAddress);
    formDataToSend.append("passportNumber", formData.passportNumber);
 
    formDataToSend.append("approximateArrivalDate", formData.approximateArrivalDate);
    formDataToSend.append("approximateDepartureDate", formData.approximateDepartureDate);

    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        formDataToSend.append(key, value);
      }
    });
     
    if (photo) formDataToSend.append("photo", photo);
    if (passportPhoto) formDataToSend.append("passportPhoto", passportPhoto);
    if (idCardPhoto) formDataToSend.append("idCardPhoto", idCardPhoto);

    for (let pair of formDataToSend.entries()) {
      console.log(pair[0] + ": " + pair[1]); 
    }
  
    const response = await fetch("/api/visaForm", {
      method: "POST",
      body: formDataToSend,
    });
  
    const result = await response.json();
    alert(result.message);
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
        const isWhiteBg = whitePercentage > 50;
  
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

       
        <p>Country you want visa for:</p>
        <input placeholder="Enter Country name" name="countryName" type="text" value={formData.countryName} onChange={handleChange} className="w-full p-2 border rounded mb-2">
         
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
        <h3 className="text-xl font-semibold text-blue-800 mb-2 mt-10"><u>Passport Information</u></h3>
        <p>Passport Number</p>
        <input type="text" placeholder="Enter Passport Number" name="passportNumber" value={formData.passportNumber} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
       
       
        <section>
        <h3 className="text-lg mb-2">Passport Photo (Clear Image)</h3>
        <input type="file"  name="passportPhoto" onChange={(e) => handleFileUpload(e, "passportPhoto", setPassportValid)} className="w-full p-2 border rounded mb-2" />
        {passportPhoto && <img src={passportPhoto} alt="Passport" className="h-24 mt-2" />} 
        {passportValid !== null && (passportValid ? "✅" : "❌ Photo is not clear")}
      </section>
        <p>Approximate Arrival Date</p>
        <input type="date" className="w-full p-2 border rounded mb-2" name="approximateArrivalDate" value={formData.approximateArrivalDate} onChange={handleChange}/>
        <p>Approximate Departure Date</p>
        <input type="date" className="w-full p-2 border rounded mb-2" name="approximateDepartureDate" value={formData.approximateDepartureDate} onChange={handleChange}/>
        <section>
        <h3 className="text-lg  mb-2">ID Card Photo (Clear Image)</h3>
        <input type="file"  name="idCardPhoto" onChange={(e) => handleFileUpload(e, "idCardPhoto", setIdCardValid)} className="w-full p-2 border rounded mb-2" />
        {idCardPhoto && <img src={idCardPhoto} alt="ID Card" className="h-24 mt-2" />} 
        {idCardValid !== null && (idCardValid ? "✅" : "❌ Photo is not clear")}
      </section>
      </section>
      <div className="text-center mt-6">
        <button className="bg-blue-500 hover:bg-orange-500 text-white px-4 py-2 rounded">
          Save and Proceed
        </button>
      </div>
      </form>
    
      
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
          src="/image/ali.jpeg"
          alt="Visa Applicant"
          className="w-[200px] h-[200px] rounded-full object-cover"
        />
      </motion.div>

      <div className="text-center">
        <p className="sm:text-2xl text-lg font-semibold font-serif">Mirza Ali</p>
        <p className="text-sm text-gray-500 mt-2">+923 264 214241</p>
        <p className="text-sm text-gray-500">+923 174 141149</p>
        <p className="text-sm text-gray-500">&#9993;  ubbrothersconsultant@gmail.com</p>
      </div>
    </div>
      <div className="my-4">
      <PaymentDetails/></div>
      <ContactInfo/>
    </div>
  );
}
