import { NextResponse } from 'next/server';
import connectDB from '@/lib/config/db';
import { authRequired } from '@/lib/middleware/auth';

export async function GET(request) {
  try {
    await connectDB();

    // Get authenticated user
    const user = await authRequired(request);

    return NextResponse.json({
      success: true,
      data: user
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message
    }, { status: 401 });
  }
}
