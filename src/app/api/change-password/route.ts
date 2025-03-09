import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Received Body:", body); // 🛠 Debugging step

    const { email, oldPassword, newPassword } = body;

    // Find user by userId
    const existingUser = await client.fetch(
      `*[_type == "user" && email == $email][0]`,
      { email }
    );

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Verify old password
    const isPasswordValid = await bcrypt.compare(oldPassword, existingUser.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Old password is incorrect" }, { status: 400 });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password in Sanity
    await client
      .patch(existingUser._id)
      .set({ password: hashedPassword })
      .commit();

    return NextResponse.json({ message: 'Password changed successfully' }, { status: 200 });
  } catch (error) {
    console.error("Error in Change Password:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}