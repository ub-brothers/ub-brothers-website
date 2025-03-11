"use client"
import { motion } from "framer-motion";

const banks = [
  {
    id: 1,
    name: "Allied Bank Limited",
    logo: "/image/bank3.png",
    accountTitle:"UB BROTHERS TRAVEL & TOURS",
    account: "PK18 ABPA 0010 0948 0157 0041",
    branch:"Akbari Mandi LHR"
  },
  {
    id: 2,
    name: "MCB Bank",
    logo: "/image/bank2.png",
    accountTitle:"UB BROTHERS",
    account: "PK36 MUCB 0518 0844 1100 0919",
    branch:"Misri Shah LHR"
  },
  {
    id: 3,
    name: "Allied Bank Limited",
    logo: "/image/bank3.png",
    accountTitle:"UB BROTHERS",
    account: "PK25 ABPA 0010 0948 0157 0012",
    branch:"Akbari Mandi LHR"
  },
  {
    id: 4,
    name: "Dubai Islamic Bank",
    logo: "/image/bank4.1.webp",
    accountTitle:"UB BROTHERS TRAVEL & TOURS",
    account: "PK57DUIB0000000027927003",
    branch:"Circular Road LHR"
  },
  {
    id: 5,
    name: "Al Baraka Bank",
    logo: "/image/bank5.png",
    accountTitle:"UB BROTHERS TRAVEL & TOURS",
    account: "PK34AIIN 0000 1025 3754 1010",
    branch:"Mall Road LHR"
  },
  {
    id: 6,
    name: "Summit Bank",
    logo: "/image/bankk.png",
    accountTitle:"UB BROTHERS",
    account: "PK91 SUMB 0329 0271 4012 7980",
    branch:"Egerton Road LHR"
  }
];

export default function BankCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6">
      {banks.map((bank, index) => (
        <motion.div
          key={bank.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
        >
          <div className="p-4 shadow-lg rounded-xl bg-blue-100 border border-gray-200 hover:shadow-xl transition flex flex-col text-left space-y-3 h-[350px] w-10/14 mx-auto">
          <div className="w-full bg-gray-100 p-4 flex justify-center items-center rounded-t-xl shadow-md">
              <img src={bank.logo} alt={bank.name} className="w-20 h-20 object-contain" />
            </div>
            <h2 className="text-lg font-semibold">Bank: {bank.name}</h2>
            <h2 className="text-sm "><b>Account Title:</b> {bank.accountTitle}</h2>
            <p className="text-sm"><b>Account Number:</b> {bank.account}</p>
            <h2 className="text-sm"><b>Branch:</b> {bank.branch}</h2>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
