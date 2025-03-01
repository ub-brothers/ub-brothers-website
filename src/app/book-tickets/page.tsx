"use client"
import { useEffect, useState } from "react";
import React from "react";
import { client } from "@/sanity/lib/client";
import {  FlightGroup } from "../types/destinations";
import { useRouter } from "next/navigation";

const FlightTable = () => {
  const [flights, setFlights] = useState<FlightGroup[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchFlights = async () => {
      const data: FlightGroup[] = await client.fetch('*[_type == "flights"] | order(_createdAt asc) { id , airline, "airlineLogo": airlineLogo.asset->url ,  flights[], meal, price, airlineName,"airlineImage": airlineImage.asset->url, seats,  }');
      setFlights(data);
    };
    fetchFlights();
  }, []);

  return (
    <div className="max-h-[700px] w-full overflow-x-auto">
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
          {flights.map((flightGroup, index) => (
            <React.Fragment key={index}>
              {/* Airline Name + Logo Row */}
              <tr className="bg-gray-100">
  <td colSpan={8} className="px-4 py-2 text-center my-6  font-semibold">
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
                        let queryParams = `airline=${encodeURIComponent(flightGroup.airlineImage)}&airlineName=${encodeURIComponent(flightGroup.airlineName)}&meal=${encodeURIComponent(flightGroup.meal)}&price=${encodeURIComponent(flightGroup.price)}  &seats=${encodeURIComponent(flightGroup.seats)}`;
                        
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
    </div>
  );
};

export default FlightTable;