"use client";
import { createContext, useContext, useState, useEffect } from "react";

type ProfileContextType = {
  profileImage: string | null;
  updateProfileImage: (newImage: string | null) => void;
};

const ProfileContext = createContext<ProfileContextType | null>(null);

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);



  useEffect(() => {
   
    const storedEmail = localStorage.getItem("userEmail") || sessionStorage.getItem("userEmail");
    if (storedEmail) {
      setUserEmail(storedEmail);
      const savedImage = localStorage.getItem(`profileImage_${storedEmail}`)|| sessionStorage.getItem(`profileImage_${storedEmail}`);
      if (savedImage) {
        setProfileImage(savedImage);
      }
      else {
        console.error("userEmail is null in localStorage");
      }
    }
  }, []);

  // Listen for storage updates (changes from other tabs/windows)
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === `profileImage_${userEmail}`) {
      
        setProfileImage(event.newValue);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const updateProfileImage = (newImage: string | null) => {
    const userEmail = localStorage.getItem("userEmail") || sessionStorage.getItem("userEmail");
    if (userEmail) {
      
      if (newImage) {
        localStorage.setItem(`profileImage_${userEmail}`, newImage);
        sessionStorage.setItem(`profileImage_${userEmail}`, newImage);
      } else {
        localStorage.removeItem(`profileImage_${userEmail}`);
        sessionStorage.removeItem(`profileImage_${userEmail}`);
      }
      setProfileImage(newImage);
    }
  };
  

  return (
    <ProfileContext.Provider value={{ profileImage, updateProfileImage }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};