"use client";
import { useEffect, useState } from "react";

interface HajjBooking {
  _id: string;
  userName: string;
  shortDescription: string;
  countryName:string;
 prize:number;
 priceForUsers?:number;
  createdAt: string;
  storedUserEmail: string;
}

export default function IranBookings() {
  const [bookings, setBookings] = useState<HajjBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const storedUserEmail = typeof window !== "undefined" ? localStorage.getItem("userEmail") : null;
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (storedUserEmail) {
      fetch("/api/iranBooking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ storedUserEmail }),
      })
        .then((res) => res.json())
        .then((data: HajjBooking[] | { error: string }) => {
          console.log("API Response:", data); // Log the API response
          if ("error" in data) {
            setError(data.error);
          } else if (Array.isArray(data)) {
            setBookings(data);
          } else {
            setError("Unexpected data format received from the API.");
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching visa bookings:", error);
          setError("Failed to fetch visa bookings.");
          setLoading(false);
        });
    }
  }, [storedUserEmail]);

  if (loading) return <p className="text-center text-lg font-semibold">Loading bookings...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-4">
      {bookings.length === 0 ? (
        <p className="text-center">No bookings found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] mx-auto border-collapse border border-gray-300 shadow-md">
            {/* Table Headings */}
            <thead className="bg-blue-200">
              <tr>
                <th className="border border-gray-300 px-4 py-2">#</th>
                <th className="border border-gray-300 px-4 py-2">Date of Booking</th>
                <th className="border border-gray-300 px-4 py-2">Full Name</th>
                <th className="border border-gray-300 px-4 py-2">Ziyarat Place</th>
                <th className="border border-gray-300 px-4 py-2">Route</th>
                <th className="border border-gray-300 px-4 py-2">Price ($USD)</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={booking._id} className="hover:bg-gray-100 text-center">
                  <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">{new Date(booking.createdAt).toLocaleDateString()}</td>
                   <td className="border border-gray-300 px-4 py-2">
                    {booking.userName}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{booking.countryName}</td> 
                <td className="border border-gray-300 px-4 py-2">{booking.shortDescription}</td>  
               
                  
                  <td className="border border-gray-300 px-4 py-2">{booking.priceForUsers ?? booking.prize}</td>
                
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}