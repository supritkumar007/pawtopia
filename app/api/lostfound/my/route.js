import { NextResponse } from 'next/server';
import connectDB from '@/lib/config/db';
import LostFound from '@/lib/models/LostFound';
import { authRequired } from '@/lib/middleware/auth';

// GET /api/lostfound/my - Get user's own posts (Private)
export async function GET(request) {
  try {
    await connectDB();

    const user = await authRequired(request);

    const posts = await LostFound.find({ userId: user._id })
      .sort({ postedAt: -1 });

    return NextResponse.json({
      success: true,
      count: posts.length,
      data: posts
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
      redirect: error.message.includes('Not authorized') ? '/signin' : undefined
    }, { status: error.message.includes('Not authorized') ? 401 : 500 });
  }
}