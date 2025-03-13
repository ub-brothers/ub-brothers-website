"use client";

import { useEffect, useState } from "react";


const cleanPrice = (price: any): number => {
  if (typeof price === "number") return price; // If already a number, return as is
  if (typeof price !== "string") return 0; // If not a string, return 0

  // Remove non-numeric characters (e.g., "PKR", "/-", commas, etc.)
  const cleanedPrice = price.replace(/[^0-9.]/g, "");

  // Convert to a number
  return parseFloat(cleanedPrice) || 0;
};

async function fetchLedger(storedUserEmail: string) {
  const res = await fetch("/api/getLedger", {
    method: "POST",
    body: JSON.stringify({ storedUserEmail }),
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    console.error("Error fetching ledger data");
    return null;
  }

  const data = await res.json();
  return data;
}

export default function Ledger() {
  const [bookings, setBookings] = useState<any>(null);
  const [totalCost, setTotalCost] = useState(0);
  const [storedUserEmail, setStoredUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Loading state for better UX

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      setStoredUserEmail(email);
    }
    setLoading(false); // Once email is fetched, stop loading
  }, []);

  useEffect(() => {
    if (!storedUserEmail) return; // Prevent fetching if email is missing

    async function loadLedger() {
      const result = await fetchLedger(storedUserEmail as string);
      console.log("Fetched Ledger Data:", result);
      if (result) {
        setBookings(result.bookings);
        setTotalCost(result.totalCost);
      }
    }
    loadLedger();
  }, [storedUserEmail]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-lg font-semibold text-center text-gray-700">Loading user data...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-xl font-serif font-bold text-center mb-4"><u>My Ledger</u></h2>
      <table className="w-full min-w-[1000px] border-collapse border border-gray-300">
        <thead>
          <tr className="bg-blue-800 text-white">
            <th className="border p-2">Booking Of</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Details</th>
            <th className="border p-2">Price</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(bookings).map(([category, items]: any) =>
            items.map((item: any, index: number) => (
              <tr key={`${category}-${index}`} className="border">
                <td className="border p-2">{category}</td>
                <td className="border p-2">{new Date(item.createdAt).toLocaleDateString()}</td>
                <td className="border p-2">
                  {category === "Tickets" ? (
                    <div>
                      <strong>Airline:</strong> {item.airlineName}
                      <ul className="mt-1">
                        {item.flights?.map((flight: any, i: number) => (
                          <li key={i} className="text-sm">
                            ✈ {flight.originDestination} - {flight.flightNumber} ({flight.depOrReturn})   
                            <b className="ml-5">Date:</b>{flight.date}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : category === "Hajj Package" ? (
                    <div>
                      <strong>Total Days:</strong> {item.shortDescription}<br></br>
                      <strong>Room Category:</strong> {item.selectedCategory}
                    </div>
                  ) : category === "Umrah Package" ? (
                    <div>
                      <strong>Total Days:</strong> {item.days}
                    </div>
                  ) : category === "Iran Ziyarat" ? (
                    <div>
                      <strong>Ziyarat Place:</strong> {item.countryName}
                    </div>
                  ) : category === "Tour Package" ? (
                    <div>
                      <strong>Country:</strong> {item.country} <br/>
                    </div>
                  ) : (
                    <div>
                      <strong>Country:</strong> {item.countryName}
                    </div>
                  )}
                </td>
                <td className="border p-2 text-right">
                {cleanPrice(
                    item.totalPrice || item.prize || item.prizeForUsers || 
                    item.price || item.priceForUsers || item.selectedPrize || 
                    item.totalCost || item.Prize || 0
                  )}  PKR
                </td>
              </tr>
            ))
          )}

          {/* Total Cost Row */}
          <tr className="bg-gray-100 font-bold">
            <td className="border p-2" colSpan={3}>Total Cost</td>
            <td className="border p-2 text-right">{totalCost} PKR</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}