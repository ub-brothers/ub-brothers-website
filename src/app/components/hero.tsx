"use client";
import { useState } from "react";

const slides = [
  { type: "video", src: "/image/hajj2.mp4" }, 
  { type: "video", src: "/image/madina.mp4" },
  { type: "video", src: "/image/ziyarat.mp4", text: "Iran / Iraq Ziyarat" }, 
  { type: "video", src: "/image/turks.mp4", text:"Turkey Tour" }, 
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">


<div className="absolute text-center top-10 left-1/2 transform -translate-x-1/2 text-white text-3xl md:text-5xl font-bold px-6 py-3 font-serif z-10 drop-shadow-lg">
  Welcome to Ub Brothers!
</div>



      {/* Slides */}
      <div className="w-full h-full flex transition-transform duration-500 ease-in-out">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-opacity ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            {slide.type === "video" ? (
              <video
                src={slide.src}
                autoPlay
                loop
                muted
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={slide.src}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            )}
            {/* Slide-Specific Text */}
            {index === current && slide.text && (
              <div className="absolute text-center bottom-20 left-1/2 transform -translate-x-1/2 text-white text-xl md:text-3xl font-bold bg-black/60 px-4 py-2 rounded-md">
                {slide.text}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
      >
        ❮
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
      >
        ❯
      </button>
    </div>
  );
}