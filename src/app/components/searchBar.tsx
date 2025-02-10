// 'use client';


// import { useState } from "react";
// import { useRouter } from "next/navigation"; // Import Next.js router
// import { FiSearch } from "react-icons/fi";

// const SearchBar = () => {
//   const [query, setQuery] = useState("");
//   const router = useRouter(); // Initialize router

//   const countries = [
//     "Malaysia",
//     "Thailand",
//     "Indonesia",
//     "Cambodia",
//     "Vietnam",
//     "Singapore",
//     "Dubai",
//     "EastAfrica",
//     "Oman",
//     "Kazakhstan",
//     "Tajikistan",
//     "Uzbekistan",
//     "Azerbaijan",
//     "Tanzania",
//     "Ethiopia",
//     "Zambia",
//     "SriLanka",
//     "Nepal",
//     "Pakistan",
//   ];

//   const filteredCountries = query
//     ? countries.filter((country) =>
//         country.toLowerCase().includes(query.toLowerCase())
//       )
//     : [];

//   // Function to handle country click
//   const handleCountryClick = (country: string) => {
//     setQuery(""); // Clear search input
//     router.push(`/stickerVisa/${country}`); // Navigate to the country's detail page
//   };

//   return (
//     <div className="w-full max-w-md mx-auto p-4 relative z-50">
//       <div className="flex items-center bg-gray-100 border border-gray-300 rounded-md p-2 focus-within:ring-2 focus-within:ring-blue-400">
//         <FiSearch className="text-gray-600 mr-2" />
//         <input
//           type="text"
//           placeholder="Search country..."
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           className="w-full bg-gray-100 focus:outline-none"
//         />
//       </div>
//       {filteredCountries.length > 0 && (
//         <ul className="mt-2 bg-white shadow-md rounded-md max-h-60 overflow-auto absolute w-full z-50">
//           {filteredCountries.map((country, index) => (
//             <li
//               key={index}
//               className="p-2 hover:bg-gray-100 cursor-pointer"
//               onClick={() => handleCountryClick(country)} // Navigate on click
//             >
//               {country}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default SearchBar;


