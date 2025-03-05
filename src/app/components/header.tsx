"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const Header = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token); // If token exists, user is logged in
  }, []);

  const handleLogout = () => {
      localStorage.removeItem("token"); // Remove token from local storage
      setIsLoggedIn(false);
      router.push("/login"); // Redirect to login page
  };



  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname(); 

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const getLinkClassName = (path: string) =>
    pathname === path ? "text-yellow-500 border-b-2 border-yellow-500" : "text-white hover:text-gray-300";

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
            <Link href="/about" className={getLinkClassName("/about")}>About Us</Link>
            <Link href="/contact" className={getLinkClassName("/contact")}>Contact</Link>
          </nav>
        </div>

       
        <div className="hidden lg:flex space-x-4">
        {isLoggedIn ? (
                    <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
                ) : (  <>
          <Link href="/login" className="bg-orange-500 text-white border-2 border-white font-sans shadow-inner py-2 px-4 rounded-3xl hover:bg-blue-400 hover:text-black shadow-2xl">
            Login
          </Link>
          <Link href="/registeration" className="border-2 bg-orange-500 border-white text-white py-2 px-4 rounded-3xl font-sans hover:bg-blue-400 hover:text-black">
            Register
          </Link></>
          )}
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
                    <button onClick={handleLogout} className="w-full text-center py-2">Logout</button>
                ) : (  <>
          <Link href="/registeration" className={`w-full text-center py-2 ${getLinkClassName("/registeration")}`} onClick={toggleMenu}>Register</Link>
          <Link href="/login" className={`w-full text-center py-2 ${getLinkClassName("/login")}`} onClick={toggleMenu}>Login</Link></>)}

        
        </nav>
      </div>
    </header>
  );
};

export default Header;




