"use client"
import { useState } from "react";

export default function PassportForm() {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    country: "",
    message: "",
    passportPhoto: null,
    originalPassport: null,
    cnicPicture: null,
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: any) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg"
      >
        
        <label className="block mb-2">Full Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
          required
        />

        <label className="block mb-2">Phone Number</label>
        <input
          type="tel"
          name="number"
          value={formData.number}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
          required
        />

        <label className="block mb-2">Country</label>
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
          required
        />

        <label className="block mb-2">Message</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        />

        <label className="block mb-2">Passport Size Photo (White Background)</label>
        <input
          type="file"
          name="passportPhoto"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-2 border rounded mb-3"
          required
        />

        <label className="block mb-2">Original Passport Photo</label>
        <input
          type="file"
          name="originalPassport"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-2 border rounded mb-3"
          required
        />

        <label className="block mb-2">CNIC Picture</label>
        <input
          type="file"
          name="cnicPicture"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-2 border rounded mb-3"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
