import { NextResponse } from 'next/server';
import connectDB from '@/lib/config/db';
import User from '@/lib/models/User';
import { authRequired } from '@/lib/middleware/auth';

// POST /api/favorites/remove - Remove pet from favorites (Private)
export async function POST(request) {
  try {
    await connectDB();

    const user = await authRequired(request);
    const { petId } = await request.json();

    // Get user
    const userDoc = await User.findById(user._id);

    // Check if pet is in favorites
    if (!userDoc.favorites.includes(petId)) {
      return NextResponse.json({
        success: false,
        message: 'Pet not in favorites'
      }, { status: 400 });
    }

    // Remove from favorites
    userDoc.favorites = userDoc.favorites.filter(
      (favId) => favId.toString() !== petId
    );
    await userDoc.save();

    return NextResponse.json({
      success: true,
      message: 'Pet removed from favorites',
      data: userDoc.favorites
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
      redirect: error.message.includes('Not authorized') ? '/signin' : undefined
    }, { status: error.message.includes('Not authorized') ? 401 : 500 });
  }
}