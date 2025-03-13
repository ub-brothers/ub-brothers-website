"use client";

import { useEffect, useState } from "react";

interface VisaBooking {
  _id: string;
  countryName: string;
  firstName: string;
  fullName:string;
  price: number;
  priceForUsers?: number;
  createdAt: string;
}

const VisaBookings = () => {
  const [bookings, setBookings] = useState<VisaBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const storedUserEmail = typeof window !== "undefined" ? localStorage.getItem("userEmail") : null;
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (storedUserEmail) {
      fetch("/api/getVisaBooking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userEmail: storedUserEmail }),
      })
        .then((res) => res.json())
        .then((data: VisaBooking[] | { error: string }) => {
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
  }, [storedUserEmail]);

  if (loading) return <p className="text-center text-lg font-semibold">Loading visa bookings...</p>;

  return (
    <div className="">
     

      {bookings.length === 0 ? (
        <p className="text-center">No visa bookings found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-[1000px] border-collapse border border-gray-300 shadow-md">
            {/* Table Headings */}
            <thead className="bg-blue-200">
              <tr className="text-left">
              <th className="border border-gray-300 px-4 py-2 text-center">#</th>
                <th className="border border-gray-300 px-4 py-2">Date of Booking</th>
                <th className="border border-gray-300 px-4 py-2">Country</th>
                <th className="border border-gray-300 px-4 py-2">Full Name</th>
                <th className="border border-gray-300 px-4 py-2">Visa Cost (PKR)</th>
              </tr>
            </thead>
            
            {/* Table Body */}
            <tbody>
              {bookings.map((booking: VisaBooking, index) => (
                <tr key={booking._id} className="hover:bg-gray-100">
                     <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">{new Date(booking.createdAt).toLocaleDateString()}</td>
                  <td className="border border-gray-300 px-4 py-2">{booking.countryName}</td>
                  <td className="border border-gray-300 px-4 py-2">{booking.firstName ?? booking.fullName }</td>
                  <td className="border border-gray-300 px-4 py-2">{booking.priceForUsers ?? booking.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default VisaBookings;
