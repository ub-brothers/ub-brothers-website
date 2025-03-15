"use client";
import { useEffect, useState } from "react";
import { format, differenceInMilliseconds, addHours } from "date-fns";
import {FaTimes, FaFilePdf } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import jsPDF from "jspdf";
import { useProfile } from "../profileContext";


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
  createdAt: string;
  meal: string;
  totalPrice: number;
  adults: number;
  children: number;
  infants: number;
  userEmail: string;
  phoneNumber: string;
  emailAddress: string;
  flights: Flight[];
  passengers: Passenger[];
  status: string; // "pending", "confirmed", "cancelled"
  isConfirmed: boolean;
  pnr: string;
};

const MyBookings = ({ searchParams }: { searchParams: { filterStatus?: "cancelled" | "confirmed" | "all" } }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const { filterStatus } = searchParams;

  const { profileImage } = useProfile();

  
  const airlineImages = {
    "Fly Jinnah": "/image/flyjinnah.png",
    "Air Sial": "/image/airsial.png",
    "Saudia": "/image/saudia.png",
    "Serene Air": "/image/sereneair.png",
    "Salam Air": "/image/salamair.png",
  };

  useEffect(() => {
    const storedUserEmail = localStorage.getItem("userEmail");
    if (storedUserEmail) {
      fetch("/api/getUserBooking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail: storedUserEmail }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) {
            setBookings(data);
          }
          setLoading(false);
        })
        .catch((error) => console.error("Error fetching bookings:", error));
    }
  }, []);

  const isCancellable = (createdAt: string) => {
    const bookingTime = new Date(createdAt).getTime();
    const currentTime = Date.now();
    const threeHours = 3 * 60 * 60 * 1000;
    return currentTime - bookingTime < threeHours;
  };

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

  const cropImageToCircle = (imageUrl: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
  
      if (!ctx) {
        reject(new Error("Canvas 2D context is not supported"));
        return;
      }
  
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = imageUrl;
  
      img.onload = () => {
        const size = Math.min(img.width, img.height);
        canvas.width = size;
        canvas.height = size;
  
        // **Transparent background**
        ctx.clearRect(0, 0, size, size);
        ctx.fillStyle = "rgba(0,0,0,0)"; // Transparent background
        ctx.fillRect(0, 0, size, size);
  
        ctx.save();
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
  
        ctx.drawImage(img, 0, 0, size, size);
        ctx.restore();
  
        // **Use PNG instead of JPEG**
        const croppedImageUrl = canvas.toDataURL("image/png");
        resolve(croppedImageUrl);
      };
  
      img.onerror = () => {
        reject(new Error("Failed to load image"));
      };
    });
  };

  const handleDownloadPDF = async (booking: Booking) => {
    const doc = new jsPDF();
  
    // Add airline image to the top right
    const airlineImageUrl = airlineImages[booking.airlineName as keyof typeof airlineImages];
    const pageWidth = doc.internal.pageSize.getWidth();
    const imageWidth = 60;
    const imageHeight = 40;
    const imageX = pageWidth - imageWidth - 10;
    doc.addImage(airlineImageUrl, "PNG", imageX, 10, imageWidth, imageHeight);
  
   

    if (profileImage) {
      try {
        const croppedProfileImage = await cropImageToCircle(profileImage);
        const profileImageWidth = 30;
        const profileImageHeight = 30;
        const profileImageX = 10;
        const profileImageY = 10;
        doc.addImage(
          croppedProfileImage,
          "PNG",
          profileImageX,
          profileImageY,
          profileImageWidth,
          profileImageHeight
        );
      } catch (error) {
        console.error("Failed to crop profile image:", error);
      }
    }
  
    const bookingIconUrl = "/image/icon2.png"; // Path to your booking icon
    const bookingIconWidth = 12; // Icon width
    const bookingIconHeight = 12; // Icon height
    
    // Draw "Booking Details" section
    doc.setFillColor(230, 230, 230);
    doc.rect(10, 45, 190, 10, "F");
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    
    const bookingText = "Booking Details";
    const bookingTextX = 15; // Text ka X position
    const bookingTextWidth = doc.getTextWidth(bookingText);
    
    // "Booking Details" text likhna
    doc.text(bookingText, bookingTextX, 52);
    
    // Image ko right side me lagana
    const bookingIconX = bookingTextX + bookingTextWidth + 1; // 5px ka gap
    const bookingIconY = 45 + (10 / 2) - (bookingIconHeight / 2); // Center align with text
    
    doc.addImage(bookingIconUrl, "PNG", bookingIconX, bookingIconY, bookingIconWidth, bookingIconHeight);
  
    let y = 65;

  // Airline and PNR
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(64, 64, 64); // Dark gray color
  doc.text(`Airline: ${booking.airlineName}`, 10, y);
  y += 7; // Adjusted vertical spacing

  doc.text(`Booking Reference (PNR): ${booking.pnr}`, 10, y);
  y += 7; // Adjusted vertical spacing

  doc.text(`Total Price: ${booking.totalPrice}`, 10, y);
  y += 15; // Adjusted vertical spacing

  // Flight details
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 0, 120);
  doc.text("Flight Details", 10, y);
  y += 5;
  doc.setFont("helvetica", "normal");
  doc.setTextColor(0, 0, 0);

  // Flight table
  doc.setFillColor(200, 220, 255);
  doc.rect(10, y, 190, 8, "F");
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 0, 0);
  doc.text("Date", 12, y + 5);
  doc.text("Flight No", 55, y + 5);
  doc.text("Route", 80, y + 5);
  doc.text("Time", 115, y + 5);
  doc.text("Baggage", 145, y + 5);
  doc.text("Meal", 175, y + 5);
  y += 12;

  doc.setFont("helvetica", "normal");
  booking.flights.forEach((flight, idx) => {
    doc.text(`${flight.depOrReturn} - ${flight.date}`, 12, y);
    doc.text(flight.flightNumber || "", 55, y);
    doc.text(flight.originDestination || "", 80, y);
    doc.text(flight.time || "", 115, y);
    doc.text(flight.baggage || "", 145, y);
    doc.text(idx === 0 ? booking.meal ?? "" : "", 175, y);
    y += 8;
  });

  y += 10;

  // Passenger details table
doc.setFontSize(12);
doc.setFont("helvetica", "bold");
doc.setTextColor(0, 0, 120);
doc.text("Passenger Details", 10, y);
y += 5;

// Table headers
doc.setFillColor(200, 220, 255);
doc.rect(10, y, 190, 8, "F"); // 190mm width tak limit
doc.setFontSize(10);
doc.setFont("helvetica", "bold");
doc.setTextColor(0, 0, 0);

// Adjusted column positions
doc.text("Type", 12, y + 5);
doc.text("Name", 40, y + 5);
doc.text("Passport No.", 85, y + 5); // Shortened heading
doc.text("DOB", 125, y + 5);
doc.text("Expiry", 155, y + 5); // Shortened heading
doc.text("Nationality", 180, y + 5); // Shifted left
y += 12;

// Table rows
doc.setFont("helvetica", "normal");
booking.passengers.forEach((passenger, index) => {
  const type =
    index < booking.adults
      ? `Adult ${index + 1}`
      : index < booking.adults + booking.children
      ? `Child ${index - booking.adults + 1}`
      : `Infant ${index - booking.adults - booking.children + 1}`;

  doc.text(type, 12, y);
  doc.text(`${passenger.name} ${passenger.surname}`, 40, y);
  doc.text(passenger.passportNumber, 85, y); // Shifted left
  doc.text(passenger.dob, 125, y);
  doc.text(passenger.passportExpiry, 155, y); // Shifted left
  doc.text(passenger.nationality, 180, y); // Shifted left
  y += 8;
});

// Convert the PDF to a Blob URL
const pdfBlob = doc.output("blob");
const pdfUrl = URL.createObjectURL(pdfBlob);

// Open the PDF in a new tab for preview
const previewWindow = window.open(pdfUrl);
if (!previewWindow) {
  alert("Please allow pop-ups to preview the PDF.");
  return;
}

// Add a download button in the preview window
previewWindow.document.write(`
<html>
  <head>
    <title>UB Brothers Ticket PDF Preview</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        padding: 20px;
        text-align: center;
      }
      .pdf-container {
        margin: 0 auto;
        max-width: 800px;
      }
      .pdf-actions {
        margin-bottom: 20px; /* Move buttons above the PDF */
      }
      .pdf-actions button {
        background-color: #007bff;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        margin: 0 10px;
      }
      .pdf-actions button:hover {
        background-color: #0056b3;
      }
    </style>
  </head>
  <body>
    <div class="pdf-container">
      <!-- Buttons above the PDF -->
      <div class="pdf-actions">
       <a href="${pdfUrl}" download="booking-ticket.pdf">
  <button>Download PDF</button>
</a>
      </div>
      <!-- PDF Preview -->
      <embed src="${pdfUrl}" type="application/pdf" width="100%" height="600px" />
    </div>
    
  </body>
</html>
`);
previewWindow.document.close();
  };

  const filteredBookings = bookings
  .filter((booking) => {
    if (filterStatus === "cancelled") {
      return booking.status === "cancelled";
    } else if (filterStatus === "confirmed") {
      return booking.isConfirmed;
    } else {
      return true; // Show all bookings
    }
  })
  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const Timer = ({ createdAt, status, isConfirmed }: { createdAt: string; status: string; isConfirmed: boolean }) => {
    const [remainingTime, setRemainingTime] = useState("");

    useEffect(() => {
      const interval = setInterval(() => {
        const bookingTime = new Date(createdAt);
        const expiryTime = addHours(bookingTime, 3);
        const remainingTimeMs = differenceInMilliseconds(expiryTime, new Date());

        if (remainingTimeMs <= 0 || status === "cancelled" || isConfirmed) {
          setRemainingTime("");
          clearInterval(interval);
        } else {
          const hours = Math.floor(remainingTimeMs / (1000 * 60 * 60));
          const minutes = Math.floor((remainingTimeMs % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((remainingTimeMs % (1000 * 60)) / 1000);
          setRemainingTime(`${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`);
        }
      }, 1000);

      return () => clearInterval(interval);
    }, [createdAt, status, isConfirmed]);

    if (status === "cancelled") {
      return <span className="text-red-600 text-center">Cancelled</span>;
    } else if (isConfirmed) {
      return <span className="text-green-600">Confirmed</span>;
    } else if (remainingTime) {
      return (
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-600">Ticket on Hold</span>
          <span className="text-yellow-600">{remainingTime}</span>
        </div>
      );
    } else {
      return <span className="text-red-600">Expired</span>;
    }
  };
   const [loading, setLoading] = useState(true);
  if (loading) return <p className="text-center text-lg font-semibold">Loading bookings...</p>;

  return (
    <div className="min-w-[1000px] mx-auto p-4" >

<Tooltip id="tooltip" />
      {filteredBookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings found.</p>
      ) : (
        <table  className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-700 text-white text-sm">
              <th className=" border-r border-gray-300 px-4 p-2 ">Booking Details</th>
              <th className="border-r border-gray-300 px-4 p-2">Flight Details</th>
              <th className="border-r border-gray-300 px-4 p-2">Passengers</th>
              <th className="border-r border-gray-300 px-4 p-2">Price (PKR)</th>
              <th className="border-r border-gray-300 px-4 p-2">Status</th>
              <th className="border-r border-gray-300 px-4 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking) => {
              const bookingTime = new Date(booking.createdAt);
              const expiryTime = addHours(bookingTime, 3);
              const remainingTimeMs = differenceInMilliseconds(expiryTime, new Date());
              const remainingTime = remainingTimeMs > 0 ? `${Math.floor(remainingTimeMs / (1000 * 60 * 60))}:${Math.floor((remainingTimeMs % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, "0")}:${Math.floor((remainingTimeMs % (1000 * 60)) / 1000).toString().padStart(2, "0")}` : "";
            return(
              
              <>
              <tr key={booking._id} className="text-left bg-blue-100">
                <td className="border p-2 border-r border-gray-300 px-4">
                  <div className="flex flex-col text-left">
                    <img
                      src={airlineImages[booking.airlineName as keyof typeof airlineImages]}
                      alt={booking.airlineName}
                      className="w-20 h-16 object-contain"
                    />
                     <p className="font-semibold">{booking.airlineName}</p>
                    <p className="text-sm text-gray-600">
                      <b>Booking Reference (PNR)</b>: {booking.pnr}
                    </p>
                    
                    <span className="text-sm text-gray-600">
                      <b>Created At</b>: {format(new Date(booking.createdAt), "dd MMM yyyy")}
                    </span>
                   
                  </div>
                </td>
                <td className="border p-2 text-sm text-gray-600 border-r border-gray-300 px-4">
                  {booking.flights.map((flight, idx) => (
                    <div key={idx} className="text-left mb-4">
                     
                      <p>{flight.originDestination}</p>
                      <p>{flight.depOrReturn}</p>
                      <p>{flight.date} {flight.time}</p>
                      <p><b>Flight #</b>  {flight.flightNumber}</p>
                      {idx < booking.flights.length - 1 && <hr className="my-2 border-gray-300" />}
                    </div>
                  ))}
                </td>
                <td className="border p-2 border-r border-gray-300 px-4">
                  {booking.passengers.map((p, idx) => (
                    <div key={idx} className="text-left">
                      <p>{p.name} {p.surname}</p>
                      
                    </div>
                  ))}
                </td>
                <td><p className="text-sm text-center text-gray-600">{booking.totalPrice} PKR/-</p></td> 
                <td className="border p-2 border-r border-gray-300 px-4">
                  <Timer createdAt={booking.createdAt} status={booking.status} isConfirmed={booking.isConfirmed} />
                </td>
                <td className="border p-2">
                  
                  {booking.status !== "cancelled" &&(
                    <div className="flex items-center justify-center gap-4">
                      {isCancellable(booking.createdAt) && (
                        <button
                          onClick={() => handleCancelClick(booking._id)}
                          className="text-red-600 hover:text-red-800"
                          title="Cancel Booking"
                          data-tooltip-id="tooltip"
  data-tooltip-content="Cancel Booking"
                        >
                          <FaTimes />
                        </button>
                      )}
                     {booking.status !== "cancelled"  && booking.isConfirmed && (
          <button
            onClick={() => handleDownloadPDF(booking)}
            className="text-blue-600 hover:text-blue-800"
             title="Download Ticket"
             data-tooltip-id="tooltip"
  data-tooltip-content="Download Ticket"
          >
            <FaFilePdf />
          </button>
        )}
                    </div>
                  )}
                </td>
                
              </tr> 
              <tr>
            <td colSpan={6} className="border-b border-gray-300"></td>
          </tr>
             </>
            
            )})}
              
          </tbody>
        </table>
      )}

      {/* Modal for Cancellation Confirmation */}
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