'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion'; 
import { TourType } from "@/app/types/destinations";
import { sanityFetch } from "@/sanity/lib/client";
import { tourDetailQuery } from "@/sanity/lib/queries";
import Link from 'next/link';
import { jwtDecode } from 'jwt-decode';


export default function TourDetail({ params }: { params: { id: string } }) {
  const [tourCountries, setTourCountries] = useState<TourType | null>(null);
   const [isApprovedUser, setIsApprovedUser] = useState(false);

  useEffect(() => {

    const token = localStorage.getItem("token");
            
                if (token) {
                  try {
                    const decoded: any = jwtDecode(token);
                 
            
                    if (decoded.approved === true || decoded.approved === "true") {
                      setIsApprovedUser(true);
                    } else {
                      setIsApprovedUser(false);
                    }
                  } catch (error) {
                    console.error("Invalid token", error);
                  }
                }
              
    const fetchData = async () => {
      const data: TourType = await sanityFetch({ query: tourDetailQuery, params: { id: params.id } });
      setTourCountries(data);
    };
    fetchData();
  }, [params.id]);

   const [currentVideo, setCurrentVideo] = useState(0);
      const videoIds = ["video-0", "video-1", "video-2"];
      useEffect(() => {
       const videoElement = document.getElementById(videoIds[currentVideo]) as HTMLVideoElement;
     
       if (videoElement) {
         videoElement.play(); 
     
         const handleEnded = () => {
           setCurrentVideo((prev) => (prev + 1) % videoIds.length);
         };
     
         videoElement.addEventListener("ended", handleEnded);
     
         return () => {
           videoElement.removeEventListener("ended", handleEnded);
         };
       }
     }, [currentVideo, videoIds ]);


     const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);


    
     useEffect(() => {
      const videoElements = videoRefs.current;
      let timeoutId: NodeJS.Timeout;
  
      const playNextVideo = () => {
        setCurrentVideo((prev) => (prev + 1) % videoElements.length);
      };
  
      const handlePlay = (index: number) => {
        const video = videoElements[index];
        if (video) {
          video.currentTime = 0; // Start from beginning
          video.play();
          
          
          // Ensure max 8 seconds playtime
          const duration = Math.min(video.duration || 8, 8) * 1000; // Convert to ms
          timeoutId = setTimeout(() => {
            video.pause();
            playNextVideo();
          }, duration);
        }
      };
  
      // Observer to detect visibility
      const observerCallback = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            handlePlay(index);
          } else {
            videoElements[index]?.pause();
            clearTimeout(timeoutId);
          }
        });
      };
  
      const observer = new IntersectionObserver(observerCallback, {
        root: null,
        threshold: 0.5,
      });
  
      videoElements.forEach((video) => {
        if (video) observer.observe(video);
      });
  
      return () => {
        videoElements.forEach((video) => {
          if (video) observer.unobserve(video);
        });
        clearTimeout(timeoutId);
      };
    }, [currentVideo]);
  

  if (!tourCountries) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div>
      <div key={tourCountries._id} className="mt-10">
      <div className="text-center flex justify-center w-full relative">
          {[tourCountries.videoUrl1, tourCountries.videoUrl2, tourCountries.videoUrl3].map((video, index) => (
            <video
              key={index}
              id={`video-${index}`}
              ref={(el) => {
                if (el) videoRefs.current[index] = el;
              }} 
              className={`w-[90%] xl:w-full rounded-lg shadow-lg ${
                index === currentVideo ? "block" : "hidden"
              }`}
              src={video}
              autoPlay
              muted
              loop={false}
              preload="auto" 
              playsInline 
              controls={false}
              style={{ pointerEvents: 'none' }}
            />
          ))}
        </div>

        <div className="mx-6">
          <h1 className="sm:text-3xl text-xl font-bold mt-5 sm:mt-10 font-serif">
            <u>{tourCountries.countryName}:</u>
          </h1>
          <h2 className="my-2 text-sm sm:text-lg">{tourCountries.shortDescription}</h2>

          <h1 className="font-bold font-serif text-xl my-4"><u>{tourCountries.tourIncludeHeading}</u></h1>
          {[tourCountries.tourInclude1, tourCountries.tourInclude2, tourCountries.tourInclude3, tourCountries.tourInclude4, tourCountries.tourInclude5, tourCountries.tourInclude6, tourCountries.tourInclude7, tourCountries.tourInclude8, tourCountries.tourInclude9].map((item, index) => (
            <h2 key={index}>{item}</h2>
          ))}

          <h2 className="text-xl font-bold font-serif my-4"><u>Itinerary:</u></h2>
          {[{ heading: tourCountries.heading1, day: tourCountries.day1 },
            { heading: tourCountries.heading2, day: tourCountries.day2 },
            { heading: tourCountries.heading3, day: tourCountries.day3 },
            { heading: tourCountries.heading4, day: tourCountries.day4 },
            { heading: tourCountries.heading5, day: tourCountries.day5 },
            { heading: tourCountries.heading6, day: tourCountries.day6 },
            { heading: tourCountries.heading7, day: tourCountries.day7 },
            { heading: tourCountries.heading8, day: tourCountries.day8 },
            { heading: tourCountries.heading9, day: tourCountries.day9 }]
            .map((item, index) => (
              item.heading && (
                <div key={index} className="mt-3">
                  <h1 className="font-bold text-blue-900 text-md">{item.heading}</h1>
                  <p>{item.day}</p>
                </div>
              )
          ))}

          <h2 className="my-4 text-md sm:text-xl font-serif"><b>Tour Package cost:</b> {isApprovedUser ? tourCountries.priceForUsers : tourCountries.prize} PKR/- Per person.</h2>

          <h1 className="my-4 text-md sm:text-xl font-serif font-bold"><u>Requirements:</u></h1>
          <p>{tourCountries.requirement1}</p>
          <p>{tourCountries.requirement2}</p>
          <p>{tourCountries.requirement3}</p>
          <p>{tourCountries.requirement4}</p>
          <p>{tourCountries.requirement5}</p>
          <p>{tourCountries.requirement6}</p>
          <p className="my-2"><b>Note: </b>You will need to visit the office in person to submit the required documents.</p>
        </div>
      </div>

      <Link href={{
      pathname: "/tourForm",
      query: {
      countryName : tourCountries.countryName,
      prize: tourCountries.prize,
      priceForUsers: tourCountries.priceForUsers,
      },
    }} >
        <motion.button
          className="mt-2 px-6 ml-2 py-3 bg-blue-500 text-white font-semibold rounded-lg"
          initial={{ scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          Apply Now
        </motion.button>
      </Link>

      
    </div>
  );
}
