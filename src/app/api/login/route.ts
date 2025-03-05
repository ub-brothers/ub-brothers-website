import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { client } from "@/sanity/lib/client";  // Aapke Sanity setup ka client import karein

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        // Sanity se user find karna
        const query = `*[_type == "user" && email == $email][0]`;
        const user = await client.fetch(query, { email });

        if (!user) {
            return NextResponse.json({ error: "User not found!" }, { status: 404 });
        }

        // User approval check
        if (!user.approved) {
            return NextResponse.json({ error: "Your account is not approved yet!" }, { status: 403 });
        }

        // Password verify karein
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return NextResponse.json({ error: "Invalid credentials!" }, { status: 401 });
        }

        // JWT Token Generate karein
        const token = jwt.sign({ userId: user._id, email: user.email }, SECRET_KEY, { expiresIn: "7d" });

        return NextResponse.json({ token, message: "Login successful!" });
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong!" }, { status: 500 });
    }
}
