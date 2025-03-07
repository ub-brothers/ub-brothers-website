"use client";
import { createContext, useContext, useState, useEffect } from "react";

const ProfileContext = createContext<any>(null);

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    // Pehle se jo profile image localStorage me hai, use fetch karo
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

  return (
    <ProfileContext.Provider value={{ profileImage, setProfileImage }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
