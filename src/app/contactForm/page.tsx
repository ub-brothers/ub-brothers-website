'use client';

import { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    whatsapp: '',
    visaType: 'e-visa',
    country: '',
   
    message: '',
  });

  const visaPrices: Record<string, string> = {
      Malaysia : '$150',
    Thailand: '$120',
    Indonesia: '$130',
    Cambodia: '$140',
    Veitnam: '',
    Singapore: '',
    Turkey:"",
    Dubai: '',
    EastAfrica: '',
    Oman: '',
    Kazakhstan: '',
    Tajikistan: '',
    Uzbekistan: '',
    Azerbaijan: '',
    Tanzania : '',
    Ethopia : '',
    Zambia : '',
    SriLanka : '',
    Nepal : '',
    Pakistan: '',
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
   
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();

  if (data.success) {
    alert("Form submitted successfully!");
    setFormData({
      name: '',
      email: '',
      phone: '',
      whatsapp: '',
      visaType: 'e-visa',
      country: '',
      
      message: '',
    });
  } else {
    alert("Failed to send email. Please try again.");
  }
};

  return (
    <div className="max-w-lg sm:mx-auto mx-4  p-6 bg-gray shadow-lg rounded-lg">
      
      <form onSubmit={handleSubmit} className="space-y-4 text-sm sm:text-lg">
        <label className="block font-medium ">Full Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="w-full p-2 border rounded" required />
        
        <label className="block font-medium">Email Address</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" className="w-full p-2 border rounded" required />
        
       
        
        <label className="block font-medium">Phone Number</label>
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" className="w-full p-2 border rounded" required />
        
        <label className="block font-medium">Select Your Visa Type</label>
        <select name="visaType" value={formData.visaType} onChange={handleChange} className="w-full p-2 border rounded" required>
          <option value="e-visa">E-Visa</option>
          <option value="sticker-visa">Sticker Visa</option>
          <option value="tour-package">Tour Package</option>
        </select>
        
        <label className="block font-medium">Choose the Country You Want a Visa For</label>
        <select name="country" value={formData.country} onChange={handleChange} className="w-full p-2 border rounded" required>
          <option value="">Select Country</option>
          {Object.keys(visaPrices).map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      
        
        <label className="block font-medium">Your Message</label>
        <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your Message" className="w-full h-[150px] p-2 border rounded" required />
        
        <button type="submit" className="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600">Submit</button>
      </form>
    </div>
  );
};

export default ContactForm;
