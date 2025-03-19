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
