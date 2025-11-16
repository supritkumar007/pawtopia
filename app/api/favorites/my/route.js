import { NextResponse } from 'next/server';
import connectDB from '@/lib/config/db';
import User from '@/lib/models/User';
import { authRequired } from '@/lib/middleware/auth';

// GET /api/favorites/my - Get user's favorite pets (Private)
export async function GET(request) {
  try {
    await connectDB();

    const user = await authRequired(request);

    // Get only the logged-in user's favorites
    const userDoc = await User.findById(user._id).populate({
      path: 'favorites',
      match: { status: 'available' }, // Only show available pets
      select: 'name type breed images status ageYears ageMonths gender adoptionFee size temperament'
    });

    if (!userDoc) {
      return NextResponse.json({
        success: false,
        message: 'User not found'
      }, { status: 404 });
    }

    // Filter out null entries (pets that no longer exist or are not available)
    const validFavorites = userDoc.favorites.filter(pet => pet !== null);

    return NextResponse.json({
      success: true,
      count: validFavorites.length,
      data: validFavorites,
      message: validFavorites.length === 0 ? 'No favorites yet' : undefined
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
      redirect: error.message.includes('Not authorized') ? '/signin' : undefined
    }, { status: error.message.includes('Not authorized') ? 401 : 500 });
  }
}