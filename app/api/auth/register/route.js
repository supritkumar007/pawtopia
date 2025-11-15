import { NextResponse } from 'next/server';
import connectDB from '@/lib/config/db';
import User from '@/lib/models/User';
import { generateAccessToken, generateRefreshToken } from '@/lib/utils/generateToken';

export async function POST(request) {
  try {
    await connectDB();

    const { name, email, phone, password, location } = await request.json();

    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return NextResponse.json({
        success: false,
        message: 'User already exists with this email'
      }, { status: 400 });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      phone,
      password,
      location: location || { city: '', state: '' }
    });

    if (user) {
      const accessToken = generateAccessToken(user._id);
      const refreshToken = generateRefreshToken(user._id);

      return NextResponse.json({
        success: true,
        message: 'User registered successfully',
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          location: user.location,
          avatar: user.avatar,
          accessToken,
          refreshToken
        }
      }, { status: 201 });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message
    }, { status: 500 });
  }
}