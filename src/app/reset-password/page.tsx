'use client'; // Mark this component as a Client Component

import React, { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation'; // Use useSearchParams in App Router
import { motion } from "framer-motion";
import { FiEye, FiEyeOff } from 'react-icons/fi';
const ResetPasswordForm = () => {
  const searchParams = useSearchParams(); // Extract search parameters
  const token = searchParams.get('token'); // Get token from URL

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const handleSubmit = async (e:any) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Your password has been changed successfully.");
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
    <div  className="relative flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/image/aero.jpg')" }}>
        <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-900 bg-opacity-80 backdrop-blur-md p-8 rounded-2xl shadow-lg w-96 text-center text-white"
      >
      <h1 className="text-2xl font-bold mb-2">Reset Password</h1>
      <p className='text-sm text-blue-200 mb-4'>Enter New Password</p>
      <form onSubmit={handleSubmit} className="flex flex-col">
      <div className="relative mb-4">
            <input
              type={showNewPassword ? "text" : "password"}
              className="p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-black"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <span
              className="absolute right-3 top-3 cursor-pointer text-black"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ?<FiEye /> :<FiEyeOff />  }
            </span>
          </div>

          <div className="relative mb-4">
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-black"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span
              className="absolute right-3 top-3 cursor-pointer text-black"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FiEye />: <FiEyeOff />  }
            </span>
          </div>
         <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >Reset Password</motion.button>
        
      </form>
      {message && <p  className="text-green-300 mt-4">{message}</p>}
      {error && <p className="text-red-400 mt-4">{error}</p>}
      </motion.div>
    </div>
  );
};

const ResetPassword=()=>{
  return(
    <div>
      <Suspense fallback={<p className="text-white text-center mt-10">Loading...</p>}>
        <ResetPasswordForm/>
      </Suspense>
    </div>
  )
};

export default ResetPassword;