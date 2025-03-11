'use client';

import { useState, useEffect, useRef } from 'react';
import Cropper from 'react-easy-crop';
import Image from 'next/image';
import {jwtDecode , JwtPayload } from "jwt-decode";
import { useProfile } from '../profileContext';
import { FaBars, FaTimes } from 'react-icons/fa'; 
import ChangePassword from '../change-password/page';
import Link from 'next/link';
import MyBookings from '../bookingUser/page';



export default function ProfilePage( { searchParams }: { searchParams: { filterStatus?: "cancelled" | "confirmed" } }) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 
  const [activeOption, setActiveOption] = useState("");
  
  
    const { profileImage, updateProfileImage } = useProfile();
    

    const handleProfileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        const reader = new FileReader();
    
        reader.onload = () => {
          if (typeof reader.result === "string") {
           
            if (email) {
              localStorage.setItem(`profileImage_${email}`, reader.result);

              updateProfileImage(reader.result);
            }
          }
        };
    
        reader.readAsDataURL(file); // ✅ Convert to base64 (permanent URL)
      }
    };
    const dropdownRef = useRef<HTMLDivElement>(null); 
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setShowOptions(false); // Close dropdown
        }
      };
  
      // Add event listener
      document.addEventListener("mousedown", handleClickOutside);
  
      // Cleanup
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
    

  const [name, setName] = useState<string | null>(null);
  const [editingName, setEditingName] = useState(false);
  useEffect(() => {
    const savedName = localStorage.getItem("userName");
    if (savedName) {
      setName(savedName); 
    }
    const mockBookings = [
      { id: 1, type: 'Confirmed', date: '2023-10-01' },
      { id: 2, type: 'Canceled', date: '2023-10-05' },
    ];
    setBookings(mockBookings);
  }, []);
  const handleSaveName = () => {
    if (name) {
      localStorage.setItem("userName", name);
      setEditingName(false); // Hide input field after saving
    }
  };

  const [email, setEmail] = useState<string|null>(""); // Replace with actual user email
  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
      setEmail(userEmail);
    } else {
      console.error("userEmail is null in localStorage");
    }
  }, []);
  const [showUpload, setShowUpload] = useState(false);
  interface DecodedToken extends JwtPayload {
    email?: string;
  }
  useEffect(() => {
    const token = localStorage.getItem("token"); 
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token); 
        if (decoded.email) {
          setEmail(decoded.email);  // Email set kar raha hai
        }
      } catch (error) {
        console.error("Invalid token", error);
      }
    } 
}, []); 
useEffect(() => {
  if (email) {
    const savedImage = localStorage.getItem(`profileImage_${email}`);
    if (savedImage) {
        setCroppedImage(savedImage);
        updateProfileImage(savedImage);
    }
  }
}, [email,profileImage,updateProfileImage]); 

  const [image, setImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [showCropper, setShowCropper] = useState(false);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [croppedArea, setCroppedArea] = useState<{ x: number; y: number; width: number; height: number } | null>(null);

  const onCropComplete = (croppedAreaPercentage: any, croppedAreaPixels: { x: number; y: number; width: number; height: number }) => {
    setCroppedArea(croppedAreaPixels);
  };

  const handleCropDone = async () => {
    if (!image || !croppedArea) {
     
      return;
    }
 
    const croppedImg = await getCroppedImg(image, croppedArea);
    
    if (croppedImg) {
      
      setCroppedImage(croppedImg);
      setShowCropper(false);
       // Save the cropped image to localStorage
       localStorage.setItem(`profileImage_${email}`, croppedImg);
       updateProfileImage(croppedImg); 

    } else {
      console.log("Cropping failed");
    }
  };
  

  const getCroppedImg = (imageSrc: string, cropArea: { x: number; y: number; width: number; height: number }) => {
    return new Promise<string>((resolve) => {
    
        if (typeof window === "undefined") return; // Prevent running on server-side (SSR issue)

        const img = new window.Image();
      img.src = imageSrc;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        
        canvas.width = cropArea.width;
        canvas.height = cropArea.height;

        ctx.drawImage(
          img,
          cropArea.x,
          cropArea.y,
          cropArea.width,
          cropArea.height,
          0,
          0,
          cropArea.width,
          cropArea.height
        );

        resolve(canvas.toDataURL("image/jpeg"));
      };
    });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          const imageUrl = reader.result;

          
          if (email) {
            updateProfileImage(imageUrl);
          } else {
            console.error("Email is null. Cannot update profile image.");
          }
          setImage(reader.result);
          setShowCropper(true); // ✅ Show Cropper when image is uploaded
        }
      };
      reader.onerror = () => {
        console.error("Error reading file:", reader.error);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleProfileUpload(event);
    handleImageUpload(event);

};

const [showOptions, setShowOptions] = useState(false);

const handleDeleteProfileImage = () => {

 if (email) {
    localStorage.removeItem(`profileImage_${email}`);
  }
  setCroppedImage(null);
  updateProfileImage(null);
  setShowOptions(false); // Dropdown band kar de
};

const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
  event.currentTarget.src = ''; // Clear the broken image src
  setCroppedImage(null); // Set croppedImage to null to show the "No Image" placeholder
};

const toggleSidebar = () => {
  setIsSidebarOpen(!isSidebarOpen);
};

const handleSidebarOptionClick = (option: string) => {
  setSelectedOption(option);
  setActiveOption(option);
  setIsSidebarOpen(false); // Close sidebar on mobile after selecting an option
};
 // Function to close sidebar when clicking outside
 useEffect(() => {
  const handleClickOutside = (event:any) => {
    if (
      isSidebarOpen &&
      !event.target.closest(".sidebar-menu") && // Check if click is outside sidebar
      !event.target.closest(".hamburger-btn") // Check if click is outside hamburger button
    ) {
      setIsSidebarOpen(false);
    }
  };

  document.addEventListener("click", handleClickOutside);

  return () => {
    document.removeEventListener("click", handleClickOutside);
  };
}, [isSidebarOpen]);


const renderContent = () => {
  switch (selectedOption) {
    case 'All Bookings':
      return (
        <div>
          <h2 className="text-2xl font-bold text-left mb-4"><u>All Bookings</u></h2>
         {/* Add this container */}
         <MyBookings searchParams={{ filterStatus: "confirmed" }} />
     
        </div>
      );
    case 'Confirmed Booking':
      return (
        
        <div className="w-full overflow-x-auto">
          <div  className="overflow-x-auto min-w-[700px]">
        <h2 className="text-2xl font-bold text-left mb-4">
          <u>Confirmed Bookings</u>
        </h2>
       {/* Add this container */}
       <MyBookings searchParams={{ filterStatus: "confirmed" }} />
    </div>
      </div>
      );
    case 'Cancel Booking':
      return (
        <div>
        <h2 className="text-2xl font-bold mb-4"><u>Cancel Bookings</u></h2>
       {/* Add this container */}
       <MyBookings searchParams={{ filterStatus: "cancelled" }} />
    
        </div>
      );
    case 'Password Settings':
      return (
        <div>
        <ChangePassword/>
        <Link href="/forgotPassword">
        <p className='text-black text-md text-center'><i><u>Forgot your password?</u></i></p></Link>
        </div>
      );
    default:
      return null;
  }
};


  return (
  <div className='flex flex-col sm:flex-row overflow-x-auto'>
     {/* Sidebar */}
        {/* Hamburger Menu Button (Mobile Only) */}
        <button
        
        onClick={toggleSidebar}
        className="sm:hidden w-[40px] mt-2 left-4 p-2 bg-gray-400 text-black rounded-md"
      >
        {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed lg:static lg:block w-64 bg-gray-200 min-h-screen text-black p-4 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } z-20`}
      >
        <h2 className="text-lg font-semibold mb-4">User Profile</h2>
        <ul>
          <li className="mb-2">
            <button onClick={() => handleSidebarOptionClick('All Bookings')}  className={`w-full text-left hover:bg-gray-400 p-2 rounded ${
                activeOption === "All Bookings" ? "bg-gray-400 text-white" : ""
              }`} >All Bookings</button>
          </li>
          <li className="mb-2">
            <button onClick={() => handleSidebarOptionClick('Confirmed Booking')} className={`w-full text-left hover:bg-gray-400 p-2 rounded ${
                activeOption === "Confirmed Booking" ? "bg-gray-400 text-white " : ""
              }`}>Confirmed Booking</button>
          </li>
          <li className="mb-2">
            <button  onClick={() => handleSidebarOptionClick('Cancel Booking')} className={`w-full text-left hover:bg-gray-400 p-2 rounded ${
                activeOption === "Cancel Booking" ? "bg-gray-400 text-white" : ""
              }`}>Cancel Booking</button>
          </li>
          <li className="mb-2">
            <button onClick={() => handleSidebarOptionClick('Password Settings')} className={`w-full text-left hover:bg-gray-400 p-2 rounded ${
                activeOption === "Password Settings" ? "bg-gray-400 text-white" : ""
              }`}>Password Settings</button>
          </li>
        </ul>
      </div>
    <div className="flex flex-col items-start p-10 w-full">
     

      {/* Profile Section */}
      <div className="flex items-center gap-6 overflow-x-hidden ">
        {/* Profile Image (Click to Upload) */}
        <div className="relative">
        <div className="w-24 h-24 border-2 border-gray-300 rounded-full overflow-hidden cursor-pointer hover:opacity-80 transition"
     onClick={() => setShowOptions(!showOptions)}
>
    {croppedImage ? (
        <Image src={croppedImage} alt="Profile" onError={handleImageError} width={96} height={96} className="rounded-full" />
    ) : (
        <div className="w-full h-full text-center bg-gray-200 flex items-center justify-center text-gray-600">
            Upload Image
        </div>
    )}
</div>


{showOptions && (
    <div ref={dropdownRef} className="absolute top-24 left-0 w-40 bg-white shadow-lg rounded-md overflow-hidden">
      <label className="block text-sm px-4 py-2 text-gray-800 cursor-pointer hover:bg-gray-100">
        Upload Profile
        <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
      </label>
      {croppedImage && (
        <button
          onClick={handleDeleteProfileImage}
          className="block text-sm w-full text-left px-4 py-2 text-red-500 hover:bg-red-100"
        >
          Delete Profile Image
        </button>
      )}
    </div>
  )}

          {/* Upload Input (Hidden Until Clicked) */}
          {showUpload && (
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
             
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          )}
        </div>



        {/* Email */}
        <div>
        <p><b>User:</b></p>
        <p className="text-sm text-gray-600 font-medium text-gray-900">{email}</p>
        </div>
    

    
      </div>
      

      {/* Cropper Modal */}
      {showCropper && image && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-lg">
            <h3 className="text-xl font-semibold mb-4">Crop Your Profile Picture</h3>

            {/* Cropper Component */}
            <div className="relative w-full h-60">
              <Cropper
                image={image!}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end mt-4 gap-2">
              <button
                onClick={() => setShowCropper(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleCropDone}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Done
              </button>
              
            </div>
          </div>
        </div>
      )}
      
      <hr className='my-4 w-full'></hr>
    
    <div className=""> 
   {renderContent()}
    </div>
 
    </div>
   
    </div>
  );
}