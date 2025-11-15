import { NextResponse } from 'next/server';
import connectDB from '@/lib/config/db';
import LostFound from '@/lib/models/LostFound';

// GET /api/lostfound/found - Get all found pet posts (Public)
export async function GET() {
  try {
    await connectDB();

    const posts = await LostFound.find({ type: 'found', status: 'active' })
      .populate('userId', 'name phone email')
      .sort({ postedAt: -1 });

    return NextResponse.json({
      success: true,
      count: posts.length,
      data: posts
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message
    }, { status: 500 });
  }
}