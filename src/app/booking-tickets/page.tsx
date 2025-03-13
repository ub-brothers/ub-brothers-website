"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Suspense } from "react";
import jsPDF from "jspdf";
import { jwtDecode } from 'jwt-decode';
import {client} from "@/sanity/lib/client"
import { v4 as uuidv4 } from "uuid"; 

function TicketsContent(){
  const [isConfirmed, setIsConfirmed] = useState(false);
const searchParams = useSearchParams();
 const [isApprovedUser, setIsApprovedUser] = useState(false);
 const [phoneNumber, setPhoneNumber] = useState("");
const [emailAddress, setEmailAddress] = useState("");

  const handleConfirmBooking = async () => {
    setIsConfirmed(true);
   

    try {

        // `passengers` array ke har object me `type` add karna
        const updatedPassengers = passengers.map((passenger, index) => {
          if (index < adults) {
            return { ...passenger, type: "Adult" };
          } else if (index < adults + children) {
            return { ...passenger, type: "Child" };
          } else {
            return { ...passenger, type: "Infant" };
          }
        
        }
        
      );

        const storedEmail = localStorage.getItem("userEmail");
        
    


      const response = await fetch("/api/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          airlineName,
          airlineImage,
          meal,
          totalPrice,
          adults,
          infants,
          children,
          passengers: updatedPassengers,
          flights,
          phoneNumber,
          emailAddress,
          storedUserEmail: storedEmail,
        }),
      });
  
      
      const result = await response.json();
      if (response.ok) {
        alert("Booking confirmed!");
      } else {
        alert("Failed: " + result.error);
      }
    } catch (error) {
      console.error("Error booking flight:", error);
      alert("Something went wrong!");
    }
  };




const handleDownloadPDF = () => {
  if (isConfirmed) {

    const doc = new jsPDF();

    const companyLogo = "/image/logo.png";
    const airlineImageUrl = airlineImage; 
    
    
    doc.addImage(companyLogo, "PNG", 10, 10, 30, 30); 

    const pageWidth = doc.internal.pageSize.getWidth();
    const imageWidth = 50;
    const imageHeight = 30; 
    const imageX = pageWidth - imageWidth - 10;
    doc.addImage(airlineImageUrl, "PNG", imageX, 10, imageWidth, imageHeight);


    
    doc.setFont("helvetica", "bold"); 
    doc.setFontSize(18);
    doc.text("UB Brothers Travel & Tours", 45, 20); 
    
   
    doc.setFont("helvetica", "normal"); 
    doc.setFontSize(12);
    doc.text("Flight Booking Details", 45, 30); 


    doc.setFillColor(230, 230, 230);
    doc.rect(10, 45, 190, 10, "F"); 
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("Booking Details", 15, 52);

    let y = 60;



    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 120);
    doc.text(`Airline: ${airlineName}`, 10, y + 7); 
    y += 15; 
    
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 120);
    doc.text("Flight Details", 10, y);
    y += 10; 
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    doc.text(`Total Price (Adults): ${totalPrice}`, 10, y);
    
    y += 12;
    
   
doc.setFillColor(200, 220, 255);
doc.rect(10, y, 190, 8, "F"); 
doc.setFontSize(10);
doc.setFont("helvetica", "bold");
doc.setTextColor(0, 0, 0);
doc.text("Date", 12, y + 5);
doc.text("Flight No", 55, y + 5);
doc.text("Route", 80, y + 5); 
doc.text("Time", 115, y + 5); 
doc.text("Baggage", 145, y + 5); 
doc.text("Meal", 175, y + 5); 
y += 12; 

doc.setFont("helvetica", "normal");
flights.forEach((flight, idx) => {
  doc.text(`${flight.depOrReturn} - ${formatDate(flight.date)}`, 12, y);
  doc.text(flight.flightNumber || "", 55, y); 
  doc.text(flight.originDestination || "", 80, y); 
  doc.text(flight.time || "", 115, y); 
  doc.text(flight.baggage || "", 145, y); 
  doc.text(idx === 0 ? meal ?? "" : "", 175, y);
 
  y += 8; 
});

y += 10; 
   

    
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 120);
    doc.text("Passenger Details", 10, y);
    y += 10; 

    passengers.forEach((passenger, index) => {
      const type =
        index < adults
          ? `Adult ${index + 1}`
          : index < adults + children
          ? `Child ${index - adults + 1}`
          : `Infant ${index - adults - children + 1}`;

      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(40, 40, 40);
      doc.text(`Passenger ${index + 1} (${type})`, 10, y);
      y += 7;

      doc.setFont("helvetica", "normal");
      doc.setTextColor(0, 0, 0);
      doc.text(`Name: ${passenger.name} ${passenger.surname}`, 10, y);
      y += 7;
      doc.text(`Passport Number: ${passenger.passportNumber}`, 10, y);
      y += 7;
      doc.text(`DOB: ${passenger.dob}`, 10, y);
      y += 7;
      doc.text(`Passport Expiry: ${passenger.passportExpiry}`, 10, y);
      y += 7;
      doc.text(`Nationality: ${passenger.nationality}`, 10, y);
      y += 10;
    });

    doc.save("booking-details.pdf");
  }
};

  
  

 const formatDate = (dateString:any) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}; 
  const airlineName = searchParams.get("airlineName");

  const airlineImage = decodeURIComponent(searchParams.get("airline") || ""); 
  const meal = searchParams.get("meal");
  const priceParam = searchParams.get("price");
  const priceForUsersParams = searchParams.get("priceForUsers");
  

  const seatParam = searchParams.get("seats");
  const childSeatParam = searchParams.get("childSeats");
  const [children, setChildren] = useState<number>(0); 
  const availableChildSeats = seatParam ? Number(childSeatParam) : 0;


  
  const availableSeats = seatParam ? Number(seatParam) : 0; 
  const [adults, setAdults] = useState(0);
  const [infants, setInfants] = useState(0);
 
  const [passengers, setPassengers] = useState<{ type: string; id: number; surname: string; name: string; passportNumber: string; dob: string; passportExpiry: string; nationality: string }[]>([]);
 
  const [adultError, setAdultError] = useState("");
  const [childrenError, setChildrenError] = useState("");
  

  const handlePassengerChange = (index: number, field: string, value: string) => {
    setPassengers((prevPassengers) =>
      prevPassengers.map((passenger, i) =>
        i === index ? { ...passenger, [field]: value } : passenger
      )
    );
  };
  
  const updatePassengerList = () => {
    const totalPassengers = adults + infants;
    const newPassengerData = Array.from({ length: totalPassengers }, (_, index) => (
      passengers[index] || { surname: "", name: "", passportNumber: "", dob: "", passportExpiry: "", nationality: "" }
    ));
    setPassengers(newPassengerData);
  };

  // Validate seats
  const isSeatAvailable = adults <= availableSeats;
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



    const totalPassengers = adults + children + infants; // 👈 Children ko bhi include kar diya
    const newPassengerData = Array.from({ length: totalPassengers }, (_, index) => (
      passengers[index] || { surname: "", name: "", passportNumber: "", dob: "", passportExpiry: "", nationality: "" }
    ));
    setPassengers(newPassengerData);
}, [adults, children, infants, availableSeats]); 


const extractedUserPrice = priceForUsersParams ? priceForUsersParams.match(/[\d,]+(\.\d+)?/) : null;
const priceForUsers = extractedUserPrice ? Number(extractedUserPrice[0].replace(/,/g, "")): 0;


const extractedPrice = priceParam ? priceParam.match(/[\d,]+(\.\d+)?/) : null;

// Remove commas and convert to number
const price = extractedPrice ? Number(extractedPrice[0].replace(/,/g, "")) : 0;


 
  const totalSeats = adults + infants;
  const totalPrice = adults * (isApprovedUser ? Number(priceForUsers) : Number(price));

  // Fetching multiple flights
  const flights: { 
    date: string | null; 
    flightNumber: string | null; 
    originDestination: string | null; 
    time: string | null; 
    baggage: string | null; 
    depOrReturn: string | null;
    
  }[] = [];
  let index = 0;
  while (searchParams.get(`date${index}`)) {
    flights.push({
      date: searchParams.get(`date${index}`),
      flightNumber: searchParams.get(`flightNumber${index}`),
      originDestination: searchParams.get(`originDestination${index}`),
      time: searchParams.get(`time${index}`),
      baggage: searchParams.get(`baggage${index}`),
      depOrReturn: searchParams.get(`depOrReturn${index}`),
      
    });
    index++;
  }


  

  return (

    <div className="w-full overflow-x-auto p-6 bg-white shadow-lg rounded-lg mt-2">

      <h2 className="text-lg font-bold  text-left"><u>Flight Details</u></h2>
      
      {/* Airline Image & Name */}
      
      <div className="flex items-center space-x-4 mt-4">
        {airlineImage && (
          <img
            src={airlineImage}
            className="h-14 w-auto object-contain border rounded-md shadow"
          />
        )}
        <h3 className="text-md ">Airline: <b>{airlineName}</b></h3>
      </div>
      <div className="overflow-x-auto min-w-[1200px]">
  <div className="p-4">
    {/* Headings */}
    <div className="flex gap-6 font-bold text-gray-700">
      <div className="w-48">Date</div>
      <div className="w-32">Flight No</div>
      <div className="w-32">Route</div>
      <div className="w-32">Time</div>
      <div className="w-32">Baggage</div>
      <div className="w-32">Meal</div>
      <div className="w-32">Price</div>
      
      
    </div>

    {/* Values */}
    {flights.map((flight, idx) => (
      <div key={idx} className="flex gap-6 mt-1">
        <div className="w-48 text-sm">{flight.depOrReturn} - {formatDate(flight.date)}</div>
        <div className="w-32 text-sm">{flight.flightNumber}</div>
        <div className="w-32 text-sm">{flight.originDestination}</div>
        <div className="w-32 text-sm">{flight.time}</div>
        <div className="w-32 text-sm">{flight.baggage}</div>
         <div className="w-32 text-sm">{idx === 0 ? meal: ""}</div>
      <div className="w-32 text-sm">{idx === 0 ? (isApprovedUser ? priceForUsers || "No price found" : priceParam) : ""}</div>
      
      </div>
    ))}
  </div>
</div>

<hr/>


<div className="flex gap-10 my-10">
  <div>
  <p className="font-bold mb-2">Phone Number:</p>
  <input value={phoneNumber}
      onChange={(e) => setPhoneNumber(e.target.value)} name="phone" placeholder="Enter your phone number" type="text" className="border p-2 text-black rounded w-full" required></input></div>
  <div>
  <p className="font-bold mb-2">Email Address:</p>
  <input   value={emailAddress}
      onChange={(e) => setEmailAddress(e.target.value)} name="email" type="email" placeholder="Enter your email address" className="border p-2 text-black rounded w-full" required></input></div>
</div>
<h2 className="text-lg font-bold mt-6 mb-2 "><u>Passenger Details</u></h2>
      <div className=" rounded-xl bg-gray-100 shadow-lg">
        
        
        <table className="w-full border  border-gray-300 overflow-x-auto min-w-[700px] ">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="px-4 py-2 border  text-sm">Passengers</th>
              <th className="px-4 py-2 border text-sm">Count</th>
              <th className="px-4 py-2 border text-sm">Price per Person</th>
              <th className="px-4 py-2 border text-sm">Total Price</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-4 py-2 border text-sm">Adults</td>
              <td className="px-4 py-2 border text-sm">
                <input type="number" value={adults}
                 onChange={(e) =>   {
                  const value = Number(e.target.value);
                  if (value <= availableSeats) {
                    setAdults(Math.max(0, value));
                    setAdultError(""); // Agar value sahi hai to error hata do
                  } else {
                    setAdultError(`Only ${availableSeats} seats available for adults.`); // Error show karo
                  }
                }} className="w-16 border p-1" />

{adultError && <p className="text-red-500 mt-2">{adultError}</p>}</td>


              
              <td className="px-4 py-2 border text-sm">{isApprovedUser ? priceForUsers  : price}</td>
              <td className="px-4 py-2 border text-sm">{totalPrice}</td> </tr>


              <tr className="border-t">
    <td className="px-4 py-2 border text-sm">Child</td>
    <td className="px-4 py-2 border text-sm">
        <input type="number" value={children}
            onChange={(e) => {
                const value = Number(e.target.value);
                if (value <= availableChildSeats) {
                    setChildren(Math.max(0, value)); // Minimum 0 ho
                    setChildrenError(""); // Agar value sahi hai to error hatao
                } else {
                    setChildrenError(`Only ${availableChildSeats} seats available for child.`); // Error show karo
                }
            }}
            className="w-16 border p-1"
        />
        {childrenError && <p className="text-red-500 mt-2">{childrenError}</p>}
    </td>
    <td className="px-4 py-2 border font-semibold text-sm text-red-700">Price on call</td>
    <td className="px-4 py-2 border font-semibold text-sm text-red-700">Price on call</td>
</tr>

           
            <tr className="border-t">  
              <td className="px-4 py-2 border text-sm">Infants</td>
              <td className="px-4 py-2 border text-sm">
                <input type="number" value={infants}
                  onChange={(e) => setInfants(Math.max(0, Number(e.target.value)))} className="w-16 border p-1" />
              </td>
              <td className="px-4 py-2 border font-semibold text-sm text-red-700">Price on call</td>
              <td className="px-4 py-2 border font-semibold text-sm text-red-700">Price on call</td>
            </tr>
          </tbody>
        </table>
        {adults > availableSeats && (
  <p className="text-red-500 mt-2">Only {availableSeats} seats available for adults.</p>
)}
      
      </div>


 {/* Dynamic Passenger Forms */}
 {(adults > 0 || children > 0 || infants > 0) && (
 <div className="mt-6 overflow-x-auto min-w-[1200px]">
 
      <table className="w-full border border-gray-300 mt-4">
        <thead>
          <tr className="bg-gray-700 text-white">
            <th className="px-4 py-2 border w-[100px] text-sm"># </th>
            <th className="px-4 py-2 border text-sm">Surname</th>
            <th className="px-4 py-2 border text-sm">Name</th>
            <th className="px-4 py-2 border text-sm">Passport No.</th>
            <th className="px-4 py-2 border text-sm">DOB</th>
            <th className="px-4 py-2 border text-sm">Passport Expiry</th>
            <th className="px-4 py-2 border text-sm">Nationality</th>
          </tr>
        </thead>
        <tbody>
          
  {passengers.map((passenger, index) => {
     const type = index < adults 
     ? `Adult ${index + 1}` 
     : index < adults + children 
       ? `Child ${index - adults + 1}` 
       : `Infant ${index - adults - children + 1}`;
    
    return (
      <tr key={index} className="border-t text-sm">
        <td className="px-4 py-2 border">{type}</td>
        <td className="px-4 py-2 border">
          <input
            type="text"
            name="surname"
            value={passenger.surname}
            onChange={(e) => handlePassengerChange(index, "surname", e.target.value)}
            className="w-full bg-gray-200 border p-1"
          />
        </td>
        <td className="px-4 py-2 border">
          <input
            type="text"
            name="passenger"
            value={passenger.name}
            onChange={(e) => handlePassengerChange(index, "name", e.target.value)}
            className="w-full bg-gray-200 border p-1"
          />
        </td>
        <td className="px-4 py-2 border">
          <input
            type="text"
            name="passportNumber"
            value={passenger.passportNumber}
            onChange={(e) => handlePassengerChange(index, "passportNumber", e.target.value)}
            className="w-full bg-gray-200 border p-1"
          />
        </td>
        <td className="px-4 py-2 border">
          <input
            type="date"
            name="dob"
            value={passenger.dob}
            onChange={(e) => handlePassengerChange(index, "dob", e.target.value)}
            className="w-full bg-gray-200 border p-1"
          />
        </td>
        <td className="px-4 py-2 border">
          <input
            type="date"
            name="passportExpiry"
            value={passenger.passportExpiry}
            onChange={(e) => handlePassengerChange(index, "passportExpiry", e.target.value)}
            className="w-full bg-gray-200 border p-1"
          />
        </td>
        <td className="px-4 py-2 border">
          <input
            type="text"
            name="nationality"
            value={passenger.nationality}
            onChange={(e) => handlePassengerChange(index, "nationality", e.target.value)}
            className="w-full bg-gray-200 border p-1"
          />
        </td>
      </tr>
    );
  })}
</tbody>

     
      </table>
         <div className="text-center flex">
      <button onClick={handleConfirmBooking}  className="w-[200px] bg-blue-500 hover:bg-orange-500 rounded-lg mx-4 mt-10 mb-4 h-10 text-white font-bold">Confirm Booking</button>
      {isConfirmed && (
        <button
          onClick={handleDownloadPDF}
          className="w-[250px] bg-green-500 hover:bg-green-600 rounded-lg mx-4 mt-10 mb-4 h-10 text-white font-bold"
        >
          Download ticket info (PDF)
        </button>
      )}
</div>
      </div>)}


    </div>
  );

}

const BookNow = () => {
return(
  <div>
    <Suspense fallback={<p className="text-center text-gray-600">Loading...</p>}>
          <TicketsContent/>
        </Suspense>
  </div>
)
  
};

export default BookNow;
