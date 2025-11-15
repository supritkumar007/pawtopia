import { NextResponse } from 'next/server';
import connectDB from '@/lib/config/db';
import User from '@/lib/models/User';
import Adoption from '@/lib/models/Adoption';
import { authRequired } from '@/lib/middleware/auth';

// GET /api/profile/me - Get user profile (Private)
export async function GET(request) {
  try {
    await connectDB();

    const user = await authRequired(request);

    const userDoc = await User.findById(user._id)
      .select('-password')
      .populate({
        path: 'favorites',
        select: 'name type breed images status'
      });

    // Get adopted pets
    const adoptedPets = await Adoption.find({
      userId: user._id,
      status: 'approved'
    }).populate('petId', 'name type breed images');

    return NextResponse.json({
      success: true,
      data: {
        user: userDoc,
        adoptedPets: adoptedPets.map(a => a.petId)
      }
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
      redirect: error.message.includes('Not authorized') ? '/signin' : undefined
    }, { status: error.message.includes('Not authorized') ? 401 : 500 });
  }
}