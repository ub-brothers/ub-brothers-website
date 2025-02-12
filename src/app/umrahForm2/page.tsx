"use client";

import { useState, useEffect } from "react";
import {client} from "@/sanity/lib/client"

const UmrahBookingForm2 = () => {
  const [visaStatus, setVisaStatus] = useState("yes");
  
  const [daysOptions, setDaysOptions] = useState<{ days: number; price: number }[]>([]);
  const [categories, setCategories] = useState<{ categoryName: string; price: number }[]>([]);
  const [selectedDays, setSelectedDays] = useState<number>(7);

  const [availableMakkahCategories, setAvailableMakkahCategories] = useState<string[]>([]);
  const [availableMadinaCategories, setAvailableMadinaCategories] = useState<string[]>([]);

  type Hotel = {
    hotelName: string;
    price: number;
    applicableCategories: string[];
  };
  const [makkahHotels, setMakkahHotels] = useState<Hotel[]>([]);
  const [madinaHotels, setMadinaHotels] = useState<Hotel[]>([]);
  const [selectedMakkahHotel, setSelectedMakkahHotel] = useState("");
  const [selectedMadinaHotel, setSelectedMadinaHotel] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [totalCost, setTotalCost] = useState<number>(0);


  // Makkah hotel selection logic
  const handleMakkahHotelChange = (hotelName: any) => {
    const selectedHotel = makkahHotels.find((hotel) => hotel.hotelName === hotelName);
    setSelectedMakkahHotel(hotelName);
    setAvailableMakkahCategories(selectedHotel ? selectedHotel.applicableCategories : []);
  };

  // Madina hotel selection logic
  const handleMadinaHotelChange = (hotelName : any) => {
    const selectedHotel = madinaHotels.find((hotel) => hotel.hotelName === hotelName);
    setSelectedMadinaHotel(hotelName);
    setAvailableMadinaCategories(selectedHotel ? selectedHotel.applicableCategories : []);
  };

  // 🔹 Fetch Data from Sanity on Page Load
  useEffect(() => {
    const fetchData = async () => {
      const makkahData = await client.fetch<{ hotelName: string; price: number,  applicableCategories: string[];}[]>(`*[_type == "makkahHotel"]{hotelName, price, applicableCategories[] }`);
      const madinaData = await client.fetch<{ hotelName: string; price: number , applicableCategories: string[];}[]>(`*[_type == "madinaHotel"]{hotelName, price, applicableCategories[] }`);


      const daysData = await client.fetch<{ days: number; price: number }[]>(`*[_type == "umrahDays"]{days, price}`);
      const categoriesData = await client.fetch<{ categoryName: string; price: number }[]>(`*[_type == "roomCategories"]{categoryName, price}`);

      setMakkahHotels(makkahData);
      setMadinaHotels(madinaData);

     
      setDaysOptions(daysData);
      setCategories(categoriesData);
    };

    fetchData();
  }, []);

  // 🔹 Calculate Cost Function
  const calculateCost = () => {
    const selectedMakkahHotelPrice = makkahHotels.find((h) => h.hotelName === selectedMakkahHotel)?.price || 0;
    const selectedMadinaHotelPrice = madinaHotels.find((h) => h.hotelName === selectedMadinaHotel)?.price || 0;
    const selectedDaysPrice = daysOptions.find((d) => d.days === selectedDays)?.price || 0;
    const selectedCategoryPrice = categories.find((c) => c.categoryName === selectedCategory)?.price || 0;

    const total = selectedDaysPrice + selectedMakkahHotelPrice + selectedCategoryPrice;
    setTotalCost(total);
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
    <div className="max-w-lg mx-auto p-8 bg-white shadow-xl rounded-2xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Umrah Package</h2>
      <p className="font-semibold">Full Name:</p>
      <input type="text" name="name" placeholder="Your name" className="w-full p-3 mb-5 border rounded-md" required></input>
      <p className="font-semibold">Phone Number:</p>
      <input type="text" name="phone" placeholder="Your phone number" className="w-full p-3 mb-5 border rounded-md" required ></input>

      <label className="font-semibold">Select Days</label>
      <select onChange={(e) => setSelectedDays(Number(e.target.value))} className="w-full p-3 mb-5 border rounded-md">
        {daysOptions.map((day) => (
          <option key={day.days} value={day.days}>{`${day.days} Days - $${day.price}`}</option>
        ))}
      </select>
      
{/* Makkah Hotel Dropdown */}
<label className="font-semibold">Makkah Hotel</label>
      <select onChange={(e) => handleMakkahHotelChange(e.target.value)} className="w-full p-3 mb-5 border rounded-md">
        <option value="">Select a Makkah hotel</option>
        {makkahHotels.map((hotel) => (
          <option key={hotel.hotelName} value={hotel.hotelName}>
            {hotel.hotelName} - ${hotel.price}
          </option>
        ))}
      </select>

 {/* Room Category for Makkah */}
 <label className="font-semibold">Makkah Room Category</label>
      <select disabled={availableMakkahCategories.length === 0} className="w-full p-3 mb-5 border rounded-md">
        {availableMakkahCategories.length > 0 ? (
          availableMakkahCategories.map((cat) => <option key={cat} value={cat}>{cat}</option>)
        ) : (
          <option value="">Not applicable</option>
        )}
      </select>


      {/* Madina Hotel Dropdown */}
      <label className="font-semibold">Madina Hotel</label>
      <select onChange={(e) => handleMadinaHotelChange(e.target.value)} className="w-full p-3 mb-5 border rounded-md">
        <option value="">Select a Madina hotel</option>
        {madinaHotels.map((hotel) => (
          <option key={hotel.hotelName} value={hotel.hotelName}>
            {hotel.hotelName} - ${hotel.price}
          </option>
        ))}
      </select>


         {/* Room Category for Madina */}
         <label className="font-semibold">Madina Room Category</label>
      <select disabled={availableMadinaCategories.length === 0} className="w-full p-3 mb-5 border rounded-md">
        {availableMadinaCategories.length > 0 ? (
          availableMadinaCategories.map((cat) => <option key={cat} value={cat}>{cat}</option>)
        ) : (
          <option value="">Not applicable</option>
        )}
      </select>
  

      {/* <label className="font-semibold">Room Category</label>
      <select onChange={(e) => setSelectedCategory(e.target.value)} className="w-full p-3 mb-5 border rounded-md">
        <option value="">Select a category</option>
        {categories.map((cat) => (
          <option key={cat.categoryName} value={cat.categoryName}>{cat.categoryName} - ${cat.price}</option>
        ))}
      </select> */}

      
      <label className="font-semibold">Do you have a visa?</label>
        <select onChange={(e) => setVisaStatus(e.target.value)} className="w-full p-3  mb-5 border rounded-md">
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        
        {visaStatus === "no" && (
          <div className=" bg-gray-100 p-4 rounded-md">
            <h3 className="font-bold">Fill out the form and apply for Visa!</h3>
            <p className="mb-4">The Visa cost: Rs. 41,000</p>
            <label className="font-semibold">Your Name</label>
            <input placeholder="Your Name" className="w-full p-3  mb-5 border rounded-md" />
            <label className="font-semibold">Your Number</label>
            <input placeholder="Your Number" type="tel" className="w-full p-3  mb-5 border rounded-md" />
            <label className="font-semibold">Personal Photo (White BG)</label>
            <input type="file" accept="image/*" className="w-full p-3 border mb-5 rounded-md" />
            <label className="font-semibold">Passport Scan Copy</label>
            <input type="file" accept="image/*" className="w-full p-3 mb-5 border rounded-md" />
            <label className="font-semibold">Nationality</label>
            <input placeholder="Nationality" className="w-full p-3 mb-5 border rounded-md" />
          </div>
        )}
        

      <button onClick={calculateCost} className="w-full bg-blue-500 hover:bg-orange-500 text-white p-3 rounded-md font-semibold">
        Calculate Cost
      </button>

      {totalCost > 0 && (
        <div className="mt-4 p-4 text-center bg-gray-200 rounded-md">
          <p className="font-bold text-lg">Total Cost: ${totalCost}</p>
        </div>
      )}
      <button className="w-full mt-2 bg-blue-500 hover:bg-orange-500 text-white p-3 rounded-md font-semibold">Submit</button>
    </div></div>
  );
};

export default UmrahBookingForm2;
