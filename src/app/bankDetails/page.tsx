"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/lib/client";

const builder = imageUrlBuilder(client);
const urlFor = (source: any) => builder.image(source);

type Bank = {
  _id: string;
  name: string;
  logo: any;
  accountTitle: string;
  account: string;
  branch: string;
};

export default function BankCards() {
  const [banks, setBanks] = useState<Bank[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await client.fetch(
        `*[_type == "bank"] | order(order asc){
          _id,
          name,
          logo,
          accountTitle,
          account,
          branch
        }`
      );
      setBanks(data);
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-16">
        <h1 className="sm:text-4xl text-2xl font-bold text-gray-900 mb-4 font-sans">
          Our Bank Details
        </h1>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {banks.map((bank, index) => (
          <motion.div
            key={bank._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 flex justify-center">
                <img
                  src={urlFor(bank.logo).width(150).url()}
                  alt={bank.name}
                  className="h-16 object-contain"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 font-sans">
                  {bank.name}
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 pt-1">
                      <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-gray-600 font-bold">Account Title</p>
                      <p className="text-sm font-medium text-gray-900">{bank.accountTitle}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 pt-1">
                      <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-gray-600 font-bold">Account Number</p>
                      <p className="text-sm font-medium text-gray-900">{bank.account}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 pt-1">
                      <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-gray-600 font-bold">Branch</p>
                      <p className="text-sm font-medium text-gray-900">{bank.branch}</p>
                    </div>
                  </div>
                </div>
              </div>
           
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}