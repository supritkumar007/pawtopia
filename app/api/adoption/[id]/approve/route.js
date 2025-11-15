import { NextResponse } from 'next/server';
import connectDB from '@/lib/config/db';
import Adoption from '@/lib/models/Adoption';
import Pet from '@/lib/models/Pet';
import { authRequired, adminRequired } from '@/lib/middleware/auth';

// PATCH /api/adoption/[id]/approve - Approve adoption application (Admin)
export async function PATCH(request, { params }) {
  try {
    await connectDB();

    const user = await authRequired(request);
    adminRequired(user);

    const { id } = params;
    const adoption = await Adoption.findById(id);

    if (!adoption) {
      return NextResponse.json({
        success: false,
        message: 'Adoption application not found'
      }, { status: 404 });
    }

    // Update adoption status
    adoption.status = 'approved';
    await adoption.save();

    // Update pet status to adopted
    const pet = await Pet.findById(adoption.petId);
    if (pet) {
      pet.status = 'adopted';
      await pet.save();
    }

    return NextResponse.json({
      success: true,
      message: 'Adoption application approved',
      data: adoption
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
      redirect: error.message.includes('Not authorized') ? '/signin' : undefined
    }, {
      status: error.message.includes('Admin access required') ? 403 :
             error.message.includes('Not authorized') ? 401 : 500
    });
  }
}