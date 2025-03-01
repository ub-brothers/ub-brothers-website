"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image"; // For Next.js image optimization

const slides = [
  { type: "video", src: "/image/hajj2.mp4" },
  { type: "video", src: "/image/madina.mp4" },
  { type: "video", src: "/image/ziyarat.mp4", text: "Iran / Iraq Ziyarat" },
  { type: "video", src: "/image/turks.mp4", text: "Turkey Tour" },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]); // ✅ Fix applied

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 10000); // 10 seconds interval
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Pause all videos except the current one
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === current) {
          video.play();
        } else {
          video.pause();
          video.currentTime = 0; // ✅ Fix applied
        }
      }
    });
  }, [current]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Heading */}
      <div className="absolute text-center top-10 left-1/2 transform -translate-x-1/2 text-white text-2xl md:text-5xl font-bold px-6 py-3 font-serif z-10 drop-shadow-[3px_3px_5px_rgba(0,0,0,0.8)]">
        Welcome to Ub Brothers!
      </div>

      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-opacity duration-700 ease-in-out ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            {slide.type === "video" ? (
              <video
                ref={(el) => {
                  videoRefs.current[index] = el; // ✅ Fix: No return statement
                }}
                src={slide.src}
                className="w-full h-full object-cover"
                muted
                loop
                playsInline
                preload="auto"
              />
            ) : (
              <Image
                src={slide.src}
                alt={`Slide ${index + 1}`}
                layout="fill"
                objectFit="cover"
                priority={index === 0} // Load first image fast
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
    </div>
  );
}
