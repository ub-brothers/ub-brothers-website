'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';
import { client } from '@/sanity/lib/client'; // apne client ka path theek rakhna

type ContactData = {
  phoneNumbers: string[];
  emails: string[];
  locations: string[];
};

export default function ContactInfo() {
  const [data, setData] = useState<ContactData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await client.fetch(
        `*[_type == "contactInfo"][0]{
          phoneNumbers,
          emails,
          locations
        }`
      );
      setData(result);
    };

    fetchData();
  }, []);

  if (!data) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 items-center justify-center flex-wrap">
      {/* Phone Numbers */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        className="bg-white shadow-lg rounded-2xl p-6 w-full md:w-1/3 text-center border-t-4 border-blue-500"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center justify-center gap-2">
          <FaPhoneAlt /> Contact Numbers
        </h2>
        {data.phoneNumbers.map((num, idx) => (
          <p key={idx} className="text-gray-600 text-lg flex items-center justify-center gap-2">
            <FaPhoneAlt /> {num}
          </p>
        ))}
      </motion.div>

      {/* Emails */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        className="bg-white shadow-lg rounded-2xl p-6 w-full md:w-1/3 text-center border-t-4 border-green-500"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center justify-center gap-2">
          <FaEnvelope /> Email Us
        </h2>
        {data.emails.map((email, idx) => (
          <p key={idx} className="text-gray-600 text-lg flex items-center justify-center gap-2">
            <FaEnvelope /> {email}
          </p>
        ))}
      </motion.div>

      {/* Locations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        className="bg-white shadow-lg rounded-2xl p-6 w-full md:w-1/3 text-center border-t-4 border-orange-500"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center justify-center gap-2">
          <FaMapMarkerAlt /> Office Locations
        </h2>
        {data.locations.map((loc, idx) => (
          <>
            <p key={idx} className="text-gray-600 text-lg flex items-center justify-center mb-2">
              {loc}
            </p>
            {idx === 0 && <hr />}
          </>
        ))}
      </motion.div>
    </div>
  );
}
