"use client";

import { useState } from "react";
import ContactInfo from "../contactDiv/page";
import PaymentDetails from "../payment/page";


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
    surname: "",
    fatherName: "",
    gender: "",
    formerNationality: "",
    placeOfIssue: "",
    placeOfBirth: "",
    dateOfBirth: "",
    maritalStatus: "",
    occupation: "",
    phone: "",
    email: "",
    zipCode: "",
    residenceAddress: "",
    passportNumber: "",
    passportType: "",
    dateOfIssue: "",
    dateOfExpiration: "",
    durationOfStay: "",
    entryType: "",
    approximateArrivalDate: "",
    approximateDepartureDate: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
    formDataToSend.append("visaType", formData.visaType);
    formDataToSend.append("nationality", formData.nationality);
    formDataToSend.append("firstName", formData.firstName);
    formDataToSend.append("surname", formData.surname);
    formDataToSend.append("fatherName", formData.fatherName);
    formDataToSend.append("gender", formData.gender);
    formDataToSend.append("formerNationality", formData.formerNationality);
    formDataToSend.append("placeOfBirth", formData.placeOfIssue);
    formDataToSend.append("placeOfBirth", formData.placeOfBirth);
    formDataToSend.append("dateOfBirth", formData.dateOfBirth);
    formDataToSend.append("maritalStatus", formData.maritalStatus);
    formDataToSend.append("occupation", formData.occupation);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("zipCode", formData.zipCode);
    formDataToSend.append("residenceAddress", formData.residenceAddress);
    formDataToSend.append("passportNumber", formData.passportNumber);
    formDataToSend.append("passportType", formData.passportType);
    formDataToSend.append("dateOfIssue", formData.dateOfIssue);
    formDataToSend.append("dateOfExpiration", formData.dateOfExpiration);
    formDataToSend.append("durationOfStay", formData.durationOfStay);
    formDataToSend.append("entryType", formData.entryType);
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
      console.log(pair[0] + ": " + pair[1]); // ✅ Dekhein values aa rahi hain ya nahi
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
    setPhoto(e.target.files[0]); // Sirf ek file store karega
  };

  const pakistanCitiesEmbassy = [
    // Karachi
    "Consulate General of Pakistan, Karachi",
    "Consulate General of China, Karachi",
    "Consulate General of Turkey, Karachi",
    "Consulate General of Iran, Karachi",
    "Consulate General of United Arab Emirates, Karachi",
    "Consulate General of Saudi Arabia, Karachi",
  
    // Lahore
    "Consulate General of Pakistan, Lahore",
    "Consulate General of China, Lahore",
    "Consulate General of Turkey, Lahore",
    "Consulate General of Iran, Lahore",
    "Consulate General of United Arab Emirates, Lahore",
    "Consulate General of Saudi Arabia, Lahore",
  
    // Islamabad
    "High Commission of Pakistan, Islamabad",
    "High Commission of India, Islamabad",
    "Embassy of China, Islamabad",
    "Embassy of United States, Islamabad",
    "Embassy of United Kingdom, Islamabad",
    "Embassy of Canada, Islamabad",
  
    // Quetta
    "Consulate of Pakistan, Quetta",
    "Consulate General of Iran, Quetta",
    "Consulate General of Afghanistan, Quetta",
  
    // Peshawar
    "Consulate of Pakistan, Peshawar",
    "Consulate General of Afghanistan, Peshawar",
    "Consulate General of Iran, Peshawar",
  
    // Faisalabad
    "Consulate General of Pakistan, Faisalabad",
    "Consulate General of China, Faisalabad",
  
    // Multan
    "Consulate General of Pakistan, Multan",
    "Consulate General of Iran, Multan",
  
    // Sialkot
    "Consulate General of Pakistan, Sialkot",
    "Consulate General of China, Sialkot",
  
    // Hyderabad
    "Consulate of Pakistan, Hyderabad",
    "Consulate General of Iran, Hyderabad",
  
    // Sukkur
    "Consulate of Pakistan, Sukkur",
    "Consulate General of Iran, Sukkur",
  ];

  const countries = [
    'Afghanistan',
    'Armenia',
    'Azerbaijan',
    'Bahrain',
    'Bangladesh',
    'Bhutan',
    'Brunei',
    'Cambodia',
    'China',
    'Cyprus',
    'East Timor',
    'Georgia',
    'India',
    'Indonesia',
    'Iran',
    'Iraq',
    'Israel',
    'Japan',
    'Jordan',
    'Kazakhstan',
    'North Korea',
    'South Korea',
    'Kuwait',
    'Kyrgyzstan',
    'Laos',
    'Lebanon',
    'Malaysia',
    'Maldives',
    'Mongolia',
    'Myanmar',
    'Nepal',
    'Oman',
    'Pakistan',
    'Palestine',
    'Philippines',
    'Qatar',
    'Russia',
    'Saudi Arabia',
    'Singapore',
    'Sri Lanka',
    'Syria',
    'Taiwan',
    'Tajikistan',
    'Thailand',
    'Turkey',
    'Turkmenistan',
    'United Arab Emirates',
    'Uzbekistan',
    'Vietnam',
    'Yemen',
  ];

  const passType = ["Ordinary Passport", 
   "Diplomatic Passport",
   "Official Passport" ,
   "Emergency Passport" ];

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
          console.error("Canvas context is null"); // ✅ Null check for context
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
  
          // Brightness Calculation
          const brightness = (r + g + b) / 3;
          totalBrightness += brightness;
  
          // Check if pixel is near white
          if (r > 230 && g > 230 && b > 230) {
            whitePixelCount++;
          }
        }
  
        const avgBrightness = totalBrightness / pixelCount;
        const whitePercentage = (whitePixelCount / pixelCount) * 100;
  
        const isImageClear = avgBrightness > 40;
        const isWhiteBg = whitePercentage > 20;
  
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
        // ✅ Image ko formData me store karna
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
    Secure & Smooth Visa Processing Starts Here
    </h2>
  </div>
  </div>


    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md  space-y-6">
      <form onSubmit={handleSubmit}>
      <h2 className="text-3xl font-bold text-center mb-6">Visa Application</h2>
      
      <section>
        <h3 className="text-xl font-semibold text-blue-800 mb-2"><u>Visa Information</u></h3>
        <p>Visa Type</p>
        <select className="w-full p-2 border rounded mb-2" name="visaType" value={formData.visaType} onChange={handleChange}  >
          <option>Select Visa Type</option>
          <option>Tourist</option>
          <option>Business</option>
          <option>Student</option>
          <option>Work</option>
          <option>Transit</option>
          <option>Medical</option>
        </select>
        <p>Nationality</p>
        <select className="w-full p-2 border rounded mb-2" name="nationality" value={formData.nationality} onChange={handleChange} >
          {countries.map((country,index)=>(<option key={index} value={country}>{country}</option>))}
          
        </select>
        <p>Type of Passport</p>
        <select className="w-full p-2 border rounded mb-2" name="passportType" value={formData.passportType} onChange={handleChange} >
        {passType.map(( type, index)=>(<option key={index} value={type}>{type}</option>))}
        </select>
        <p>Place of Issue</p>
        <select className="w-full p-2 border rounded mb-2" name="placeOfIssue" value={formData.placeOfIssue} onChange={handleChange} >
          {pakistanCitiesEmbassy.map((embassy, index)=>( <option key={index} value={embassy}>{embassy}</option>))}
        </select>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-blue-800 mb-2 mt-10"><u>Personal Information</u></h3>
        <p>First Name</p>
        <input type="text" placeholder="Enter First Name" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
        <p>Surname</p>
        <input type="text" placeholder="Enter Surname" name="surname" value={formData.surname} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
        <p>Father’s Name</p>
        <input type="text" placeholder="Enter Father’s Name" name="fatherName" value={formData.fatherName} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
        <p>Gender</p>
        <select className="w-full p-2 border rounded mb-2" name="gender" value={formData.gender} onChange={handleChange}>
          <option>Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        <p>Former Nationality</p>
        <input type="text" placeholder="Enter Former Nationality" name="formerNationality" value={formData.formerNationality} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
        <p>Place of Birth</p>
        <input type="text" placeholder="Enter Place of Birth" name="placeOfBirth" value={formData.placeOfBirth} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
        <p>Date of Birth</p>
        <input type="date" className="w-full p-2 border rounded mb-2" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
        <p>Marital Status</p>
        <select className="w-full p-2 border rounded mb-2" name="maritalStatus" value={formData.maritalStatus} onChange={handleChange}>
          <option>Select Status</option>
          <option>Single</option>
          <option>Married</option>
        </select>
        <p>Occupation</p>
        <input type="text" placeholder="Enter Occupation" name="occupation" value={formData.occupation} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
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
        <p>Zip Code</p>
        <input type="text" placeholder="Enter Zip Code" name="zipCode" value={formData.zipCode} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
        <p>Residence Address</p>
        <input type="text" placeholder="Enter Address" name="residenceAddress" value={formData.residenceAddress}  onChange={handleChange} className="w-full p-2 border rounded mb-2" />
      </section>

      <section>
        <h3 className="text-xl font-semibold text-blue-800 mb-2 mt-10"><u>Passport Information</u></h3>
        <p>Passport Number</p>
        <input type="text" placeholder="Enter Passport Number" name="passportNumber" value={formData.passportNumber} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
        <p>Type of Passport</p>
        <select className="w-full p-2 border rounded mb-2" value={formData.passportType}  onChange={handleChange}>
          {passType.map(( type , index)=>(<option key={index} value={type}>{type}</option>))}
          
        </select>
        <p>Date of Issue</p>
        <input type="date" className="w-full p-2 border rounded mb-2" name="dateOfIssue" value={formData.dateOfIssue} onChange={handleChange}/>
        <p>Date of Expiration</p>
        <input type="date" className="w-full p-2 border rounded mb-2" name="dateOfExpiration" value={formData.dateOfExpiration} onChange={handleChange}/>
        <section>
        <h3 className="text-lg mb-2">Passport Photo (Clear Image)</h3>
        <input type="file"  name="passportPhoto" onChange={(e) => handleFileUpload(e, "passportPhoto", setPassportValid)} className="w-full p-2 border rounded mb-2" />
        {passportPhoto && <img src={passportPhoto} alt="Passport" className="h-24 mt-2" />} 
        {passportValid !== null && (passportValid ? "✅" : "❌ Photo is not clear")}
      </section>
        <p>Duration of Stay</p>
        <input type="text" placeholder="Enter Duration" name="durationOfStay" value={formData.durationOfStay}  onChange={handleChange} className="w-full p-2 border rounded mb-2" />
        <p>Type of Entry</p>
        <select className="w-full p-2 border rounded mb-2" name="entryType" value={formData.entryType}  onChange={handleChange}>
          <option>Once</option>
          <option>Double</option>
        </select>
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
      <ContactInfo/>
      <PaymentDetails/>
    </div></div>
  );
}
