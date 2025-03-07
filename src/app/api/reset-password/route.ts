import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Received Body:", body); // 🛠 Debugging step

    const { token, newPassword } = body;

    // Find user by reset token
    const existingUser = await client.fetch(
      `*[_type == "user" && resetToken == $token && tokenExpiry > now()][0]`,
      { token }
    );
    console.log("Existing User:", existingUser); // 🛠 Debugging step

    if (!existingUser) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password and clear reset token
    await client
      .patch(existingUser._id)
      .set({ password: hashedPassword, resetToken: null, tokenExpiry: null })
      .commit();

    return NextResponse.json({ message: 'Password reset successful' }, { status: 200 });
  } catch (error) {
    console.error("Error in Reset Password:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}