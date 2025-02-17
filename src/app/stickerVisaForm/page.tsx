'use client';

import { useState } from 'react';
import ContactInfo from '../contactDiv/page';
import PaymentDetails from '../payment/page';

export default function StickerVisaForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    country: '',
    message: '',
  });

  const handleChange = (e:any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
  
    try {
      const response = await fetch('/api/stickerForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
      
      if (result.success) {
        alert('Your application has been submitted successfully!');
        setFormData({ fullName: '', phone: '', email: '', country: '', message: '' }); // Clear form
      } else {
        alert('Failed to submit. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again later.');
    }
  };
  

  return (
    <div>
          <div className="relative w-full mb-6 h-[380px]">
  <img src="/image/sticker.jpg" className="w-full h-full object-cover" alt="Travel Image" />
  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
    <h2 className="text-white text-2xl md:text-4xl font-bold text-center">
    Unlock new destinations with ease. Get your visa today!
    </h2>
  </div>
  </div>

    <div className=" mx-4 mt-2 p-6 bg-gray-100 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold font-serif text-center mb-4">Sticker Visa Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Full Name</label>
          <input
            type="text"
            placeholder="Your Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Phone Number</label>
          <input
            type="tel"
            name="phone"
            placeholder="Phone number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Email Address</label>
          <input
            type="email"
            placeholder="Your email address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Country You Want Visa For</label>
          <input
            type="text"
            name="country"
            placeholder="Enter country name"
            value={formData.country}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Your Message / Request</label>
          <textarea
            name="message"
            placeholder="Your message"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-orange-500 transition"
        >
          Submit
        </button>
      </form>
    </div>
    <h1 className="text-center mx-2 font-semibold my-5"><i>Thank you for reaching out! We will get back to you as soon as possible.</i></h1>
    <ContactInfo/>
    <PaymentDetails/>
    </div>
  );
}
