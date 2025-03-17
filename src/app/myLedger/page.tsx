"use client";

import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { Tooltip } from "react-tooltip";

const cleanPrice = (price: any): number => {
  if (typeof price === "number") return price;
  if (typeof price !== "string") return 0;
  const cleanedPrice = price.replace(/[^0-9.]/g, "");
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
type BookingType = "Tickets" | "Hajj Package" | "Umrah Package" | "Visa Offer" | "E-Visa"| "Umrah Offer" |"Tour Package"| "Sticker Visa"| "Iran Ziyarat Offer"| "Iran Ziyarat" | "Hajj Offer"|"File & Consultancy";
const bookingFieldsMapping: Record<BookingType, { key: string; label: string }[]> = {
  Tickets : [
    { key: "airlineName", label: "Airline" },
    { key: "flights", label: "Flights" },
    { key: "passengers", label: "Passengers" },
    { key: "totalPrice", label: "Total Cost (PKR])" },
  ],
  "Hajj Package": [
    {key: "userName" , label:"Name"},
    { key: "shortDescription", label: "Total Days" },
    { key: "selectedCategory", label: "Room Category" },
    { key: "selectedPrize", label: "Total Cost (PKR)" },
  ],
  "Umrah Package": [
    {key: "name",label:"Name"},
    { key: "days", label: "Total Days" },
    { key: "makkahHotel", label: "Makkah Hotel" },
    { key: "madinaHotel", label: "Madina Hotel" },
    { key: "totalCost", label: "Total Cost (SAR)" },
  ],
  "Visa Offer": [
    {key: "title",label:"Offer"},
    { key: "countries", label: "Countries" },
    { key: "discountedPriceForUsers", label: "Total Cost (PKR)" },
  ],
  "E-Visa": [
    {key: "firstName",label:"Name"},
    { key: "countryName", label: "Country" },
    { key: "prize", label: "Total Cost (PKR)" },
  ],
  "Umrah Offer": [
    {key: "title",label:"Offer"},
    { key: "daysOfUmrah", label: "Total Days Of Umrah" },
    { key: "makkahHotel", label: "Makkah Hotel" },
    { key: "makkahHotelDays", label: "Days In Makkh" },
    { key: "madinaHotel", label: "Madina Hotel" },
    { key: "madinaHotelDays", label: "Days In Madina" },
    { key: "discountedPriceForUsers", label: "Total Cost" },
  ],
  "Tour Package": [
    {key: "fullName",label:"Name"},
    { key: "country", label: "Country" },
    { key: "price", label: "Total Cost (PKR)" },
  ],
  "Sticker Visa": [
    {key: "firstName",label:"Name"},
    { key: "countryName", label: "Country" },
    { key: "prize", label: "Total Cost (PKR)" },
  ],
  "Iran Ziyarat Offer": [
    {key: "title",label:"Offer"},
    { key: "destination", label: "Places Of Ziyarat" },
    { key: "route", label: "Route" },
    { key: "discountedPriceForUsers", label: "Total Cost (PKR)" },
  ],
  "Iran Ziyarat": [
    {key: "countryName",label:"Places Of Ziyarat"},
    { key: "shortDescription", label: "Route" },
    { key: "prize", label: "Total Cost (PKR)" },
  ],
  "Hajj Offer": [
    {key: "title",label:"Offer"},
    { key: "dateOfHajj", label: "Date" },
    { key: "totalDays", label: "Total Days" },
    { key: "makkahHotel", label: "Makkah Hotel" },
    { key: "madinaHotel", label: "Madina Hotel" },
    { key: "discountedPriceForUsers", label: "Total Cost (PKR)" },
  ],
  "File & Consultancy": [
    {key: "fullName",label:"Name"},
    { key: "countryName", label: "Country" },
    { key: "price", label: "Total Cost (PKR)" },
  ],
};

const BookingDetailsModal = ({ booking, onClose }: { booking: any; onClose: () => void }) => {
  // Determine the booking type based on the _type field
  const normalizeCategory = (booking: any): BookingType => {
    switch (booking._type) {
      case "umrahBooking":
        return "Umrah Package";
      case "hajjBooking":
        return "Hajj Package";
      case "ticketBooking":
        return "Tickets";
        case "visaBooking":
        return "E-Visa";
        case "fileBooking":
        return "File & Consultancy";
        case "iranBooking":
          return "Iran Ziyarat";

          case "stickerVisaBooking":
          return "Sticker Visa";

          case "tourBooking":
          return "Tour Package";
          case "visaOfferBooking":
          return "Visa Offer";

          case "iranOfferBooking":
          return "Iran Ziyarat Offer";

          case "hajjOfferBooking":
          return "Hajj Offer";
          case "umrahOfferBooking":
          return "Umrah Offer";
      default:
        console.warn("Unknown booking type:", booking._type); // Debugging
        return "Tickets"; // Default
    }
  };

  const bookingType: BookingType = normalizeCategory(booking);
  const fieldsToDisplay = bookingFieldsMapping[bookingType] || [];

  const renderValue = (value: any, key: string) => {
    if (Array.isArray(value)) {
      if (key === "flights") {
        return (
          <ul>
            {value.map((flight, index) => (
              <li key={index}>
                ✈ {flight.originDestination} - {flight.flightNumber} ({flight.depOrReturn}) <br />
                <b>Date:</b> {flight.date} <b>Time:</b> {flight.time}
              </li>
            ))}
          </ul>
        );
      } else if (key === "passengers") {
        return (
          <ul>
            {value.map((passenger, index) => (
              <li key={index}>
                <b>Name:</b> {passenger.name} {passenger.surname} - (<b>{passenger.type}</b>)
              </li>
            ))}
          </ul>
        );
      }
      return (
        <ul>
          {value.map((item, index) => (
            <li key={index}>{JSON.stringify(item)}</li>
          ))}
        </ul>
      );
    }
    return value?.toString() || "N/A";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4">Booking Details</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-800 text-white">
              <th className="border p-2">Field</th>
              <th className="border p-2">Details</th>
            </tr>
          </thead>
          <tbody>
            {fieldsToDisplay.map((field) => (
              <tr key={field.key} className="border">
                <td className="border p-2 font-semibold">{field.label}</td>
                <td className="border p-2">
                  {renderValue(booking[field.key], field.key)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};
export default function Ledger() {
  const [bookings, setBookings] = useState<Record<string, any[]>>({});
  const [filteredBookings, setFilteredBookings] = useState<Record<string, any[]>>({});
  const [totalCost, setTotalCost] = useState(0);
  const [storedUserEmail, setStoredUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [totalPaid, setTotalPaid] = useState(0);
  const [totalDue, setTotalDue] = useState(0);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  
  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      setStoredUserEmail(email);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!storedUserEmail) return;

    async function loadLedger() {
      const result = await fetchLedger(storedUserEmail as string);
      if (result) {
        setBookings(result.bookings);
        setFilteredBookings(result.bookings); // Initialize filtered bookings with all bookings
        calculateTotals(result.bookings); // Calculate totals for all bookings initially
      }
    }
    loadLedger();
  }, [storedUserEmail]);

  const calculateTotals = (bookings: Record<string, any[]>) => {
    let cost = 0;
    let paid = 0;
    let due = 0;

    Object.values(bookings).forEach((items) => {
      items.forEach((item) => {
        cost += cleanPrice(
          item.totalPrice || item.prize || item.prizeForUsers ||
          item.price || item.priceForUsers || item.selectedPrize ||
          item.totalCost || item.Prize || item.discountedPriceForUsers || 0
        );
        paid += cleanPrice(item.paid || 0);
        due += cleanPrice(item.due || 0);
      });
    });

    setTotalCost(cost);
    setTotalPaid(paid);
    setTotalDue(due);
  };

  const handleSearch = () => {
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0); // Start of the day

    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999); // End of the day

    const filtered = Object.entries(bookings).reduce((acc, [category, items]) => {
      const filteredItems = items.filter((item) => {
        const itemDate = new Date(item.createdAt).getTime();
        return itemDate >= start.getTime() && itemDate <= end.getTime();
      });
      if (filteredItems.length > 0) {
        acc[category] = filteredItems;
      }
      return acc;
    }, {} as Record<string, any[]>);

    setFilteredBookings(filtered);
    calculateTotals(filtered); // Recalculate totals for filtered bookings
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-lg font-semibold text-center text-gray-700">Loading data...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="overflow-x-auto p-4 text-sm h-screen">  
      <div className="flex items-center justify-center mt-2 gap-4 mb-4 text-center">
        <h1 className="font-bold ">Bookings From:</h1>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-2 bg-blue-200"
        />
       <h1 className="font-bold ml-10"> Bookings to:</h1>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border p-2 bg-blue-200"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded"
        >
          Search
        </button>
      </div>
      <h2 className="text-xl font-serif font-bold text-center mb-4"><u>My Ledger</u></h2>
  
      <table className="w-full min-w-[1000px] border-collapse border border-gray-300">
        <thead>
          <tr className="bg-blue-800 text-white">
            <th className="border p-2">Booking Of</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Details</th>
            <th className="border p-2">Remarks</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Debit</th> {/* Add Paid column */}
            <th className="border p-2">Credit</th> 
          </tr>
        </thead>
        <tbody>
          {Object.entries(filteredBookings).map(([category, items]: any) =>
            items.map((item: any, index: number) => (
              <tr key={`${category}-${index}`} className="border">
                <td className="border p-2">{category}</td>
                <td className="border p-2">{new Date(item.createdAt).toLocaleDateString()}</td>
                <td className="border p-2 relative">
                <div className="flex flex-col justify-between h-full">
                  {category === "Tickets" ? (
                    <div>
                      <strong>Airline:</strong> {item.airlineName}
                      <ul className="mt-1">
                        {item.flights?.map((flight: any, i: number) => (
                          <li key={i} className="text-sm">
                            ✈ {flight.originDestination} - {flight.flightNumber} ({flight.depOrReturn})  <br></br> 
                            <b className="mt-1">Date:</b> {flight.date}   <b className="ml-5">Time:</b> {flight.time}
                          </li>
                        ))}
                      </ul>
                      <strong className="mt-3 block">Passengers:</strong>
                      <ul className="">
                        {item.passengers?.map((p: any, i: number) => (
                          <li key={i} className="text-sm">
                            <b>Name:</b> {p.name} {p.surname} - (<b>{p.type}</b>),
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
                      <strong>Total Days:</strong> {item.days}<br></br>
                      <strong>Makkah Hotel:</strong> {item.makkahHotel}<br></br>
                      <strong>Madina Hotel:</strong> {item.madinaHotel}
                    </div>
                  ) : category === "Visa Offer" ? (
                    <div>
                      <strong>Offer:</strong> {item.title}<br></br>
                      <strong>Countries:</strong> {item.countries}<br></br>
                    </div>
                  ) : category === "Iran Ziyarat Offer" ? (
                    <div>
                      <strong>Offer:</strong> {item.title}<br></br>
                      <strong>Ziyarat Places:</strong> {item.destination}<br></br>
                      <strong>Route:</strong> {item.route}
                    </div>
                  ) : category === "Hajj Offer" ? (
                    <div>
                      <strong>Offer:</strong> {item.title}<br></br>
                      <strong>Date:</strong> {item.dateOfHajj}<br></br>
                      <strong>Total Days:</strong> {item.totalDays}<br></br>
                      <strong>Makkah Hotel:</strong> {item.makkahHotel}<br></br>
                      <strong>Madina Hotel:</strong> {item.madinaHotel}<br></br>
                    </div>
                  ) : category === "Umrah Offer" ? (
                    <div>
                      <strong>Offer:</strong> {item.title}<br></br>
                      <strong>Total Days:</strong> {item.daysOfUmrah}<br></br>
                      <strong>Makkah Hotel:</strong> {item.makkahHotel} - {item.makkahHotelDays} days.<br></br>
                      <strong>Madina Hotel:</strong> {item.madinaHotel} - {item.madinaHotelDays} days.<br></br>
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
                  <Tooltip id="tooltip" />
                   <button  data-tooltip-id="tooltip"
  data-tooltip-content="View Details"  onClick={() => setSelectedBooking(item)} className="text-blue-600 absolute bottom-2 right-2">
                    <FaEye />
                  </button>
                 
                  </div>
                </td>

                <td className="border p-2 text-gray-500">
  <div className="flex flex-col space-y-1">
    <h1>{item.amountReceive} {item.personName}</h1>
    <h1>{item.bankName}</h1>
    <h1>{item.markedPayment} - {item.bookingNumber}</h1>
  </div>
</td>

                <td className="border p-2 text-center text-md">
                  {cleanPrice(
                    item.totalPrice || item.prize || item.prizeForUsers || 
                    item.price || item.priceForUsers || item.selectedPrize || 
                    item.totalCost || item.Prize || item.discountedPriceForUsers || 0
                  )}  <span className="text-sm">PKR</span>
                </td>
                <td className="border p-2  text-center text-md">
                  {cleanPrice(item.paid || 0)} <span className="text-sm">PKR</span> {/* Display Paid */}
                </td>
                <td className="border p-2  text-center text-md">
                  {cleanPrice(item.due || 0)} <span className="text-sm">PKR</span> {/* Display Due */}
                </td>
              </tr>
            ))
          )}

          {/* Total Cost Row */}
          <tr className="bg-gray-100 font-bold">
            <td className="border p-2" colSpan={4}><u>Total</u></td>
            <td className="border p-2 text-center">{totalCost} <span className="text-sm">PKR</span></td>
            <td className="border p-2 text-center">{totalPaid} <span className="text-sm">PKR</span></td> {/* Total Paid */}
            <td className="border p-2 text-center">{totalDue} <span className="text-sm">PKR</span></td> 
          </tr>
        </tbody>
      </table>
      {selectedBooking && (
        <BookingDetailsModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      )}
    </div>
  );
}