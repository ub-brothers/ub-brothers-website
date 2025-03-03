"use client"
import { useEffect, useState } from "react";
import React from "react";
import { client } from "@/sanity/lib/client";
import {  FlightGroup } from "../types/destinations";
import { useRouter } from "next/navigation";

const FlightTable = () => {
  const [flights, setFlights] = useState<FlightGroup[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All"); // State for selected category
  const router = useRouter();


  useEffect(() => {
    const fetchFlights = async () => {
      const data: FlightGroup[] = await client.fetch('*[_type == "flights"] | order(_createdAt asc) { id , airline, "airlineLogo": airlineLogo.asset->url ,  flights[], meal, price, airlineName,"airlineImage": airlineImage.asset->url, seats, childSeats }');
      setFlights(data);
    };
    fetchFlights();
  }, []);


  
 // Function to filter flights based on category
 const filterFlights = (category: string) => {
  setSelectedCategory(category);
};

// Filter flights based on selected category
const filteredFlights = flights
  .map((flightGroup) => {

    const hasJED = flightGroup.flights.some((flight) =>
      flight.originDestination.includes("JED")
    );

    const depFlights = flightGroup.flights.filter(
      (flight) => !flight.isReturn // Count DEP flights
    );

    const filteredFlights = flightGroup.flights.filter((flight) => {
      if (selectedCategory === "All") return true; // Show all flights

      // Check if destination is in originDestination string
      if (selectedCategory === "Oman One Way") {
        return (
          flight.originDestination.includes("MCT") && depFlights.length === 1 &&  !flight.isReturn // One Way only
        );
      } else if (selectedCategory === "Bahrain One Way") {
        return (
          flight.originDestination.includes("BAH") && depFlights.length === 1 &&  !flight.isReturn // One Way only
        );
      } else if (selectedCategory === "Umrah") {
        // For Umrah, show all flights if JED is present
        return hasJED;
      }
      return false;
    });

    // Return a new flight group with filtered flights
    return {
      ...flightGroup,
      flights: filteredFlights,
    };
  })
  .filter((flightGroup) => flightGroup.flights.length > 0);// Remove flight groups with no flights



  return (
    <div className="w-full mb-6">
  <div className="max-h-[700px] w-full overflow-x-auto">

          {/* Category Buttons */}
      <div className="flex justify-center gap-4 my-4 w-full overflow-x-auto min-w-[700px]">
        <button
          onClick={() => filterFlights("All")}
          className={`px-4 py-2 rounded ${
            selectedCategory === "All"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          All
        </button>
        <button
          onClick={() => filterFlights("Oman One Way")}
          className={`px-4 py-2 rounded ${
            selectedCategory === "Oman One Way"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Oman One Way
        </button>
        <button
          onClick={() => filterFlights("Bahrain One Way")}
          className={`px-4 py-2 rounded ${
            selectedCategory === "Bahrain One Way"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Bahrain One Way
        </button>
        <button
          onClick={() => filterFlights("Umrah")}
          className={`px-4 py-2 rounded ${
            selectedCategory === "Umrah"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Umrah Group
        </button>
      </div>

  
      <table className="w-max min-w-[1000px] sm:min-w-full border-collapse border border-gray-300">
        <thead className="sticky top-0 bg-gray-700 text-white">
          <tr className="bg-gray-700 text-white">
            <th className="px-4 py-2 border">Date</th>
            <th className="px-4 py-2 border">Flight No</th>
            <th className="px-4 py-2 border">Origin - Destination</th>
            <th className="px-4 py-2 border">Time</th>
            <th className="px-4 py-2 border">Baggage</th>
            <th className="px-4 py-2 border">Meal</th>
            <th className="px-4 py-2 border">Price</th>
            <th className="px-4 py-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
        {filteredFlights.map((flightGroup, index) => (
              <React.Fragment key={index}>
                {/* Airline Name + Logo Row */}
                <tr className="bg-gray-100">
                  <td colSpan={8} className="px-4 py-2 text-center my-6 font-semibold">
                    <div className="flex justify-center items-center text-2xl w-full">
                      {flightGroup.airlineLogo && (
                        <img
                          src={flightGroup.airlineLogo}
                          alt={flightGroup.airline}
                          className="h-14 mr-2"
                        />
                      )}
                      {flightGroup.airline}
                    </div>
                  </td>
                </tr>

          
              {flightGroup.flights.map((flight, idx) => (
                <tr key={idx} className="border-t">
                 <td className="px-4 text-center font-bold text-sm bg-blue-200 border">
                 <strong>{flight.isReturn ? "RET" : "DEP"} - </strong>
                 {new Date(flight.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</td>
                  <td className="px-4 text-sm font-bold  bg-blue-200 text-center border">{flight.flightNumber}</td>
                  <td className="px-4 text-sm font-bold  bg-blue-200 text-center border">{flight.originDestination}</td>
                  <td className="px-4 text-sm font-bold bg-blue-200 text-center border">{flight.time}</td>
                  <td className="px-4 text-sm font-bold bg-blue-200 text-center border">{flight.baggage}</td>
                  {idx === 0 && (
                    <td rowSpan={flightGroup.flights.length} className="px-4 text-sm font-bold bg-blue-200 text-center border text-center align-middle">{flightGroup.meal}</td>
                  )}
                  {idx === 0 && (
                    <td rowSpan={flightGroup.flights.length} className="px-4 text-sm font-bold bg-blue-200 text-center border text-center align-middle">{flightGroup.price}</td>
                  )}
                  {idx === 0 && (
                    <td rowSpan={flightGroup.flights.length} className="text-center bg-blue-200  py-3 border align-middle">
                      <button
                      onClick={() => {
                        let queryParams = `airline=${encodeURIComponent(flightGroup.airlineImage)}&airlineName=${encodeURIComponent(flightGroup.airlineName)}&meal=${encodeURIComponent(flightGroup.meal)}&price=${encodeURIComponent(flightGroup.price)}  &seats=${encodeURIComponent(flightGroup.seats)}  &childSeats=${encodeURIComponent(flightGroup.childSeats)}`;
                        
                        flightGroup.flights.forEach((flight, idx) => {
                          queryParams += `&date${idx}=${encodeURIComponent(flight.date)}&flightNumber${idx}=${encodeURIComponent(flight.flightNumber)}&originDestination${idx}=${encodeURIComponent(flight.originDestination)}&time${idx}=${encodeURIComponent(flight.time)}&baggage${idx}=${encodeURIComponent(flight.baggage)}&depOrReturn${idx}=${flight.isReturn ? "RET" : "DEP"}`;
                      
                        });
                      
                        router.push(`/booking-tickets?${queryParams}`);
                      }}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-orange-600">Book Now</button>
                    </td>
                  )}
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div></div>
  );
};

export default FlightTable;