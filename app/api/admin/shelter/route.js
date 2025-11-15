import { NextResponse } from 'next/server';
import connectDB from '@/lib/config/db';
import Shelter from '@/lib/models/Shelter';
import { authRequired, adminRequired } from '@/lib/middleware/auth';

// POST /api/admin/shelter - Create shelter (Admin)
export async function POST(request) {
  try {
    await connectDB();

    const user = await authRequired(request);
    adminRequired(user);

    const shelterData = await request.json();
    const shelter = await Shelter.create(shelterData);

    return NextResponse.json({
      success: true,
      message: 'Shelter created successfully',
      data: shelter
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