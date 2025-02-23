"use client"
import React from 'react';

interface WhatsAppButtonProps {
  phoneNumber: string; 
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ phoneNumber }) => {
  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}`;
    window.open(url, '_blank'); 
  };

  return (
    <div 
      onClick={handleClick} 
      className="whatsapp-button" 
      role="button" 
      aria-label="Chat with us on WhatsApp"
    >
      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
        alt="WhatsApp"
        width={50} 
        height={50} 
      />
    </div>
  );
};

export default WhatsAppButton;

