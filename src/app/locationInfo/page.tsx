'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { client } from '@/sanity/lib/client';

type LocationInfoType = {
  locations: string[];
};

export default function LocationInfo() {
  const [locations, setLocations] = useState<string[]>([]);

  useEffect(() => {
    const fetchLocations = async () => {
      const result: LocationInfoType = await client.fetch(
        `*[_type == "contactInfo"][0]{ locations }`
      );
      setLocations(result.locations || []);
    };

    fetchLocations();
  }, []);

  if (!locations.length) return <p className="text-center py-10">Loading...</p>;

  return (
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
      {locations.map((loc, idx) => (
        <p key={idx} className="text-gray-600 text-lg flex items-center justify-center mb-2">
          {loc}
        </p>
      ))}
    </motion.div>
  );
}
