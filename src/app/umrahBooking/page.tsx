"use client";

import { useEffect, useState } from "react";

interface UmrahBooking {
  _id: string;
  name: string;
  days:number;
  makkahHotel:string;
  makkahDay:number;
  makkahCategory:string;
  madinaHotel:string;
  madinaDay:number;
  madinaCategory:string;
  totalCost:number;
  visaStatus:string;
  createdAt: string;
}

const UmrahBookings = () => {
  const [bookings, setBookings] = useState<UmrahBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const userEmail = typeof window !== "undefined" ? localStorage.getItem("userEmail") : null;
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (userEmail) {
      fetch("/api/getUmrahBooking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userEmail: userEmail }),
      })
        .then((res) => res.json())
        .then((data: UmrahBooking[] | { error: string }) => {
          if ("error" in data) {
            setError(data.error);
          } else {
            setBookings(data);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching visa bookings:", error);
          setError("Failed to fetch visa bookings.");
          setLoading(false);
        });
    }
  }, [userEmail]);

  if (loading) return <p className="text-center text-lg font-semibold">Loading bookings...</p>;
  if (!loading && bookings.length === 0) return <p className="text-center">No bookings found.</p>;
  
  return (
    <div className="">
     

        <div className="overflow-x-auto">
          <table className="w-[1000px] border-collapse  border border-gray-300 shadow-md">
            {/* Table Headings */}
            <thead className="bg-blue-200">
              <tr className="text-left">
              <th className="border border-gray-300 px-4 py-2 text-center">#</th>
                <th className="border border-gray-300 px-4 py-2">Date of Booking</th>
                <th className="border border-gray-300 px-4 py-2">Full Name</th>
                <th className="border border-gray-300 px-4 py-2">Total Days</th>
                <th className="border border-gray-300 px-4 py-2">Makkah Hotel</th>
                <th className="border border-gray-300 px-4 py-2">Room Category</th>
                <th className="border border-gray-300 px-4 py-2">Madina Hotel</th>
                <th className="border border-gray-300 px-4 py-2">Room Category</th>
                
                <th className="border border-gray-300 px-4 py-2">Cost (SAR)</th>
              </tr>
            </thead>
            
            {/* Table Body */}
            <tbody>
              {bookings.map((booking: UmrahBooking, index) => (
                <tr key={booking._id} className="hover:bg-gray-100">
                     <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">{new Date(booking.createdAt).toLocaleDateString()}</td> 
                   <td className="border border-gray-300 px-4 py-2">{booking.name }</td>
                  <td className="border border-gray-300 px-4 py-2">{booking.days} days</td>
                  <td className="border border-gray-300 px-4 py-2">{booking.makkahHotel}</td>
                  <td className="border border-gray-300 px-4 py-2">{booking.makkahCategory} - {booking.makkahDay} days</td>
                  <td className="border border-gray-300 px-4 py-2">{booking.madinaHotel}</td>
                  <td className="border border-gray-300 px-4 py-2">{booking.madinaCategory} - {booking.madinaDay} days</td>
                
                  <td className="border border-gray-300 px-4 py-2">{booking.totalCost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      
    </div>
  );
};

export default UmrahBookings;
