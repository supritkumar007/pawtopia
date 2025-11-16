import { NextResponse } from 'next/server';
import connectDB from '@/lib/config/db';
import User from '@/lib/models/User';
import { authRequired } from '@/lib/middleware/auth';

// PUT /api/profile/update - Update user profile (Private)
export async function PUT(request) {
  try {
    await connectDB();

    const user = await authRequired(request);
    const { name, phone, city, state, avatar, preferences } = await request.json();

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
    if (city || state) {
      userDoc.location = {
        city: city || userDoc.location.city,
        state: state || userDoc.location.state
      };
    }
    if (avatar) userDoc.avatar = avatar;
    if (preferences) userDoc.preferences = preferences;

    await userDoc.save();

    // Return updated profile without password
    const updatedUser = await User.findById(userDoc._id).select('-password');

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedUser
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
      redirect: error.message.includes('Not authorized') ? '/signin' : undefined
    }, { status: error.message.includes('Not authorized') ? 401 : 500 });
  }
}