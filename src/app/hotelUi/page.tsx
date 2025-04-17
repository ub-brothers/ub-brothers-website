"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/lib/client";

const builder = imageUrlBuilder(client);

const urlFor = (source: any) => builder.image(source);

const HotelSection = ({ title, hotels, description }: any) => {
  return (
    <motion.div className="py-10 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      <h2 className="text-3xl font-bold mb-6">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 px-4 md:px-20">
        {hotels.map((hotel: any, index: number) => (
          <motion.div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <img src={urlFor(hotel.image).width(600).url()} alt={hotel.name} className="w-full h-60 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{hotel.name}</h3>
            </div>
          </motion.div>
        ))}
      </div>
      <p className="mt-6 px-6 md:px-40 text-gray-600">{description}</p>
    </motion.div>
  );
};

export default function Hotels() {
  const [makkahHotels, setMakkahHotels] = useState([]);
  const [madinaHotels, setMadinaHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      const makkahRes = await client.fetch(`*[_type == "makkahHotelImg"][0].hotels`);
      const madinaRes = await client.fetch(`*[_type == "madinaHotelImg"][0].hotels`);
      setMakkahHotels(makkahRes || []);
      setMadinaHotels(madinaRes || []);
    };

    fetchHotels();
  }, []);

  return (
    <div className="py-12">
      <HotelSection
        title="Makkah Hotels"
        hotels={makkahHotels}
        description="Our Makkah hotels offer a luxurious stay near Haram with 24/7 room service and delicious meals. Comfortable and clean rooms ensure a peaceful experience during your pilgrimage."
      />
      <HotelSection
        title="Madina Hotels"
        hotels={madinaHotels}
        description="Stay in our Madina hotels close to Masjid-e-Nabwi with top-class hospitality. Enjoy complimentary breakfast, easy transport access, and a spiritually calming atmosphere."
      />
    </div>
  );
}
