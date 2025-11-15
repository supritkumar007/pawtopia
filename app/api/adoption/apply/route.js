import { NextResponse } from 'next/server';
import connectDB from '@/lib/config/db';
import Adoption from '@/lib/models/Adoption';
import Pet from '@/lib/models/Pet';
import { authRequired } from '@/lib/middleware/auth';

// POST /api/adoption/apply - Submit adoption application (Private)
export async function POST(request) {
  try {
    await connectDB();

    const user = await authRequired(request);
    const { petId, questionnaire } = await request.json();

    // Check if pet exists and is available
    const pet = await Pet.findById(petId);

    if (!pet) {
      return NextResponse.json({
        success: false,
        message: 'Pet not found'
      }, { status: 404 });
    }

    if (pet.status !== 'available') {
      return NextResponse.json({
        success: false,
        message: 'This pet is not available for adoption'
      }, { status: 400 });
    }

    // Check if user already applied for this pet
    const existingApplication = await Adoption.findOne({
      userId: user._id,
      petId: petId,
      status: { $in: ['submitted', 'approved'] }
    });

    if (existingApplication) {
      return NextResponse.json({
        success: false,
        message: 'You have already applied for this pet'
      }, { status: 400 });
    }

    // Create adoption application
    const adoption = await Adoption.create({
      userId: user._id,
      petId,
      questionnaire
    });

    // Update pet status to pending
    pet.status = 'pending';
    await pet.save();

    return NextResponse.json({
      success: true,
      message: 'Adoption application submitted successfully',
      data: adoption
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
      redirect: error.message.includes('Not authorized') ? '/signin' : undefined
    }, { status: error.message.includes('Not authorized') ? 401 : 500 });
  }
}