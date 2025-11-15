import { NextResponse } from 'next/server';
import connectDB from '@/lib/config/db';
import User from '@/lib/models/User';
import { authRequired } from '@/lib/middleware/auth';

// GET /api/favorites/my - Get user's favorite pets (Private)
export async function GET(request) {
  try {
    await connectDB();

    const user = await authRequired(request);

    const userDoc = await User.findById(user._id).populate({
      path: 'favorites',
      select: 'name type breed images status ageYears ageMonths gender adoptionFee'
    });

    return NextResponse.json({
      success: true,
      count: userDoc.favorites.length,
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