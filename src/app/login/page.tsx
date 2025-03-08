"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import IssueForm from "../loginIssue/page";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";


export default function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const data = await res.json();
        setLoading(false);

        if (!res.ok) {
            setError(data.error);
            return;
        }

        // Store the token in local storage
        localStorage.setItem("token", data.token);
        alert("Login successful!");

        // Redirect to dashboard or homepage
        router.push("/");
    };

    return (
        <div className="">
          <div className="relative flex items-center justify-center h-screen bg-gray-900 text-white">
            <Image src="/image/aero.jpg" quality={100} alt="Background" layout="fill" objectFit="cover" className="opacity-50" />
            <motion.div 
                initial={{ opacity: 0, y: -50 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5 }}
               
                className="bg-gray-800 bg-opacity-75 p-6 rounded-xl shadow-lg z-10 w-96"
            >
            <h2 className="text-2xl text-white text-center font-serif mt-4 font-bold mb-2"><u>Login</u></h2>
            {error && <p className="text-red-500">{error}</p>}

            <form onSubmit={handleSubmit} className="grid gap-3 mx-4">
                <p className="font-semibold mb-0">Email</p>
                <input type="email" name="email" placeholder="Email" required onChange={handleChange} className="border p-2 rounded text-black" />


                <p className='font-semibold mt-4'>Enter your Password</p>
               <div className="relative">
                    <input 
                        type={showPassword ? "text" : "password"} 
                        name="password" 
                        placeholder="Password" 
                        required 
                        onChange={handleChange} 
                        className="border p-2 text-black rounded w-full" 
                    />
                    <button 
                        type="button" 
                        className="absolute right-2 top-3 text-gray-600" 
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? "👁️" : "👁️‍🗨️"}
                    </button>
                </div>
              
                <Link href="/forgotPassword">
                <h2 className="text-sm text-right text-gray-200"><i><u>Forgot Password?</u></i></h2></Link>
                <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit" 
                        disabled={loading} 
                        className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg ${loading ? "opacity-50" : ""}`}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </motion.button>
            </form>
            </motion.div>

      
        </div>
         
        </div>
    );
}
