'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import html2pdf from 'html2pdf.js';

export default function TravelPackageForm() {
  const { register, handleSubmit, reset } = useForm();
  const [submittedData, setSubmittedData] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = (data) => {
    setSubmittedData(data);
    setIsSubmitted(true);
  };

  const downloadPDF = () => {
    if (!submittedData) return;
    const content = document.getElementById('package-summary');
    html2pdf().from(content).save('travel-package.pdf');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      {!isSubmitted ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-700">Customize Your Travel Package</h2>
          
          <label className="block">
            <span className="text-gray-600">Destination</span>
            <input
              {...register('destination', { required: true })}
              className="w-full border border-gray-300 p-2 rounded-lg"
              placeholder="Enter destination"
            />
          </label>
          
          <label className="block">
            <span className="text-gray-600">Days</span>
            <input
              type="number"
              {...register('days', { required: true })}
              className="w-full border border-gray-300 p-2 rounded-lg"
              placeholder="Enter number of days"
            />
          </label>

          <label className="block">
            <span className="text-gray-600">Nights</span>
            <input
              type="number"
              {...register('nights', { required: true })}
              className="w-full border border-gray-300 p-2 rounded-lg"
              placeholder="Enter number of nights"
            />
          </label>
          <label className="block">
            <span className="text-gray-600">Your Budget</span>
            <input
              type="number"
              {...register('budget', { required: true })}
              className="w-full border border-gray-300 p-2 rounded-lg"
              placeholder="Enter your budget"
            />
          </label>

          <label className="block">
            <span className="text-gray-600">Your Name</span>
            <input
              {...register('name', { required: true })}
              className="w-full border border-gray-300 p-2 rounded-lg"
              placeholder="Enter your name"
            />
          </label>
          
          <label className="block">
            <span className="text-gray-600">Phone Number</span>
            <input
              type="tel"
              {...register('phone', { required: true })}
              className="w-full border border-gray-300 p-2 rounded-lg"
              placeholder="Enter your phone number"
            />
          </label>
          
          <label className="block">
            <span className="text-gray-600">Message (Optional)</span>
            <textarea
              {...register('message')}
              className="w-full border border-gray-300 p-2 rounded-lg"
              placeholder="Any special requests?"
            />
          </label>
          
          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg"
          >
            Submit
          </button>
        </form>
      ) : (
        <div className="text-center">
          <h2 className="text-xl font-bold text-orange-600">Package Submitted Successfully! 🎉</h2>
          <p className="text-gray-600 mt-2">Your travel package has been created.</p>
          
          <div id="package-summary" className="p-4 mt-4 bg-gray-100 rounded-lg text-left">
            <h3 className="text-lg font-semibold text-gray-700">Travel Package Summary</h3>
            <p><strong>Destination:</strong> {submittedData.destination}</p>
            <p><strong>Days:</strong> {submittedData.days}</p>
            <p><strong>Nights:</strong> {submittedData.nights}</p>
            <p><strong>Name:</strong> {submittedData.name}</p>
            <p><strong>Phone:</strong> {submittedData.phone}</p>
            <p><strong>Message:</strong> {submittedData.message || 'N/A'}</p>
          </div>
          
          <button
            onClick={downloadPDF}
            className="mt-4 bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg"
          >
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
}
