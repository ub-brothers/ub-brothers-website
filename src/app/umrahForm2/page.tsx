"use client";

import { useState, useEffect } from "react";
import {client} from "@/sanity/lib/client"
import Hotels from "../hotelUi/page";

const UmrahBookingForm2 = () => {
  const [visaStatus, setVisaStatus] = useState("yes");
  
  const [daysOptions, setDaysOptions] = useState<{ days: number; price: number }[]>([]);
  const [categories, setCategories] = useState<{ categoryName: string; price: number }[]>([]);
  const [selectedDays, setSelectedDays] = useState<number>(7);

  const [availableMakkahCategories, setAvailableMakkahCategories] = useState< { categoryName: string; price: number }[]>([]);
  const [availableMadinaCategories, setAvailableMadinaCategories] = useState< { categoryName: string; price: number }[]>([]);

  type Hotel = {
    hotelName: string;
    price: number;
    applicableCategories: { categoryName: string; price: number }[];
  };
  const [makkahHotels, setMakkahHotels] = useState<Hotel[]>([]);
  const [madinaHotels, setMadinaHotels] = useState<Hotel[]>([]);
  const [selectedMakkahHotel, setSelectedMakkahHotel] = useState("");
  const [selectedMadinaHotel, setSelectedMadinaHotel] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [totalCost, setTotalCost] = useState<number>(0);


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
  
  

  // 🔹 Fetch Data from Sanity on Page Load
  useEffect(() => {
    const fetchData = async () => {
      const makkahData = await client.fetch<{ hotelName: string; price: number, applicableCategories: { categoryName: string; price: number }[] }[]>(`*[_type == "makkahHotel"]{hotelName, price, applicableCategories[]{ categoryName, price } }`);
      const madinaData = await client.fetch<{ hotelName: string; price: number , applicableCategories: { categoryName: string; price: number }[] }[]>(`*[_type == "madinaHotel"]{hotelName, price, applicableCategories[]{ categoryName, price } }`);


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
    const selectedMakkahHotelObj = makkahHotels.find((h) => h.hotelName === selectedMakkahHotel);
    const selectedMadinaHotelObj = madinaHotels.find((h) => h.hotelName === selectedMadinaHotel);
  
    console.log("Makkah Hotel Data:", selectedMakkahHotelObj);
    console.log("Madina Hotel Data:", selectedMadinaHotelObj);
  
    // Makkah category price extract
    const selectedMakkahCategoryObj = selectedMakkahHotelObj?.applicableCategories.find(
      (c) => c.categoryName === selectedCategory
    );
    const selectedMakkahCategoryPrice = selectedMakkahCategoryObj ? selectedMakkahCategoryObj.price : 0;
  
    // Madina category price extract
    const selectedMadinaCategoryObj = selectedMadinaHotelObj?.applicableCategories.find(
      (c) => c.categoryName === selectedCategory
    );
    const selectedMadinaCategoryPrice = selectedMadinaCategoryObj ? selectedMadinaCategoryObj.price : 0;
  
    // Days price extract
    const selectedDaysPrice = daysOptions.find((d) => d.days === selectedDays)?.price || 0;
  
    // Total calculation
    const total = selectedDaysPrice + selectedMakkahCategoryPrice + selectedMadinaCategoryPrice;
    setTotalCost(total);
  
    console.log("Selected Makkah Category Price:", selectedMakkahCategoryPrice);
    console.log("Selected Madina Category Price:", selectedMadinaCategoryPrice);
    console.log("Total Cost:", total);
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
    <div className="mx-  p-8 bg-gray-100 shadow-xl rounded-2xl">
      <h2 className="text-2xl font-bold mb-6 text-center font-serif">Umrah Package</h2>
      <p className="font-semibold">Full Name:</p>
      <input type="text" name="name" placeholder="Your name" className="w-full p-3 mb-5 border rounded-md" required></input>
      <p className="font-semibold">Phone Number:</p>
      <input type="text" name="phone" placeholder="Your phone number" className="w-full p-3 mb-5 border rounded-md" required ></input>

      <label className="font-semibold">Select Days</label>
      <select onChange={(e) => setSelectedDays(Number(e.target.value))} className="w-full p-3 mb-5 border rounded-md">
        {daysOptions.map((day) => (
          <option key={day.days} value={day.days}>{`${day.days} Days - ${day.price} PKR/-`}</option>
        ))}
      </select>
      
{/* Makkah Hotel Dropdown */}
<label className="font-semibold">Makkah Hotel</label>
      <select onChange={(e) => handleMakkahHotelChange(e.target.value)} className="w-full p-3 mb-5 border rounded-md">
        <option value="">Select a Makkah hotel</option>
        {makkahHotels.map((hotel) => (
          <option key={hotel.hotelName} value={hotel.hotelName}>
            {hotel.hotelName}
          </option>
        ))}
      </select>

 {/* Room Category for Makkah */}
 <label className="font-semibold">Makkah Room Category</label>
 <select 
  disabled={availableMakkahCategories.length === 0} 
  onChange={(e) => setSelectedCategory(e.target.value)}
  className="w-full p-3 mb-5 border rounded-md"
>
{availableMakkahCategories.length > 0 ? (
    availableMakkahCategories.map((catObj) => (
      <option key={catObj.categoryName} value={catObj.categoryName}>
        {catObj.categoryName} - {catObj.price} PKR/-
      </option>
    ))
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
            {hotel.hotelName}
          </option>
        ))}
      </select>


         {/* Room Category for Madina */}
         <label className="font-semibold">Madina Room Category</label>
         <select 
  disabled={availableMadinaCategories.length === 0} 
  onChange={(e) => setSelectedCategory(e.target.value)}
  className="w-full p-3 mb-5 border rounded-md"
>
{availableMadinaCategories.length > 0 ? (
    availableMadinaCategories.map((catObj) => (
      <option key={catObj.categoryName} value={catObj.categoryName}>
        {catObj.categoryName} - {catObj.price} PKR/-
      </option>
    ))
  ) : (
    <option value="">Not applicable</option>
  )}
</select>

  
      
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
          <p className="font-bold text-lg">Total Cost: {totalCost} PKR/-</p>
        </div>
      )}
      <button className="w-full mt-2 bg-blue-500 hover:bg-orange-500 text-white p-3 rounded-md font-semibold">Submit</button>
    </div>
    <Hotels/>
    </div>
  );
};

export default UmrahBookingForm2;
