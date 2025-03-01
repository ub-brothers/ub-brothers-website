"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Suspense } from "react";

function TicketsContent(){

  const handleConfirmBooking = async () => {
    try {

        // `passengers` array ke har object me `type` add karna
        const updatedPassengers = passengers.map((passenger, index) => ({
          ...passenger,
          type: index < adults ? "Adult" : "Infant", // Adult ya Infant set karna
        }));


      const response = await fetch("/api/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          airlineName,
          meal,
          price,
          adults,
          infants,
          passengers: updatedPassengers,
          flights,
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


  const searchParams = useSearchParams();
 // Function to format date
 const formatDate = (dateString:any) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}; 
  const airlineName = searchParams.get("airlineName");
  const airlineImage = decodeURIComponent(searchParams.get("airline") || ""); 
  const meal = searchParams.get("meal");
  const priceParam = searchParams.get("price");
  
  const seatParam = searchParams.get("seats"); // Query se seat count fetch karo
  const availableSeats = seatParam ? Number(seatParam) : 0; 
  const [adults, setAdults] = useState(0);
  const [infants, setInfants] = useState(0);
 
  const [passengers, setPassengers] = useState<{ type: string; id: number; surname: string; name: string; passportNumber: string; dob: string; passportExpiry: string; nationality: string }[]>([]);
 
  const [error, setError] = useState("");
  

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
    const totalPassengers = adults + infants;
    const newPassengerData = Array.from({ length: totalPassengers }, (_, index) => (
      passengers[index] || { surname: "", name: "", passportNumber: "", dob: "", passportExpiry: "", nationality: "" }
    ));
    setPassengers(newPassengerData);
  }, [adults, infants, availableSeats]);


// Extract only numeric values from the price string
const extractedPrice = priceParam ? priceParam.match(/[\d,]+(\.\d+)?/) : null;

// Remove commas and convert to number
const price = extractedPrice ? Number(extractedPrice[0].replace(/,/g, "")) : 0;


 
  const totalSeats = adults + infants;
  const totalPrice = adults * price;

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
      <div className="w-32">Child</div>
      <div className="w-32">Infant</div>
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
      <div className="w-32 text-sm">{idx === 0 ? priceParam : ""}</div>
      <div className="w-32 text-sm">N/A</div>
      <div className="w-32 text-sm text-red-600 font-semibold">Price on call.</div>
      </div>
    ))}
  </div>
</div>

<hr/>
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
                    setError(""); // Agar value sahi hai to error hata do
                  } else {
                    setError(`Only ${availableSeats} seats available for adults.`); // Error show karo
                  }
                }} className="w-16 border p-1" />

{error && <p className="text-red-500 mt-2">{error}</p>}

              </td>
              <td className="px-4 py-2 border text-sm">{price}</td>
              <td className="px-4 py-2 border text-sm">{totalPrice}</td>
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
 {(adults > 0 || infants > 0) && (
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
          {passengers.map((passenger, index) =>{
             const type = index < adults ? `Adult ${index + 1}` : `Infant ${index - adults + 1}`;  
            return (
            <tr key={index} className="border-t text-sm">
              <td className="px-4 py-2 border">{type}</td>
              <td className="px-4 py-2 border"><input type="text" name="surname" value={passenger.surname} onChange={(e) => handlePassengerChange(index, "surname", e.target.value)} className="w-full bg-gray-200 border p-1" /></td>
              <td className="px-4 py-2 border"><input type="text" name="passenger" value={passenger.name} onChange={(e) => handlePassengerChange(index, "name", e.target.value)} className="w-full  bg-gray-200 border p-1" /></td>
              <td className="px-4 py-2 border"><input type="text" name="passportNumber" value={passenger.passportNumber} onChange={(e) => handlePassengerChange(index, "passportNumber", e.target.value)} className="w-full bg-gray-200  border p-1" /></td>
              <td className="px-4 py-2 border"><input type="date" name="dob" value={passenger.dob} onChange={(e) => handlePassengerChange(index, "dob", e.target.value)} className="w-full bg-gray-200  border p-1" /></td>
              <td className="px-4 py-2 border"><input type="date" name="passportExpiry" value={passenger.passportExpiry} onChange={(e) => handlePassengerChange(index, "passportExpiry", e.target.value)} className="w-full bg-gray-200  border p-1" /></td>
              <td className="px-4 py-2 border"><input type="text" name="nationality" value={passenger.nationality} onChange={(e) => handlePassengerChange(index, "nationality", e.target.value)} className="w-full bg-gray-200  border p-1" /></td>
            </tr>
          );
        }
          
          )}
        </tbody>
        <div className="text-center">
      <button onClick={handleConfirmBooking}  className="w-[200px] bg-blue-500 hover:bg-orange-500 rounded-lg mx-4 mt-10 mb-4 h-10 text-white font-bold">Confirm Booking</button>
</div>
      </table>
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
