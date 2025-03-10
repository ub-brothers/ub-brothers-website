"use client";
import { useEffect, useState } from "react";

type Flight = {
  _key?: string;
  depOrReturn: string;
  baggage: string;
  date: string;
  flightNumber: string;
  originDestination: string;
  time: string;
};

type Passenger = {
  _key?: string;
  type: string;
  name: string;
  surname: string;
  passportNumber: string;
  dob: string;
  passportExpiry: string;
  nationality: string;
};

type Booking = {
  _id: string;
  airlineName: string;
  createdAt:string;
  meal: string;
  totalPrice: number;
  adults: number;
  children: number;
  infants: number;
  userEmail:string;
  phoneNumber: string;
  emailAddress: string;
  flights: Flight[];
  passengers: Passenger[];
  status: string; // ✅ Status field added
};




const MyBookings = ({ searchParams }: { searchParams: { filterStatus?: "cancelled" | "confirmed" } }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const storedUserEmail = typeof window !== "undefined" ? localStorage.getItem("userEmail") : null;
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null); // ✅ Store selected booking for modal
  const [showModal, setShowModal] = useState(false); // ✅ Modal state
  const { filterStatus } = searchParams;


  useEffect(() => {
    if (storedUserEmail) {
      fetch("/api/getUserBooking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userEmail: storedUserEmail }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) {
            setBookings(data);
          }
        })
        .catch((error) => console.error("Error fetching bookings:", error));
    }
  }, [storedUserEmail]);

  const isCancellable = (createdAt: string) => {
    const bookingTime = new Date(createdAt).getTime(); // Convert to timestamp
    const currentTime = Date.now(); // Current time
    const threeHours = 3 * 60 * 60 * 1000; // 3 hours in milliseconds

    return currentTime - bookingTime < threeHours; // ✅ Check if within 3 hours
  };

 // ✅ Cancel booking function
 const cancelBooking = async () => {
  
  if (!selectedBooking) return;

  const response = await fetch("/api/cancelBooking", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ bookingId: selectedBooking }),
  });

  if (response.ok) {
    alert("Booking cancelled successfully!");
    setBookings((prev) =>
      prev.map((b) => (b._id === selectedBooking ? { ...b, status: "cancelled" } : b))
    );
  } else {
    alert("Error cancelling booking. Please try again.");
  }

  setShowModal(false);
  setSelectedBooking(null);
};
const handleCancelClick = (bookingId: string) => {
  setSelectedBooking(bookingId);
  setShowModal(true);
};


const filteredBookings = filterStatus
? bookings.filter((b) => (filterStatus === "cancelled" ? b.status === "cancelled" : b.status !== "cancelled"))
: bookings;

  return (
    <div className="max-w-5xl mx-auto">
      {filteredBookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings found.</p>
      ) : (
        filteredBookings.map((booking, index) => (
          <div key={index} className="bg-white shadow-lg rounded-md p-4 mb-6">
            {/* Ticket Header */}
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h3 className="text-lg font-semibold text-blue-600">
                Airline: {booking.airlineName}
              </h3>
              <p className="text-gray-600"><b>Total Price:</b> {booking.totalPrice} PKR/-</p>
            </div>

            {/* Table */}
            <div className="w-full overflow-x-auto">
              <table className=" border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-700 text-white text-sm">
                    <th className="border p-2">Flight Type</th>
                    <th className="border p-2">Date</th>
                    <th className="border p-2">Flight Number</th>
                    <th className="border p-2">Route</th>
                    <th className="border p-2">Time</th>
                    <th className="border p-2">Baggage</th>
                    <th className="border p-2">Meal</th>
                  </tr>
                </thead>
                <tbody>
                  {booking.flights.map((flight, idx) => (
                    <tr key={idx} className="text-center bg-blue-200">
                      <td className="border p-2">{flight.depOrReturn}</td>
                      <td className="border p-2">{flight.date}</td>
                      <td className="border p-2">{flight.flightNumber}</td>
                      <td className="border p-2">{flight.originDestination}</td>
                      <td className="border p-2">{flight.time}</td>
                      <td className="border p-2">{flight.baggage}</td>
                      <td className="border p-2">{booking.meal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Passengers List */}
            <div className="mt-4">
              <h4 className="font-semibold text-gray-700 mb-2">Passengers:</h4>
              {booking.passengers.map((p, idx) => (
                <p key={idx} className="text-gray-600">
                  {p.name} {p.surname} - {p.passportNumber} ({p.nationality})
                </p>
              ))}
            </div>

            {/* ✅ Cancel Booking Button */}
            {filterStatus !== "cancelled" &&  isCancellable(booking.createdAt) && ( // ✅ Cancel button only for non-cancelled bookings
              <button onClick={() => handleCancelClick(booking._id)} className="bg-red-500 text-white px-4 py-2 mt-2 rounded">
                Cancel Booking
              </button>
            )}
          </div>
        ))
      )}
        {/* ✅ Modal for Confirmation */}
        {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-bold mb-4">Confirm Cancellation</h2>
            <p>Are you sure you want to cancel this booking?</p>
            <div className="mt-4 flex justify-center gap-4">
              <button
                onClick={cancelBooking}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Yes
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
