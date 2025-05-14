'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Destination } from '@/app/types/destinations';
import { sanityFetch } from '@/sanity/lib/client';
import { detailCountryEVisa, allDestinations } from '@/sanity/lib/queries';
import { jwtDecode } from 'jwt-decode';
import LocationInfo from '@/app/locationInfo/page';


export default function DetailPage({ params }: { params: { id: string } }) {
  const [countries, setCountries] = useState<Destination | null>(null);
  const [randomCountries, setRandomCountries] = useState<Destination[]>([]);
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
  

    async function fetchData() {
      try {
        const countryData: Destination = await sanityFetch({
          query: detailCountryEVisa,
          params: { id: params.id },
        });

        const allCountriesData: Destination[] = await sanityFetch({
          query: allDestinations,
        });

       
        const filteredCountries = allCountriesData.filter((c) => c._id !== params.id);
        const randomSelection = filteredCountries.sort(() => 0.5 - Math.random()).slice(0, 4);

        setCountries(countryData);
        setRandomCountries(randomSelection);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [params.id]);

  const [currentVideo, setCurrentVideo] = useState(0);
 const videoIds = ["video-0", "video-1", "video-2"];
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

 useEffect(() => {
  const videoElement = document.getElementById(videoIds[currentVideo]) as HTMLVideoElement;

  if (videoElement) {
    videoElement.play(); // Ensure video starts playing when it's updated

    const handleEnded = () => {
      setCurrentVideo((prev) => (prev + 1) % videoIds.length);
    };

    videoElement.addEventListener("ended", handleEnded);

    return () => {
      videoElement.removeEventListener("ended", handleEnded);
    };
  }
}, [currentVideo, videoIds]); // Dependency list me videoIds bhi add karain

  if (!countries) return <p className="text-center h-screen mt-10 text-lg">Loading...</p>;

  return (
    <div>
      <div key={countries._id} className="mt-10">
      <div className="text-center flex justify-center w-full relative">
          {[countries.videoUrl1, countries.videoUrl2, countries.videoUrl3].map((video, index) => (
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
          playsInline // Required for iOS to prevent fullscreen mode
            controls={false} // Hide default controls
            style={{ pointerEvents: 'none' }}
            />
          ))}
        </div>


        <div className="mx-6">
          <h1 className="sm:text-3xl text-xl font-bold mt-5 sm:mt-10 font-serif">
            <u>{countries.countryName}:</u>
          </h1>
          <h2 className="my-2 text-sm sm:text-lg">{countries.shortDescription}</h2>
          <h2 className="my-4 text-md sm:text-xl font-serif">
            <b>The visa cost:</b> {isApprovedUser ? countries.prizeForUsers : countries.prize} PKR/-
          </h2>  

          <h1 className="font-bold text-md sm:text-xl">{countries.requirements}</h1>
          <p>{countries.requirement1}</p>
          <p>{countries.requirement2}</p>
          <p>{countries.requirement3}</p>
          <p>{countries.requirement4}</p>
          <p>{countries.requirement5}</p>
          <p>{countries.requirement6}</p>
          <p>{countries.requirement7}</p>
          <p>{countries.requirement8}</p>
        </div>
      </div>
      <Link href={{
      pathname: "/visaApplication",
      query: {
      countryName : countries.countryName,
      prize: countries.prize,
      prizeForUsers: countries.prizeForUsers,
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

      <div className="w-full p-8">
      <h2 className="text-3xl font-bold font-sans mb-8 text-center text-blue-900">You Can Directly Contact:</h2>
      
     
      <motion.div 
        className="flex justify-center mb-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        whileHover={{ scale: 1.05 }}
        viewport={{ once: false }} 
      >
        <img
          src="/image/ali.jpeg"
          alt="Visa Applicant"
          className="w-[200px] h-[200px] rounded-full object-cover"
        />
      </motion.div>

   
      <div className="text-center">
        <p className="sm:text-2xl text-lg font-semibold font-serif">Mirza Ali</p>
        <p className="text-sm text-gray-500 mt-2">03414314000</p>
        <p className="text-sm text-gray-500">&#9993;  visa@ubbrothers.com</p>
      </div>
    </div>

     <div className="my-6 flex items-center justify-center ">
          <LocationInfo/>
        </div>

      <div className="my-8 w-full bg-gray-200">
        <h1>.</h1>
        <h2 className="text-center text-xl sm:text-2xl font-bold mt-6 mb-5">
          <u>You May Also Like:</u>
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-8 mx-auto max-w-6xl">
          {randomCountries.map((country) => (
            <div
              key={country._id}
              className="sm:w-[290px] w-[150px] border-solid border-black rounded-xl bg-blue-200 xl:mx-10 mx-auto sm:mx-4 hover:shadow-md hover:shadow-black text-center my-3"
            >
              <Link href={`/destinations/${country._id}`}>
                <div className="relative group">
                  <img
                    src={country.imageUrl}
                    alt={country.countryName}
                    className="mx-auto my-4 sm:h-[250px] h-[100px] w-[130px] rounded-lg sm:w-[270px] transition duration-300 group-hover:brightness-75"
                  />
                  <div className="absolute inset-0 bg-white bg-opacity-50 opacity-0 group-hover:opacity-100 flex justify-center items-center transition-opacity duration-300">
                    <h3 className="sm:text-xl text-md font-bold font-serif text-black">{country.countryName}</h3>
                  </div>
                </div>
                <h2 className="text-center text-sm sm:text-lg mt-2">
                  <b>{country.prize}</b> PKR/-
                </h2>
                <button className="bg-orange-500 rounded-xl sm:w-[130px] w-[100px] text-white text-sm sm:text-md mb-4 mt-1 hover:bg-blue-500 hover:shadow-[0_4px_14px_rgba(0,0,0,0.2)] transition duration-300 shadow-lg font-serif">
                  View Details
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
     
    </div>
  );
}
