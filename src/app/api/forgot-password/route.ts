import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';

// Nodemailer Setup
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your email password
  },
});

// Generate a random token
const generateToken = () => {
  return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    

    // Check if user exists
    const existingUser = await client.fetch(
      `*[_type == "user" && email == $email && approved == true][0]`,
      { email: body.email }
    );
   

    if (!existingUser) {
      return NextResponse.json({ error: "User not found!" }, { status: 404 });
    }

    // Generate and save reset token
    const resetToken = generateToken();
    const tokenExpiry = new Date(Date.now() + 3600000); // 1 hour expiry

    await client
      .patch(existingUser._id)
      .set({ resetToken, tokenExpiry })
      .commit();

    // Send email with reset link
    const resetUrl = `https://ub-brothers-website-qlou.vercel.app/reset-password?token=${resetToken}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: existingUser.email,
      subject: 'Password Reset Request',
      html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Password Reset Request</h2>
        <p>We received a request to reset your password. Click the button below to reset it:</p>
        <a href="${resetUrl}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
        <p>If you did not request this, please ignore this email.</p>
      </div>
    `,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Password reset email sent' }, { status: 200 });
  } catch (error) {
    console.error("Error in Forgot Password:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}