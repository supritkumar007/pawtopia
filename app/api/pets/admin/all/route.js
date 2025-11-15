import { NextResponse } from 'next/server';
import connectDB from '@/lib/config/db';
import Pet from '@/lib/models/Pet';
import { authRequired, adminRequired } from '@/lib/middleware/auth';

// GET /api/pets/admin/all - Get all pets including adopted (Admin only)
export async function GET(request) {
  try {
    await connectDB();

    const user = await authRequired(request);
    adminRequired(user);

    const pets = await Pet.find()
      .populate('shelterId', 'name address phone')
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      count: pets.length,
      data: pets
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