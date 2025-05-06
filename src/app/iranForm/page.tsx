"use client";
import { motion } from 'framer-motion'; 
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import PaymentDetails from '../payment/page';
import jsPDF from 'jspdf';
import { jwtDecode } from 'jwt-decode';
import { FaBus, FaPassport, FaTicketAlt, FaHotel, FaUtensils } from "react-icons/fa";




function BookFormContent() {
  const searchParams = useSearchParams();
  const countryName = searchParams.get("countryName") || "";
  const shortDescription = searchParams.get("shortDescription") || "";
  const prize = searchParams.get("prize") || "";
  const priceForUsers = searchParams.get("priceForUsers") || "";

  const modalContent = {
    transport : searchParams.get("transport") ,
    meal : searchParams.get("meal") ,
    hotel : searchParams.get("hotel") ,
    visa : searchParams.get("visa") ,
    ticket : searchParams.get("ticket") ,
    airlineName: searchParams.get("airlineName"),
    airlineImage: searchParams.get("airlineImage"),
    flightNum1: searchParams.get("flightNum1"),
    dateOfFlight1: searchParams.get("dateOfFlight1"),
    route1: searchParams.get("route1"),
    time1: searchParams.get("time1"),
    flightNum2: searchParams.get("flightNum2"),
    dateOfFlight2: searchParams.get("dateOfFlight2"),
    route2: searchParams.get("route2"),
    time2: searchParams.get("time2"),
  }


  const [userName, setUserName] = useState("");
  const [userNumber, setUserNumber] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [isApprovedUser, setIsApprovedUser] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentModalContent, setCurrentModalContent] = useState("");
  const [currentModalTitle, setCurrentModalTitle] = useState("");
  const openModal = (title: string) => {
    setCurrentModalTitle(title);
    let content = "";
    
    switch(title.toLowerCase()) {
      case "transport":
        content = modalContent.transport || "Transport details not available";
        break;
      case "visa":
        content = modalContent.visa || "Visa details not available";
        break;
      case "ticket":
        content = modalContent.ticket || "";
        // For ticket, you might want to show flight details too
        if (modalContent.airlineName) {
          content += `\n\nAirline: ${modalContent.airlineName}`;
          content += `\nFlight Number 1: ${modalContent.flightNum1}`;
          content += `\nDate: ${modalContent.dateOfFlight1}`;
          content += `\nRoute: ${modalContent.route1}`;
          content += `\nTime: ${modalContent.time1}`;
          if (modalContent.flightNum2) {
            content += `\n\nFlight Number 2: ${modalContent.flightNum2}`;
            content += `\nDate: ${modalContent.dateOfFlight2}`;
            content += `\nRoute: ${modalContent.route2}`;
            content += `\nTime: ${modalContent.time2}`;
          }
        }
        break;
      case "hotel":
        content = modalContent.hotel || "Hotel details not available";
        break;
      case "meal":
        content = modalContent.meal || "Meal details not available";
        break;
      default:
        content = "Details not available";
    }
    
    setCurrentModalContent(content);
    setIsModalOpen(true);
  };
  const getFilteredPackages = (routeType: string) => {
    const allPackages = [
      { icon: <FaBus size={30} className="text-blue-500" />, title: "Transport" },
      { icon: <FaPassport size={30} className="text-blue-500" />, title: "Visa" },
      { icon: <FaTicketAlt size={30} className="text-blue-500" />, title: "Ticket" },
      { icon: <FaHotel size={30} className="text-blue-500" />, title: "Hotel" },
      { icon: <FaUtensils size={30} className="text-blue-500" />, title: "Meal" },
    ];
  
    if (routeType.toLowerCase().includes("by road")) {
      // Exclude Visa and Ticket for road travel
      return allPackages.filter(pkg => pkg.title !== "Visa" && pkg.title !== "Ticket");
    }
  
    // For air and other types, show all
    return allPackages;
  };
  
  const filteredPackages = getFilteredPackages(shortDescription);
  


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsConfirmed(true);
    e.preventDefault();
    setIsSubmitting(true);
    const storedEmail = localStorage.getItem("userEmail");
    const formData = { userName, userNumber, userEmail, userMessage, countryName, shortDescription, prize, priceForUsers,storedUserEmail:storedEmail };

    try {
      const res = await fetch("/api/iraqForm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        alert("Booking Submitted successfully!");
        setUserName("");
        setUserNumber("");
        setUserEmail("");
        setUserMessage("");
      } else {
        alert("Error sending booking request.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    finally {
      setIsSubmitting(false); // 👈 enable button again
    }
  };

    useEffect(()=>{
    
    
          const token = localStorage.getItem("token");
    
          if (token) {
            try {
              const decoded: any = jwtDecode(token);
           
      
              if (decoded.approved === true || decoded.approved === "true") {
                setIsApprovedUser(true);
              } else {
                setIsApprovedUser(false);
              }
            } catch (error) {
              console.error("Invalid token", error);
            }
          }
      
        }, [])

  const generatePDF = () => {
    const doc = new jsPDF();

   
    const companyLogo = "/image/logo.png"; 
    doc.addImage(companyLogo, "PNG", 10, 10, 30, 30); 

  
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 128); 
    doc.text("UB Brothers Travel & Tours", 45, 20); 

   
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Black color
    doc.text("Iran Ziyarat Booking Details", 45, 30);

    // Add Form Data
    doc.setFontSize(14);
    let y = 50; // Starting Y position for form data

    // Function to add a field with dynamic spacing
    const addField = (label:any, value:any) => {
      doc.setFont("helvetica", "bold"); // Bold for label
      doc.setTextColor(0, 0, 128); // Dark blue for label
      doc.text(`${label}:`, 10, y); // Write the label

      // Calculate the x-position for the value dynamically
      const labelWidth = doc.getTextWidth(`${label}:`); // Get the width of the label
      const valueX = 15 + labelWidth; // Add some padding (e.g., 15) after the label

      doc.setFont("helvetica", "normal"); // Normal for value
      doc.setTextColor(0, 0, 0); // Black for value
      doc.text(value, valueX, y); // Write the value at the calculated x-position

      y += 10; // Move down for the next field
    };

    // Add fields with dynamic spacing
    addField("Full Name", userName);
    addField("Phone Number", userNumber);
    addField("Email Address", userEmail);
    addField("Ziyarat to", countryName);
    addField("Ziyarat Route", shortDescription);
    addField("Price", `${isApprovedUser ? priceForUsers : prize} PKR/-`);

    // Add Message field with multi-line support
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 128); // Dark blue for label
    doc.text("Message:", 10, y); // Write the label
    y += 7; // Move down slightly for the value
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0); // Black for value
    const splitMessage = doc.splitTextToSize(userMessage, 180); // Wrap long text
    doc.text(splitMessage, 10, y); // Write the message
    y += splitMessage.length * 7; // Adjust spacing based on the number of lines

    // Save the PDF
    doc.save("iran-ziyarat-booking-details.pdf");
  };

  return (
    <div>
      <div className="relative w-full mb-6 h-[380px]">
        <img src="/image/iraq.webp" className="w-full h-full object-cover" alt="Travel Image" />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <h2 className="text-white text-2xl md:text-4xl font-bold text-center">
            Book your Ziyarat package today and embark on a trip filled with faith and serenity
          </h2>
        </div>
      </div>

      <div className="mt-8 p-6 bg-gray-100 rounded-lg shadow-lg w-[90%] sm:w-[50%] mx-auto">
        <h2 className="text-xl font-bold mb-4 text-center">Book Your Ziyarat</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-semibold text-gray-700">Full Name</label>
          <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} className="w-full p-2 mb-4 border rounded" placeholder="Enter your name" />

          <label className="block mb-2 font-semibold text-gray-700">Phone Number</label>
          <input type="text" value={userNumber} onChange={(e) => setUserNumber(e.target.value)} className="w-full p-2 mb-4 border rounded" placeholder="Enter your number" />

          <label className="block mb-2 font-semibold text-gray-700">Email Address</label>
          <input type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} className="w-full p-2 mb-4 border rounded" placeholder="Enter your email" />

          <label className="block mb-2 font-semibold text-gray-700">Ziyarat Places</label>
          <input type="text" value={countryName} readOnly className="w-full p-2 mb-4 border rounded bg-gray-100" />

          <label className="block mb-2 font-semibold text-gray-700">Ziyarat Route</label>
          <input type="text" value={shortDescription} readOnly className="w-full p-2 mb-4 border rounded bg-gray-100" />

          <label className="block mb-2 font-semibold text-gray-700">Price</label>
          <input type="text" value={`${isApprovedUser ? priceForUsers : prize} PKR/-`} readOnly className="w-full p-2 mb-4 border rounded bg-gray-100" />

          <label className="block mb-2 font-semibold text-gray-700">Your Message</label>
          <textarea value={userMessage} onChange={(e) => setUserMessage(e.target.value)} className="w-full p-2 mb-4 border rounded" placeholder="Enter your message (optional)" rows={3} />

          <button  disabled={isSubmitting} type="submit" className={`w-full my-2 text-white py-2 rounded-md transition 
          ${isSubmitting 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-orange-500'}`}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
          {isConfirmed && (
        <button
        type='button'
         onClick={generatePDF}
          className="w-full bg-blue-600 text-white py-2 mt-4 rounded-md hover:bg-orange-500 transition"
        >
          Download Form Details (PDF)
        </button>)}
        </form>
      </div>
      <h2 className="text-2xl font-semibold text-gray-800 text-center my-6">Package Includes</h2>
      <div className="grid  md:grid-cols-5 sm:grid-cols-2 gap-4 mx-2 justify-center">
        {filteredPackages.map((pkg, index) => (
          <motion.div
            key={index}
            className="border border-blue-500 rounded-lg p-4 flex flex-col items-center cursor-pointer hover:bg-blue-50"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            onClick={() => openModal(pkg.title)}
          >
            {pkg.icon}
            <h3 className="text-lg font-medium text-gray-700 mt-2">{pkg.title}</h3>
          </motion.div>
        ))}
      </div>

      {isModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">{currentModalTitle} Details</h3>
          <button 
            onClick={() => setIsModalOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Special Ticket/Flight Section */}
        {currentModalTitle === "Ticket" ? (
          <div>
            {/* Airline Info */}
            {(modalContent.airlineName || modalContent.airlineImage) && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                {modalContent.airlineImage && (
                  <img 
                    src={modalContent.airlineImage} 
                    alt="Airline Logo" 
                    className="w-32 h-auto object-contain border p-2 rounded"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                )}
                {modalContent.airlineName && (
                  <div>
                    <h4 className="text-lg font-semibold">Airline Information</h4>
                    <p className="text-gray-700">{modalContent.airlineName}</p>
                  </div>
                )}
              </div>
            )}

            {/* Flight Schedule Table */}
            {(modalContent.flightNum1 || modalContent.flightNum2) && (
              <div className="mt-4">
                <h4 className="text-lg font-semibold mb-3">Flight Schedule</h4>
                
                {/* Desktop Table */}
                <div className="hidden sm:block overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200 text-sm">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="py-2 px-4 border-b text-left">Type</th>
                        <th className="py-2 px-4 border-b text-left">Flight #</th>
                        <th className="py-2 px-4 border-b text-left">Date</th>
                        <th className="py-2 px-4 border-b text-left">Route</th>
                        <th className="py-2 px-4 border-b text-left">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {modalContent.flightNum1 && (
                        <tr>
                          <td className="py-2 px-4 border-b font-medium text-blue-600">Departure</td>
                          <td className="py-2 px-4 border-b">{modalContent.flightNum1}</td>
                          <td className="py-2 px-4 border-b">{modalContent.dateOfFlight1}</td>
                          <td className="py-2 px-4 border-b">{modalContent.route1}</td>
                          <td className="py-2 px-4 border-b">{modalContent.time1}</td>
                        </tr>
                      )}
                      {modalContent.flightNum2 && (
                        <tr>
                          <td className="py-2 px-4 border-b font-medium text-blue-600">Return</td>
                          <td className="py-2 px-4 border-b">{modalContent.flightNum2}</td>
                          <td className="py-2 px-4 border-b">{modalContent.dateOfFlight2}</td>
                          <td className="py-2 px-4 border-b">{modalContent.route2}</td>
                          <td className="py-2 px-4 border-b">{modalContent.time2}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="sm:hidden space-y-4">
                  {modalContent.flightNum1 && (
                    <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                      <div className="font-semibold text-blue-700 mb-2 text-lg">Departure Flight</div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <div className="text-sm text-gray-500">Flight #</div>
                          <div className="font-medium">{modalContent.flightNum1}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Date</div>
                          <div className="font-medium">{modalContent.dateOfFlight1}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Route</div>
                          <div className="font-medium">{modalContent.route1}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Time</div>
                          <div className="font-medium">{modalContent.time1}</div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {modalContent.flightNum2 && (
                    <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                      <div className="font-semibold text-blue-700 mb-2 text-lg">Return Flight</div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <div className="text-sm text-gray-500">Flight #</div>
                          <div className="font-medium">{modalContent.flightNum2}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Date</div>
                          <div className="font-medium">{modalContent.dateOfFlight2}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Route</div>
                          <div className="font-medium">{modalContent.route2}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Time</div>
                          <div className="font-medium">{modalContent.time2}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Additional ticket information if any */}
            {currentModalContent && (
              <div className="mt-6 pt-4 border-t">
                <h4 className="text-lg font-semibold mb-3">Additional Information</h4>
                <div className="text-gray-700 whitespace-pre-line bg-gray-50 p-4 rounded-lg">
                  {currentModalContent.split('\n').filter(line => line.trim() !== '').map((paragraph, index) => (
                    <p key={index} className="mb-3">{paragraph}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* For non-Ticket modals (Transport, Visa, Hotel, Meal) */
          <div className="text-gray-700 whitespace-pre-line bg-gray-50 p-4 rounded-lg">
            {currentModalContent.split('\n').filter(line => line.trim() !== '').map((paragraph, index) => (
              <p key={index} className="mb-3">{paragraph}</p>
            ))}
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
)}
        
    </div>
  );
}

export default function BookForm() {
 

  return (

    <div>
       <Suspense fallback={<p className="text-center text-gray-600">Loading...</p>}>
      <BookFormContent />
    </Suspense>
    <h1 className="text-center mx-2 font-semibold my-5"><i>Thank you for reaching out! We will get back to you as soon as possible.</i></h1>
  

    <div className="w-full p-8 mt-10 bg-gray-100">
      <h2 className="text-3xl font-semibold font-sans mb-4 text-center text-black"><u>You Can Directly Contact:</u></h2>

      
      <div className="text-center">
        <p className="sm:text-2xl text-lg font-semibold font-serif">Alhaj M. Shaharyaar</p>
        <p className="text-lg text-gray-800 mt-2">03414311000</p>
        <p className="sm:text-2xl text-lg font-semibold font-serif mt-4">Mirza Ali</p>
        <p className="text-lg text-gray-800 mt-2">03414314000</p>
      </div>
    </div>
    

     <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white shadow-lg my-6 rounded-2xl mx-auto p-6 w-full md:w-1/3 text-center border-t-4 border-orange-500"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center justify-center gap-2">
              <FaMapMarkerAlt /> Office Locations
            </h2>
            <p className="text-gray-600 text-lg flex items-center justify-center mb-2">
          7-Amin Arcade (Hotel Ambassador) Durand Road, Near Shimla Pahari, Lahore Pakistan.
            </p>
            <hr/>
            <p className="text-gray-600 text-lg flex items-center justify-center mt-2">
           H9W3+P5F, Tariq Shaheed Road, Bhagatpura, Lahore Pakistan.
            </p>
          </motion.div> 
<PaymentDetails/>
    </div>
  );
}
