"use client";

import { useEffect, useState } from "react";
import {client} from "@/sanity/lib/client"
import imageUrlBuilder from "@sanity/image-url";
import { motion } from "framer-motion";
import Image from "next/image";
import WhyUs from "../whyUs/page";
import ClientReviews from "../clientReview/page";
import WhatAreWe from "../whatAreWe/page";
import ServicesSection from "../ourService/page";

const builder = imageUrlBuilder(client);
const urlFor = (source: any) => builder.image(source);

const AboutUs = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await client.fetch(`*[_type == "aboutUs"][0]`);
      setData(result);
    };
    fetchData();
  }, []);

  if (!data) return <p className="text-center mt-10 h-screen ">Loading...</p>;

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.h1
        className="sm:text-4xl text-3xl font-bold text-blue-800 font-serif text-center mb-10"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {data.mainHeading}
      </motion.h1>

      <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
        <motion.div
          className="w-full md:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Image
            src={urlFor(data.aboutImage).url()}
            width={500}
            height={300}
            alt="UB Brothers"
            className="w-full max-w-xs md:max-w-md rounded-3xl"
          />
        </motion.div>

        <motion.div
          className="w-full md:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h1 className="font-bold text-xl font-serif">
            Your Trusted Partner for Visa & Travel Solutions
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            {data.aboutText}
          </p>
        </motion.div>
      </div>

      <motion.h2
        className="text-3xl font-semibold text-center mb-10"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {data.ceoHeading}
      </motion.h2>

      <motion.div
        className="flex flex-col items-center text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Image
          src={urlFor(data.ceoImage).url()}
          width={300}
          height={300}
          alt="CEO"
          className="rounded-full shadow-lg mb-4"
        />
        <p className="text-lg text-gray-700 max-w-2xl">{data.ceoText}</p>
      </motion.div>

      <motion.h2
        className="text-3xl font-semibold text-center my-10"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {data.staffHeading}
      </motion.h2>

      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Image
          src={urlFor(data.staffImage).url()}
          width={600}
          height={400}
          alt="Our Staff"
          className="rounded-lg shadow-lg"
        />
      </motion.div>

      <motion.p
        className="text-lg text-gray-700 text-center leading-relaxed mt-8 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {data.staffText}
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 text-center">
        {data.teamMembers?.map((member: any, idx: number) => (
          <div
            key={idx}
            className="p-4 bg-orange-100 rounded-lg shadow-md flex flex-col items-center"
          >
            <Image
              src={urlFor(member.photo).url()}
              width={96}
              height={96}
              alt={member.name}
              className="w-24 h-24 rounded-full object-cover mb-3"
            />
            <h3 className="text-xl font-semibold">{member.name}</h3>
            <p className="text-gray-700">{member.role}</p>
            <p className="text-gray-600">{member.phone}</p>
          </div>
        ))}
      </div>

      <div className="my-5">
        <ClientReviews />
      </div>
      <div className="my-5">
        <WhatAreWe />
      </div>
      <div>
        <WhyUs />
      </div>
      <ServicesSection />
    </div>
  );
};

export default AboutUs;
