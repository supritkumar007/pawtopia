import { NextResponse } from 'next/server';
import connectDB from '@/lib/config/db';
import Adoption from '@/lib/models/Adoption';
import { authRequired, adminRequired } from '@/lib/middleware/auth';

// GET /api/adoption/admin/all - Get all adoption applications (Admin)
export async function GET(request) {
  try {
    await connectDB();

    const user = await authRequired(request);
    adminRequired(user);

    const adoptions = await Adoption.find()
      .populate('userId', 'name email phone')
      .populate('petId', 'name type breed images status')
      .sort({ submittedAt: -1 });

    return NextResponse.json({
      success: true,
      count: adoptions.length,
      data: adoptions
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