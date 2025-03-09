import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
    try {
        const body = await req.json();
      

        // Check if user already exists
        const existingUser = await client.fetch(
            `*[_type == "user" && email == $email][0]`,
            { email: body.email }
        );
       

        if (existingUser) {
            return NextResponse.json({ error: "Email already registered!" }, { status: 400 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(body.password, 10);
        console.log("Hashed Password:", hashedPassword); // 🛠 Debugging step

        // Create user in Sanity
        const newUser = await client.create({
            _type: "user",
            email: body.email,
            password: hashedPassword,
            officeName: body.officeName,
            country: body.country,
            city: body.city,
            zipCode: body.zipCode,
            address: body.address,
            officialEmail: body.officialEmail,
            title: body.title,
            firstName: body.firstName,
            lastName: body.lastName,
            phone: body.phone,
            mobile: body.mobile,
            position: body.position,
            approved: false,
        }); 


        return NextResponse.json({ message: "User registered successfully!" }, { status: 200 });

    } catch (error) {
        console.error("Error in Registration:", error);
        return NextResponse.json({ error: "Registration failed" }, { status: 500 });
    }
}
