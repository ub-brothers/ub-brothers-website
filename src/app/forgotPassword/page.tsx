"use client"
import React, { useState } from 'react';
import { motion } from "framer-motion";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setError('');
      } else {
        setError(data.error);
        setMessage('');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setMessage('');
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/image/aero.jpg')"}}>
       <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-700 backdrop-blur-md p-8 rounded-2xl shadow-lg w-96 text-center"
      >
      <h1 className="text-2xl font-bold text-white  mb-4">Forgot Password</h1>
      <p className='text-blue-200 text-left text-sm mb-2'>Enter Your login Email address!</p>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="email"
          placeholder="Enter your email"
           className="p-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
         <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >Send Reset Link</motion.button>
      
      </form>
      {message && <p className="text-green-300 mt-4">{message}</p>}
      {error && <p className="text-red-400 mt-4">{error}</p>}
      </motion.div>
    </div>
  );
};

export default ForgotPassword;