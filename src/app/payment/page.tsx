"use client";
import { motion } from "framer-motion";

const PaymentDetails = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          className="text-3xl font-bold text-center text-blue-600 mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          Safe and Secure Payment Methods
        </motion.h2>

        <motion.p
          className="text-lg text-gray-600 text-center mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          Your payment information is secure with us. We offer trusted and reliable methods to ensure the safety of your transactions.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            className="bg-blue-100 p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h3 className="text-2xl font-semibold font-serif text-gray-700 mb-4">
              Bank Details
            </h3>
            <p className="text-gray-600 font-semibold mb-2">
             Bank 1:
            </p>
            <p className="text-gray-600 mb-2">Account Name: UB BROTHERS TRAVEL & TOURS</p>
            <p className="text-gray-600 mb-2">Account Number: PK18 ABPA 0010 0948 0157 0041</p>
            <p className="text-gray-600 mb-2">Bank: ABL Bank</p>
            <p className="text-gray-600 mb-2">Branch: Akbari Mandi LHR</p>
          
            <p className="text-gray-600 font-semibold mb-2">
             Bank 2:
            </p>
            <p className="text-gray-600 mb-2">Account Name: Mirza M.Shaharyaar</p>
            <p className="text-gray-600 mb-2">Account Number: PK63 MEZN 0002 8601 0234 0055</p>
            <p className="text-gray-600 mb-2">Bank: Meezan Bank</p>
            <p className="text-gray-600 mb-2">Branch: Shad Bagh LHR</p>
          </motion.div>

          <motion.div
            className="bg-blue-100 p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <img
              src="/image/bank.jpg"
              alt="Payment Methods"
              className="w-full h-auto rounded-lg"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PaymentDetails;


