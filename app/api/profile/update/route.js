import { NextResponse } from 'next/server';
import connectDB from '@/lib/config/db';
import User from '@/lib/models/User';
import { authRequired } from '@/lib/middleware/auth';

// PUT /api/profile/update - Update user profile (Private)
export async function PUT(request) {
  try {
    await connectDB();

    const user = await authRequired(request);
    const { name, phone, location, avatar } = await request.json();

    const userDoc = await User.findById(user._id);

    if (!userDoc) {
      return NextResponse.json({
        success: false,
        message: 'User not found'
      }, { status: 404 });
    }

    // Update fields
    if (name) userDoc.name = name;
    if (phone) userDoc.phone = phone;
    if (location) userDoc.location = location;
    if (avatar) userDoc.avatar = avatar;

    await userDoc.save();

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
      data: userDoc
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
      redirect: error.message.includes('Not authorized') ? '/signin' : undefined
    }, { status: error.message.includes('Not authorized') ? 401 : 500 });
  }
}