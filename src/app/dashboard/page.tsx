"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    type User = {
        email: string;
      };
      
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/login");
        } else {
            fetch("/api/getUser", {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(res => res.json())
            .then(data => setUser({ email: data.email }))
            .catch(() => router.push("/login"));
        }
    }, [router]);

    if (!user) return <p>Loading...</p>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Welcome to Dashboard</h1>
            <button className="bg-red-500 text-white p-2 mt-4" onClick={() => {
                localStorage.removeItem("token");
                router.push("/login");
            }}>Logout</button>
        </div>
    );
}
