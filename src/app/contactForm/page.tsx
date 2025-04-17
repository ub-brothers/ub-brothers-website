'use client';

import { useState } from 'react';

const ContactForm = () => {
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
   
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
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
          message: '',
        });
      } else {
        alert("Failed to send email. Please try again.");
      }
    } catch (error) {
      alert("Something went wrong.");
    } finally {
      setIsSubmitting(false); // 👈 enable button again
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
        

        
        <label className="block font-medium">Your Message/ Request</label>
        <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your Message" className="w-full h-[150px] p-2 border rounded" required />
        
        <button
        disabled={isSubmitting}
        
        type="submit" className={`w-full p-2 rounded text-white ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600'}`}> {isSubmitting ? 'Submitting...' : 'Submit'}</button>
      </form>
    </div>
  );
};

export default ContactForm;
