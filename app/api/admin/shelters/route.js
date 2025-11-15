import { NextResponse } from 'next/server';
import connectDB from '@/lib/config/db';
import Shelter from '@/lib/models/Shelter';

// GET /api/admin/shelters - Get all shelters (Public)
export async function GET() {
  try {
    await connectDB();

    const shelters = await Shelter.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      count: shelters.length,
      data: shelters
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message
    }, { status: 500 });
  }
}