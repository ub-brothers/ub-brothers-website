import Link from "next/link";
import { FaFacebook, FaInstagram, FaWhatsapp, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Column 1: Logo & About */}
        <div>
            <div className="flex">
          <img src="/image/logo.jpeg" alt="Logo" className="w-16 h-16 mb-3 rounded-3xl" />
          <h1 className="font-serif text-2xl font-bold m-4">UB Brothers</h1>
          </div>
          <p className="text-sm text-gray-200">
            Explore the world with us. We offer the best travel packages and experiences tailored just for you.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        {/* <div className="md:ml-10">
          <h3 className="text-xl font-semibold text-orange-500 mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-orange-500 transition">Home</Link></li>
            <li><Link href="/destinations" className="hover:text-orange-500 transition">Destinations</Link></li>
            <li><Link href="/packages" className="hover:text-orange-500 transition">Packages</Link></li>
            <li><Link href="/about" className="hover:text-orange-500 transition">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-orange-500 transition">Contact</Link></li>
          </ul>
        </div> */}

        {/* Column 3: Contact & Social Links */}
        <div>
          <h3 className="text-xl font-semibold text-orange-500 mb-3">Contact Us</h3>
          <p className="text-sm text-gray-200">📍 7-Amin Arcade (Hotel Ambassador) Durand Road, Near Shimla Pahari, Lahore Pakistan.</p>
          <p className="text-sm text-gray-200">📞 +92 300 9480157</p>
          <p className="text-sm text-gray-200">📞 +92 326 421 4241</p>
          <p className="text-sm text-gray-200">✉ ubbrothersticketing@gmail.com</p>
          
          {/* Social Icons */}
          <div className="flex space-x-4 mt-4">
            <Link href="#" className="text-white hover:text-orange-500 text-2xl"><FaFacebook /></Link>
            <Link href="https://www.instagram.com/_ub_travel?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="text-white hover:text-orange-500 text-2xl"><FaInstagram /></Link>
            {/* <Link href="#" className="text-white hover:text-orange-500 text-2xl"><FaWhatsapp /></Link>
            <Link href="#" className="text-white hover:text-orange-500 text-2xl"><FaLinkedin /></Link> */}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-400 text-center mt-6 pt-4 text-sm text-gray-200">
        © {new Date().getFullYear()} UB Brothers. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
