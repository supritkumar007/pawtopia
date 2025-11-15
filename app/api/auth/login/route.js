import { NextResponse } from 'next/server';
import connectDB from '@/lib/config/db';
import User from '@/lib/models/User';
import { generateAccessToken, generateRefreshToken } from '@/lib/utils/generateToken';

export async function POST(request) {
  try {
    await connectDB();

    const { email, password } = await request.json();

    // Validate email & password
    if (!email || !password) {
      return NextResponse.json({
        success: false,
        message: 'Please provide email and password'
      }, { status: 400 });
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return NextResponse.json({
        success: false,
        message: 'Invalid credentials'
      }, { status: 401 });
    }

    // Check if password matches
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return NextResponse.json({
        success: false,
        message: 'Invalid credentials'
      }, { status: 401 });
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    return NextResponse.json({
      success: true,
      message: 'Login successful',
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
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message
    }, { status: 500 });
  }
}