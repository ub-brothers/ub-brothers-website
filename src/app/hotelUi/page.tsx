"use client"
import React from "react";
import { motion } from "framer-motion";

const hotels = {
  makkah: [
    { name: "Lolo Eman/ Saif Al Majad", image: "https://www.besthotelinmecca.net/data/Pics/OriginalPhoto/16022/1602297/1602297507/mecca-pic-4.JPEG" },
    { name: "Land Premium", image: "https://www.funadiq.com/public/uploads/media/property-image_445d9ee5eaeafc93.jpg" },
    { name: "Nadaf Al Majad", image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/469043448.jpg?k=238a08a22e3daf205401c2d603ac750e66b2a9f85d2cf24239663c45a2218e8d&o=&hp=1" },
    { name: "Shuttle Service", image: "https://i.ytimg.com/vi/BKYoZ_4Q2gY/maxresdefault.jpg" },
  ],
  madina: [
    { name: "Dar Al Taiba", image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/174560269.jpg?k=63446b2dacfbe8302f87a6b38b65f9dde7006cf5ee6bd7c7bbfb45b4875d8f2c&o=&hp=1" },
    { name: "Zahrat Al Munawarah", image: "https://images.trvl-media.com/lodging/31000000/30200000/30199600/30199591/0908d8c2.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill" },
    { name: "Arjawan Madina", image: "https://www.tiviho.com/media/hotel_image/2_YQmPjSI.jpg" },
    { name: "Shuttle Service", image: "https://i.ytimg.com/vi/BKYoZ_4Q2gY/maxresdefault.jpg" },
  ],
};

const HotelSection = ({ title , hotels, description }: any) => {
  return (
    <motion.div className="py-10 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      <h2 className="text-3xl font-bold mb-6">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-4 md:px-20">
        {hotels.map((hotel:any, index:any) => (
          <motion.div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <img src={hotel.image} alt={hotel.name} className="w-full h-60 object-cover" />
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
  return (
    <div className="py-12">
      <h1 className="text-lg sm:mx-10 mx-4  text-center">We offer top-quality hotels with comfortable accommodations to ensure a relaxing stay. Our carefully selected hotels provide excellent amenities, exceptional service, and a welcoming atmosphere. Whether you're traveling for business or leisure, you can enjoy luxury and convenience at affordable rates. Book with us for a hassle-free experience and a memorable stay!</h1>
      <HotelSection
        title="Makkah Hotels"
        hotels={hotels.makkah}
        description="Our Makkah hotels offer a luxurious stay near Haram with 24/7 room service and delicious meals. Comfortable and clean rooms ensure a peaceful experience during your pilgrimage."
      />
      <HotelSection
        title="Madina Hotels"
        hotels={hotels.madina}
        description="Stay in our Madina hotels close to Masjid-e-Nabwi with top-class hospitality. Enjoy complimentary breakfast, easy transport access, and a spiritually calming atmosphere."
      />
    
    </div>
  );
}
