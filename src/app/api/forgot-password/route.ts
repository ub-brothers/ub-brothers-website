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
      from: `<${process.env.EMAIL_USER}>`,
      to: existingUser.email,
      subject: 'Password Reset Request',
      html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset Request</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
        }
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .email-header {
          background-color: #007bff;
          color: #ffffff;
          text-align: center;
          padding: 20px;
        }
        .email-header h1 {
          margin: 0;
          font-size: 24px;
        }
        .email-body {
          padding: 20px;
          color: #333333;
        }
        .email-body p {
          font-size: 16px;
          line-height: 1.5;
        }
        .reset-button {
          display: inline-block;
          background-color:rgb(143, 197, 255);
          color: #ffffff;
          padding: 12px 24px;
          
          text-decoration: none;
          border-radius: 5px;
          font-size: 16px;
          margin: 20px 0;
        }
        .email-footer {
          text-align: center;
          padding: 20px;
          background-color: #f4f4f4;
          color: #777777;
          font-size: 14px;
        }
        .email-footer a {
          color: #007bff;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <!-- Header -->
        <div class="email-header">
          <h1>Password Reset Request</h1>
        </div>

        <!-- Body -->
        <div class="email-body">
          <p>Hello,</p>
          <p>We received a request to reset your password. Click the button below to reset it:</p>
          <a href="${resetUrl}" class="reset-button">Reset Password</a>
          <p>If you did not request this, please ignore this email.</p>
          <p>Thank you,<br>UB Brothers</p>
        </div>

        <!-- Footer -->
        <div class="email-footer">
          <p>If you have any questions, feel free to <a href="mailto:ubbrotherspk@gmail.com">contact us</a>.</p>
          <p>&copy; 2025 UB Brothers Travel & Tours. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Password reset email sent' }, { status: 200 });
  } catch (error) {
    console.error("Error in Forgot Password:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}