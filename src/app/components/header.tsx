"use client";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { FiUser } from "react-icons/fi";
import { useProfile } from "../profileContext";

const Header = () => {
  
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
const pathname = usePathname(); 

const { profileImage, updateProfileImage } = useProfile();

useEffect(() => {
  const token = localStorage.getItem("token");
  setIsLoggedIn(!!token); 
}, [pathname]);


const handleLogout = useCallback(() => {
  localStorage.removeItem("userEmail");
  localStorage.removeItem("token");
  setIsLoggedIn(false);
  setDropdownOpen(false);
  setShowConfirm(false);
  router.push("/login");
  setTimeout(() => {
    window.location.reload();
  }, 500);
}, [router]);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false); // Dropdown ko band karen
      }
    };

    
    document.addEventListener("mousedown", handleClickOutside);

    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  const [isMenuOpen, setIsMenuOpen] = useState(false);
  

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const getLinkClassName = useCallback(
    (path: string) =>
      pathname === path ? "text-yellow-500 border-b-2 border-yellow-500" : "text-white hover:text-gray-300",
    [pathname]
  );
  const profileIcon = useMemo(() => {
    if (profileImage && profileImage.trim() !== "") {
      return <img src={profileImage} alt="Profile" className="w-12 h-12 rounded-full" />;
    }
    return <FiUser className="text-2xl text-gray-600 w-12 h-12 flex items-center justify-center rounded-full border border-gray-400 p-2" />;
  }, [profileImage]);

  return (
    <header className="bg-blue-600 text-white py-4 px-6 sticky top-0 z-50 shadow-md">
      <div className="flex justify-between items-center">
       
        <div className="flex items-center space-x-8">
          
          <img src="/image/logo.jpeg" alt="Logo" className="w-12 h-12 rounded-3xl" />

          
          <nav className="hidden lg:flex space-x-6 font-serif">
            <Link href="/" className={getLinkClassName("/")}>Home</Link>
           
            <Link href="/umrah" className={getLinkClassName("/umrah")}>Hajj & Umrah Packages</Link>
            <Link href="/book-tickets" className={getLinkClassName("/book-tickets")}>Ticketing</Link>
             <Link href="/destinations" className={getLinkClassName("/destinations")}>Destinations</Link>
             <Link href="/bankDetails" className={getLinkClassName("/bankDetails")}>Bank Details</Link>
            <Link href="/about" className={getLinkClassName("/about")}>About Us</Link>
            <Link href="/contact" className={getLinkClassName("/contact")}>Contact</Link>
          </nav>
        </div>

       <div className="hidden lg:flex">
        <div className="relative"  ref={dropdownRef}>
      {isLoggedIn ? (
        <div className="relative" >
          <button className=" bg-gray-200 rounded-full hover:bg-gray-300" onClick={() => setDropdownOpen(!dropdownOpen)}>
          {profileIcon}
        </button>

          {dropdownOpen &&  isLoggedIn && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-lg">
              <Link href="/myAccount">
             <button
                
                className="w-full text-left text-gray-500 font-sans px-4  hover:text-black py-2 "
              >
                My Account
              </button> </Link>
              <hr></hr>
              <button
                onClick={() => setShowConfirm(true)}
                className="w-full text-left text-gray-500 font-sans px-4 py-2 hover:text-black"
              >
                Logout
              </button>
              
            </div>
          )}
        </div>
      ) : (
        <>
          <Link
            href="/login"
            className="bg-orange-500 mx-3 font-bold font-sans text-white border-2 border-white font-sans shadow-inner py-2 px-4 rounded-3xl hover:bg-blue-400 hover:text-black shadow-2xl"
          >
            Login
          </Link>
          <Link
            href="/registeration"
            className="border-2 bg-orange-500 font-bold font-sans  border-white text-white py-2 px-4 rounded-3xl font-sans hover:bg-blue-400 hover:text-black"
          >
            Register
          </Link>
        </>
      )}

      {/* Logout Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <p className="mb-4 fontbold text-black font-serif">Are you sure you want to logout?</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 bg-gray-400 rounded-md hover:bg-gray-500"
              >
                No
              </button>
              <button
                onClick={() => {
                  handleLogout();
                  setShowConfirm(false);
                  setDropdownOpen(false);
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
</div>
        
        <button onClick={toggleMenu} className="lg:hidden text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

     
      <div className={`fixed top-0 left-0 bg-blue-600 w-1/2 h-full z-50 transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out`}>
        <div className="flex justify-between items-center p-4">
          <img src="/image/logo.jpeg" alt="Logo" className="w-12 h-12 rounded-3xl" />
          <button onClick={toggleMenu} className="text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col items-center space-y-4 mt-8">
          <Link href="/" className={`w-full text-center py-2 ${getLinkClassName("/")}`} onClick={toggleMenu}>Home</Link>
         
          <Link href="/umrah" className={`w-full text-center py-2 ${getLinkClassName("/umrah")}`} onClick={toggleMenu}>Hajj & Umrah Packages</Link>
          <Link href="/book-tickets" className={`w-full text-center py-2 ${getLinkClassName("/book-tickets")}`} onClick={toggleMenu}>Ticketing</Link>
           <Link href="/destinations" className={`w-full text-center py-2 ${getLinkClassName("/destinations")}`} onClick={toggleMenu}>Destinations</Link>
          <Link href="/about" className={`w-full text-center py-2 ${getLinkClassName("/about")}`} onClick={toggleMenu}>About Us</Link>
          <Link href="/contact" className={`w-full text-center py-2 ${getLinkClassName("/contact")}`} onClick={toggleMenu}>Contact</Link>
  
   {isLoggedIn ? (
            <div className="w-full text-center">
              <div className="bg-gray-300 text-blue-800">
              <Link href="/myAccount">
              <button className="bg-gray-200 mt-4 rounded-full hover:bg-gray-300">
          {profileIcon}
        </button><h1 className="mb-2">My Account</h1></Link></div>

        <button
      onClick={() => setShowConfirm(true)}
      className="mt-2 block w-full text-center text-red-600 hover:text-red-800"
    >
     <b> Logout</b>
    </button>
            </div>
          ) : (
            <>
              <Link href="/registeration" className={`w-full text-center py-2 ${getLinkClassName("/registeration")}`} onClick={toggleMenu}><b>Register</b></Link>
              <Link href="/login" className={`w-full text-center py-2 ${getLinkClassName("/login")}`} onClick={toggleMenu}><b>Login</b></Link>
            </>
          )}
        </nav>

        {/* Logout Confirmation Modal for Mobile */}
        {showConfirm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-md shadow-md  w-80 sm:w-96">
              <p className="mb-4 fontbold text-black font-serif">Are you sure you want to logout?</p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                >
                  No
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    setShowConfirm(false);
                    setDropdownOpen(false);
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        )}

   
      </div>
    </header>
  );
};

export default Header;




