// Frontend Component
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function IssueForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setStatus('Sending...');

    const res = await fetch('/api/issueMail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, message })
    });

    if (res.ok) {
      setStatus('Message Sent!');
      setEmail('');
      setMessage('');
    } else {
      setStatus('Error Sending Message');
    }
  };

  return (
    <div className="relative flex items-center justify-center h-screen bg-gray-900 text-white">
      <Image src="/image/log4.jpg" alt="Background"  layout="fill" objectFit="cover" className="opacity-50" />
      <motion.div 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="bg-gray-800 bg-opacity-75 p-6 rounded-xl shadow-lg z-10 w-96"
      >
        <h2 className="text-xl font-semibold mb-4">Having any issue while logging in?</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Your Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <textarea
            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Tell us your problem here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            Send
          </motion.button>
        </form>
        {status && <p className="text-sm mt-2 text-center">{status}</p>}
      </motion.div>
    </div>
  );
}