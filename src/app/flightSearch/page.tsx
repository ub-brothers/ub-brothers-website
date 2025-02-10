"use client";

import { useState } from "react";

export default function FlightSearchForm() {
  const [formData, setFormData] = useState({
    tripType: "oneway",
    origin: "",
    destination: "",
    departureDate: "",
    returnDate: "",
    adults: 1,
    children: 0,
    infants: 0,
    cabinClass: "economy",
  });

  const [loading, setLoading] = useState(false);
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState("");

  // ✅ Handle Input Changes
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Form Submission
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setFlights([]);

    // ✅ Validate Required Fields Before API Call
    if (!formData.origin || !formData.destination || !formData.departureDate) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      const queryParams = new URLSearchParams({
        origin: formData.origin.trim().toUpperCase(),  // ✅ IATA Code uppercase
        destination: formData.destination.trim().toUpperCase(),
        departureDate: formData.departureDate,
        returnDate: formData.tripType === "roundtrip" ? formData.returnDate : "",
        adults: formData.adults.toString(),
        children: formData.children.toString(),
        infants: formData.infants.toString(),
        cabinClass: formData.cabinClass.toUpperCase(),
      });

      console.log("🔍 API Requesting:", `/api/flight?${queryParams}`);

      const response = await fetch(`/api/flight?${queryParams}`);
      const data = await response.json();

      console.log("📩 API Response:", data);

      if (!response.ok || data.error) {
        throw new Error(data.error || "Failed to fetch flights.");
      }

      setFlights(data.data || []);
    } catch (err: any) {
      console.error("❌ Fetch Error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">Search Flights</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="tripType"
              value="oneway"
              checked={formData.tripType === "oneway"}
              onChange={handleChange}
              className="mr-2"
            />
            One Way
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="tripType"
              value="roundtrip"
              checked={formData.tripType === "roundtrip"}
              onChange={handleChange}
              className="mr-2"
            />
            Return
          </label>
        </div>

        <h3 className="font-semibold">Departure & Destination</h3>
        <div className="grid grid-cols-2 gap-4">
          <input type="text" name="origin" placeholder="From (IATA Code)" className="p-2 border rounded w-full" value={formData.origin} onChange={handleChange} required />
          <input type="text" name="destination" placeholder="To (IATA Code)" className="p-2 border rounded w-full" value={formData.destination} onChange={handleChange} required />
        </div>

        <h3 className="font-semibold">Travel Dates</h3>
        <div className="grid grid-cols-2 gap-4">
          <input type="date" name="departureDate" className="p-2 border rounded w-full" value={formData.departureDate} onChange={handleChange} required />
          {formData.tripType === "roundtrip" && (
            <input type="date" name="returnDate" className="p-2 border rounded w-full" value={formData.returnDate} onChange={handleChange} required />
          )}
        </div>

        <h3 className="font-semibold">Passengers</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium">Adults (12+ years)</label>
            <input type="number" name="adults" min="1" className="p-2 border rounded w-full" value={formData.adults} onChange={handleChange} required />
          </div>
          <div>
            <label className="block text-sm font-medium">Children (2-11 years)</label>
            <input type="number" name="children" min="0" className="p-2 border rounded w-full" value={formData.children} onChange={handleChange} />
          </div>
          <div>
            <label className="block text-sm font-medium">Infants (0-2 years)</label>
            <input type="number" name="infants" min="0" className="p-2 border rounded w-full" value={formData.infants} onChange={handleChange} />
          </div>
        </div>

        <h3 className="font-semibold">Cabin Class</h3>
        <select name="cabinClass" className="p-2 border rounded w-full" value={formData.cabinClass} onChange={handleChange}>
          <option value="economy">Economy</option>
          <option value="business">Business</option>
          <option value="first">First Class</option>
        </select>

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          {loading ? "Searching..." : "Search Flights"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      {flights.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-bold">Available Flights:</h3>
          <ul className="mt-2 space-y-2">
            {flights.map((flight: any, index) => (
              <li key={index} className="p-2 border rounded">
                ✈️ {flight.itineraries[0].segments[0].departure.iataCode} → {flight.itineraries[0].segments[0].arrival.iataCode}  
                <br />
                🕒 Departure: {flight.itineraries[0].segments[0].departure.at}  
                <br />
                💲 Price: {flight.price.total} {flight.price.currency}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
