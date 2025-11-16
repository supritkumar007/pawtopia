import { NextResponse } from 'next/server';
import connectDB from '@/lib/config/db';
import Pet from '@/lib/models/Pet';
import { authRequired, adminRequired } from '@/lib/middleware/auth';

// GET /api/pets - Get all available pets (Public)
export async function GET() {
  try {
    await connectDB();

    // Only show available pets to public
    const pets = await Pet.find({ status: 'available' })
      .populate('shelterId', 'name address phone')
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      count: pets.length,
      data: pets
    });
  } catch (error) {
    console.error('Error fetching pets:', error);
    return NextResponse.json({
      success: false,
      message: error.message || 'Failed to fetch pets'
    }, { status: 500 });
  }
}

// POST /api/pets - Create new pet (Admin only)
export async function POST(request) {
  try {
    await connectDB();

    const user = await authRequired(request);
    adminRequired(user);

    const petData = await request.json();
    const pet = await Pet.create(petData);

    return NextResponse.json({
      success: true,
      message: 'Pet added successfully',
      data: pet
    }, { status: 201 });
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