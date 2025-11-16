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

    // Fetch user's own data with populated favorites
    const userDoc = await User.findById(user._id)
      .select('-password')
      .populate({
        path: 'favorites',
        match: { status: 'available' }, // Only show available pets in favorites
        select: 'name type breed images status ageYears ageMonths gender adoptionFee'
      })
      .populate({
        path: 'adoptedPets',
        populate: {
          path: 'petId',
          select: 'name type breed images adoptionFee'
        }
      });

    if (!userDoc) {
      return NextResponse.json({
        success: false,
        message: 'User not found'
      }, { status: 404 });
    }

    // Get user's adoption applications
    const adoptions = await Adoption.find({ userId: user._id })
      .populate('petId', 'name type breed images status')
      .sort({ submittedAt: -1 });

    return NextResponse.json({
      success: true,
      data: {
        user: {
          _id: userDoc._id,
          name: userDoc.name,
          email: userDoc.email,
          phone: userDoc.phone,
          role: userDoc.role,
          location: userDoc.location,
          avatar: userDoc.avatar,
          preferences: userDoc.preferences,
          createdAt: userDoc.createdAt
        },
        favorites: userDoc.favorites?.filter(pet => pet !== null) || [],
        adoptions: adoptions,
        adoptedPets: adoptions.filter(a => a.status === 'approved').map(a => a.petId)
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