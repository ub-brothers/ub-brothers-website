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
    user: "ubbrotherspk@gmail.com", // Your email
    pass: "rcts rwwf iwhb dqmw", // Your email password
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
      const now = new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' });
    // Send email with reset link
    const resetUrl = `https://ub-brothers-website-qlou.vercel.app/reset-password?token=${resetToken}`;
    const mailOptions = {
      from: `<ubbrotherspk@gmail.com>`,
      to: existingUser.email,
      subject:  `Password Reset Request - UB Brothers [${now}]`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset</title>
  <style>
    body {
      background-color: #f9fafb;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 10px;
      box-shadow: 0 8px 20px rgba(0,0,0,0.05);
      overflow: hidden;
    }
    .header {
      background: linear-gradient(135deg, #007bff, #00bfff);
      color: white;
      padding: 30px 20px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      padding: 30px 20px;
      color: #333333;
    }
    .content p {
      margin: 16px 0;
      font-size: 16px;
      line-height: 1.6;
    }
    .button {
      display: inline-block;
      margin: 20px 0;
      padding: 12px 24px;
      background-color: #007bff;
      color: white !important;
      text-decoration: none;
      border-radius: 6px;
      font-weight: bold;
    }
    .footer {
      text-align: center;
      padding: 20px;
      font-size: 13px;
      color: #888888;
    }
    .footer a {
      color: #007bff;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Reset Your Password</h1>
    </div>
    <div class="content">
      <p>Hi there,</p>
      <p>We received a request to reset the password for your account. If this was you, simply click the button below to choose a new password.</p>
      <p style="text-align:center;">
        <a href="${resetUrl}" class="button">Reset Password</a>
      </p>
      <p>If you did not request this, no action is needed — your password is still secure.</p>
      <p>Warm regards,<br><strong>UB Brothers Support Team</strong></p>
    </div>
    <div class="footer">
      <p>Need help? <a href="mailto:ubbrotherspk@gmail.com">Contact us</a></p>
      <p>© 2025 UB Brothers Travel & Tours. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "A password reset link has been sent to your email. Please check your spam folder if you don't see it." }, { status: 200 });
  } catch (error) {
    console.error("Error in Forgot Password:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}