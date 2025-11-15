import { NextResponse } from 'next/server';
import connectDB from '@/lib/config/db';
import User from '@/lib/models/User';
import Pet from '@/lib/models/Pet';
import { authRequired } from '@/lib/middleware/auth';

// POST /api/favorites/add - Add pet to favorites (Private)
export async function POST(request) {
  try {
    await connectDB();

    const user = await authRequired(request);
    const { petId } = await request.json();

    // Check if pet exists
    const pet = await Pet.findById(petId);
    if (!pet) {
      return NextResponse.json({
        success: false,
        message: 'Pet not found'
      }, { status: 404 });
    }

    // Get user
    const userDoc = await User.findById(user._id);

    // Check if already in favorites
    if (userDoc.favorites.includes(petId)) {
      return NextResponse.json({
        success: false,
        message: 'Pet already in favorites'
      }, { status: 400 });
    }

    // Add to favorites
    userDoc.favorites.push(petId);
    await userDoc.save();

    return NextResponse.json({
      success: true,
      message: 'Pet added to favorites',
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