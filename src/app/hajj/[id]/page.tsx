"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ContactInfo from "@/app/contactDiv/page";
import { HajjType } from "@/app/types/destinations";
import { sanityFetch } from "@/sanity/lib/client";
import { hajjDetail } from "@/sanity/lib/queries";

export default function DetailPage({ params }: { params: { id: string } }) {
  const [countries, setCountries] = useState<HajjType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await sanityFetch({ query: hajjDetail, params: { id: params.id } });
        setCountries(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!countries) return <p className="text-center mt-10">Data not found.</p>;

  return (
    <div>
      <div key={countries._id} className="mt-10">
        <div className="text-center flex w-[100%]">
          {/* Adding Framer Motion to images */}
          {countries.imageUrl2 && (
            <motion.img
              src={countries.imageUrl2}
              className="h-[300px] w-[370px] mx-auto hidden xl:block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          )}
          {countries.imageUrl && (
            <motion.img
              src={countries.imageUrl}
              className="sm:h-[300px] h-[240px] sm:w-[370px] w-[280px] mx-4 sm:mx-auto "
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          )}
          {countries.imageUrl3 && (
            <motion.img
              src={countries.imageUrl3}
              className="h-[300px] w-[370px] mx-auto hidden md:block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          )}
        </div>

        <div className="mx-6">
          <h1 className="sm:text-3xl text-xl font-bold mt-5 sm:mt-10 font-serif">
            <u>{countries.countryName}:</u>
          </h1>
          <h3 className="my-2 text-lg font-semibold">{countries.dayDuration}</h3>
          <h2 className="my-2 text-sm sm:text-lg">{countries.shortDescription}</h2>
          <h1 className="mt-4 mb-2 text-xl font-serif font-semibold">{countries.includeH}</h1>
          {[countries.include1, countries.include2, countries.include3, countries.include4, countries.include5, countries.include6, countries.include7].map(
            (item, index) => item && <h2 key={index}>-{item}</h2>
          )}

          <h1 className="mt-4 text-lg font-sans font-semibold">{countries.maktab}</h1>
          <h2 className="my-1 text-lg font-sans font-semibold">{countries.maktabZone}</h2>

          <h1 className="mt-4 font-serif font-semibold text-lg">{countries.hajjDaysH}</h1>
          <h2>{countries.hajjDays}</h2>

          <h1 className="mt-4 font-serif font-semibold text-lg">{countries.azizaBuildingH}</h1>
          <h2>{countries.azizaBuildingDays}</h2>

          <h1 className="mt-4 font-serif font-semibold text-lg">{countries.makkahHotelH}</h1>
          {[countries.makkahHotel1, countries.makkahHotel2, countries.makkahHotel3].map(
            (hotel, index) => hotel && <h2 key={index}>{hotel}</h2>
          )}

          <h1 className="mt-4 font-serif font-semibold text-lg">{countries.madinaHotelH}</h1>
          <h2>{countries.madinaHotelName}</h2>

          <h1 className="mt-4 font-serif font-semibold text-lg">
            <u>Room Categories:</u>
          </h1>
          {[
            { label: countries.sharingH, price: countries.sharingPrize },
            { label: countries.tripleBedH, price: countries.tripleBedPrize },
            { label: countries.doubleBedH, price: countries.doubleBedPrize },
          ].map(
            (room, index) =>
              room.label && (
                <div key={index} className="mt-2">
                  <h2 className="font-serif font-bold">{room.label}</h2>
                  <h1>Rs. {room.price}</h1>
                </div>
              )
          )}

          <h2 className="mt-4 font-serif font-semibold text-lg">{countries.ziaratH}</h2>
          <h1>{countries.ziaratText}</h1>
        </div>
      </div>

      <Link href="/">
        <motion.button
          className="mt-2 px-6 ml-2 py-3 bg-blue-500 text-white font-semibold rounded-lg"
          initial={{ scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          Apply Now
        </motion.button>
      </Link>

      <ContactInfo />
    </div>
  );
}
