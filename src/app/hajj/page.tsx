'use client';
import { useEffect, useState } from "react";
import {client} from "@/sanity/lib/client"
import Image from 'next/image';
import { FaMapMarkerAlt } from "react-icons/fa";
import { motion } from 'framer-motion';
import { FaPlane, FaHotel, FaUtensils, FaBus, FaMosque,FaFileAlt,FaCalendarAlt } from 'react-icons/fa';
import Link from 'next/link';
import PaymentDetails from '../payment/page';
import { hajjPack } from '@/sanity/lib/queries';
import { jwtDecode } from 'jwt-decode';
import { hajjFeature } from "@/sanity/lib/queries";
import Modal from "../components/modal";
import { ModalContentType } from "../types/destinations";
import HajjCard from "../hajjCard/page";
interface Feature {
  icon: JSX.Element;
  title: string;
  fields: (keyof ModalContentType)[];
}


const features:Feature[] = [
  {
    icon: <FaPlane size={50} className="text-blue-600" />,
    title: 'Ticket',
    fields: [
      'ticketHead',
      'airlineName',
      'airlineImage',
      'dep',
      'flightNum1',
      'dateOfFlight1',
      'route1',
      'time1',
      'return',
      'flightNum2',
      'dateOfFlight2',
      'route2',
      'time2',
    ],
  },
  {
    icon: <FaHotel size={40} className="text-blue-600" />,
    title: 'Hotel',
    fields: ['makkahHotelH', 'makkahHotel', 'madinaHotelH', 'madinaHotel'],
  },
  {
    icon: <FaUtensils size={40} className="text-blue-600" />,
    title: 'Food',
    fields: ['foodHead', 'food'],
  },
  {
    icon: <FaBus size={40} className="text-blue-600" />,
    title: 'Transport',
    fields: ['transportHead', 'transport'],
  },
  {
    icon: <FaMosque size={40} className="text-blue-600" />,
    title: 'Ziyarat & Ibadat',
    fields: ['holyZiaratHead', 'holyziarat'],
  },
  {
    icon: <FaFileAlt size={40} className="text-blue-600" />,
    title: 'Documents',
    fields: ['documentsH', 'doc1', 'doc2', 'doc3', 'doc4', 'doc5', 'doc6'],
  },
  {
    icon: <FaCalendarAlt size={40} className="text-blue-600" />,
    title: 'Day Durations',
    fields: ['azizaStay', 'azizaStayDetail','azizaStay2',"azizaStayDetail2", 'makkahStay', 'makkahStayDetail', 'madinaStay', 'madinaStayDetail'],
  },
];

export default function HajjPackage() {

  const [ tour, setTour ] = useState<ModalContentType[]>([])
    const [isApprovedUser, setIsApprovedUser] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);



    useEffect(() => {
      async function fetchData() {
        const data = await client.fetch(hajjFeature);
        setTour(data);
      }
      fetchData();
    }, []);

    
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
    
    const [clickedTitle, setClickedTitle] = useState<string | null>(null);
    const [modalContent, setModalContent] = useState<ModalContentType | null>(null);

    const handleIconClick = (title: string, fields: (keyof ModalContentType)[]) => {
      // Find the relevant data from the `tour` array based on the clicked icon title
      const content = tour.map((item) => {
        const filteredData: Partial<ModalContentType> = {};
        fields.forEach((field) => {
          if (field in item) {
            filteredData[field] = item[field] as ModalContentType[keyof ModalContentType];
          }
        });
        return filteredData;
      });
      setModalContent(content[0] as ModalContentType); // Cast to ModalContentType
      setClickedTitle(title); // Store the clicked icon's title
      setIsModalOpen(true);
    };
  
  return (
    <div className="min-h-screen  flex flex-col items-center p-6">
      <motion.h1 
        className="text-4xl font-bold text-center font-serif text-blue-800 mb-1 "
        initial={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
        whileInView={{ opacity: 1 }}
        
      >
        Hajj 2025
      </motion.h1>

<motion.p 
        className="text-lg text-center text-gray-700 max-w-2xl mb-6"
        initial={{ opacity: 0, y: 10 }}
      
        transition={{ delay: 0.2, duration: 0.6 }}
        whileInView={{ opacity: 1 }}
      >
        Experience the spiritual journey of Hajj with our exclusive packages. We offer exclusive Hajj packages with flexible durations and pricing based on double, triple, and sharing accommodations. Enjoy a comfortable stay, premium services, and hassle-free arrangements at the best rates. Book now for a spiritually fulfilling journey!
      </motion.p>

      
<h1 className="text-3xl text-center font-bold mt-8 mb-6 mx-4 font-sans">Below are our Hajj Packages, Book your spot Now!</h1>
<HajjCard/>

      <div className="min-h-screen flex flex-col items-center justify-center p-6">


        <div className='my-14'>
      <h2 className="text-3xl font-bold font-sans text-center text-gray-900 mb-6">Hajj Package Includes</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
  {features.map((feature, index) => (
    <motion.div
      key={index}
      className="flex flex-col items-center justify-center border-2 border-blue-600 p-6 rounded-lg shadow-md bg-white cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2, duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
      onClick={() => handleIconClick(feature.title, feature.fields)} // Handle icon click
    >
      {feature.icon}
      <p className="mt-3 text-lg font-semibold text-gray-800">{feature.title}</p>
    </motion.div>
  ))}
</div>
<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
  {modalContent && clickedTitle && (
    <div>
      {/* Display the icon and title */}
      <div className="flex items-center justify-center mb-4">
        {features.find((feature) => feature.title === clickedTitle)?.icon}
        <h2 className="text-2xl font-bold ml-2">{clickedTitle}</h2>
      </div>

      {/* Display content based on the clicked icon */}
      {clickedTitle === 'Ticket' && (
        <>
          {/* Ticket Section */}
          {modalContent.ticketHead && <h3 className="text-xl font-semibold">{modalContent.ticketHead}</h3>}
          {modalContent.airlineName && (
            <div className="mt-4">
              <h4 className="text-lg font-semibold">Airline: {modalContent.airlineName}</h4>
              {modalContent.airlineImage && (
                <Image
                  src={modalContent.airlineImage}
                  alt="Airline Logo"
                  width={100}
                  height={50}
                  className="mt-2"
                />
              )}
            </div>
          )}

          {/* Flight Details Table */}
          <div className="mt-6">
            <h4 className="text-lg font-semibold mb-4">Flight Schedule</h4>
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border-b">Flight Number</th>
                  <th className="py-2 px-4 border-b">Date</th>
                  <th className="py-2 px-4 border-b">Route</th>
                  <th className="py-2 px-4 border-b">Time</th>
                </tr>
              </thead>
              <tbody>
                {/* Departure Flight */}
                {modalContent.flightNum1 && (
                  <tr>
                    <td className="py-2 px-4 border-b text-center">{modalContent.flightNum1}</td>
                    <td className="py-2 px-4 border-b text-center">{modalContent.dateOfFlight1}</td>
                    <td className="py-2 px-4 border-b text-center">{modalContent.route1}</td>
                    <td className="py-2 px-4 border-b text-center">{modalContent.time1}</td>
                  </tr>
                )}
                {/* Return Flight */}
                {modalContent.flightNum2 && (
                  <tr>
                    <td className="py-2 px-4 border-b text-center">{modalContent.flightNum2}</td>
                    <td className="py-2 px-4 border-b text-center">{modalContent.dateOfFlight2}</td>
                    <td className="py-2 px-4 border-b text-center">{modalContent.route2}</td>
                    <td className="py-2 px-4 border-b text-center">{modalContent.time2}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {clickedTitle === 'Hotel' && (
        <>
          {/* Hotel Section */}
          {modalContent.makkahHotelH && <h2 className="text-xl font-bold">{modalContent.makkahHotelH}</h2>}
          {modalContent.makkahHotel && (
            <p className=" text-gray-700">{modalContent.makkahHotel}</p>
          )}
          {modalContent.madinaHotelH && <h2 className="text-xl mt-2 font-bold">{modalContent.madinaHotelH}</h2>}
          {modalContent.madinaHotel && (
            <p className=" text-gray-700">{modalContent.madinaHotel}</p>
          )}
        </>
      )}

      {clickedTitle === 'Food' && (
        <>
          {/* Food Section */}
          {modalContent.foodHead && <h2 className="text-xl font-bold flex">{modalContent.foodHead}</h2>}
          {modalContent.food && <p className="mt-2 text-gray-700">{modalContent.food}</p>}
        </>
      )}

      {clickedTitle === 'Transport' && (
        <>
          {/* Transport Section */}
          {modalContent.transportHead && <h2 className="text-xl font-bold">{modalContent.transportHead}</h2>}
          {modalContent.transport && <p className="mt-2 text-gray-700">{modalContent.transport}</p>}
        </>
      )}

      {clickedTitle === 'Documents' && (
        <>
          {/* Documents Section */}
          {modalContent.documentsH && <h2 className="text-xl font-bold">{modalContent.documentsH}</h2>}
          <div>
            <h3 className="font-semibold">Documents:</h3>
            <ul>
              {modalContent.doc1 && <li>{modalContent.doc1}</li>}
              {modalContent.doc2 && <li>{modalContent.doc2}</li>}
              {modalContent.doc3 && <li>{modalContent.doc3}</li>}
              {modalContent.doc4 && <li>{modalContent.doc4}</li>}
              {modalContent.doc5 && <li>{modalContent.doc5}</li>}
              {modalContent.doc6 && <li>{modalContent.doc6}</li>}
            </ul>
          </div>
        </>
      )}
  {clickedTitle === 'Ziyarat & Ibadat' && (
        <>
          {/* Documents Section */}
          {modalContent.holyZiaratHead && <h2 className="text-xl font-bold">{modalContent.holyZiaratHead}</h2>}
          <div>
        
            <ul>
              {modalContent.holyziarat && <li>{modalContent.holyziarat}</li>}
            </ul>
          </div>
        </>
      )}
      {clickedTitle === 'Day Durations' && (
        <>
          {/* Day Durations Section */}
          {modalContent.azizaStay && <h2 className="text-xl font-bold">{modalContent.azizaStay}</h2>}
          {modalContent.azizaStayDetail && <p className=" text-gray-700">{modalContent.azizaStayDetail}</p>}
          {modalContent.makkahStay && <h2 className="text-xl mt-2 font-bold">{modalContent.makkahStay}</h2>}
          {modalContent.makkahStayDetail && <p className=" text-gray-700">{modalContent.makkahStayDetail}</p>}
          {modalContent.azizaStay2 && <h2 className="text-xl font-bold">{modalContent.azizaStay2}</h2>}
          {modalContent.azizaStayDetail2 && <p className=" text-gray-700">{modalContent.azizaStayDetail2}</p>}
          {modalContent.madinaStay && <h2 className="text-xl mt-2 font-bold">{modalContent.madinaStay}</h2>}
          {modalContent.madinaStayDetail && <p className=" text-gray-700">{modalContent.madinaStayDetail}</p>}
        </>
      )}
    </div>
  )}
</Modal>
      </div>

      <h1 className="my-4 font-bold text-xl sm:text-2xl font-sans">Stay in Comfortable and Quality Makkah and Madina Hotels!</h1>
      <motion.div 
        className="flex flex-col md:flex-row items-center gap-6 my-12"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        whileHover={{ scale: 1.05 }}
        viewport={{ once: true }}
      >
        <Image src="/image/hotel1.jpeg" alt="Hotel" width={500} height={350} className="rounded-lg shadow-lg" />
        <Image src="/image/hotel2.jpg" alt="Hotel" width={500} height={350} className="rounded-lg shadow-lg" />
      </motion.div>
      
      <p className="text-lg text-center text-gray-700 max-w-2xl mb-6">
        Our 4/5 star hotels are selected to provide the highest level of comfort and convenience. Enjoy luxurious stays with modern amenities, exceptional service, and easy access to holy sites, ensuring a truly peaceful and hassle-free experience.
      </p>
      
      <h3 className="text-2xl font-semibold text-gray-900 text-center mb-6">We'd love to hear from you!</h3>
     
    </div>
    <div className="w-full p-8 bg-gray-100">
      <h2 className="text-3xl font-bold font-sans  mb-8 text-center text-blue-900">You Can Directly Contact:</h2>
      
  

      
      <div className="text-center">
        <p className="sm:text-2xl text-lg font-semibold font-serif">Alhaj M. Shaharyaar</p>
        <p className="text-sm text-gray-500 mt-2">03414311000</p>
        <p className="text-sm text-gray-500">&#9993;  ubbrotherspk@gmail.com</p>
      </div>
      <div className="text-center mt-4">
        <p className="sm:text-2xl text-lg font-semibold font-serif">Mirza Ali</p>
        <p className="text-sm text-gray-500 mt-2">03414314000</p>
        <p className="text-sm text-gray-500">&#9993;  ubbrothersconsultant@gmail.com</p>
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
