import { NextResponse } from 'next/server';
import connectDB from '@/lib/config/db';
import LostFound from '@/lib/models/LostFound';
import { authRequired } from '@/lib/middleware/auth';

// POST /api/lostfound/post - Create lost/found post (Private)
export async function POST(request) {
  try {
    await connectDB();

    const user = await authRequired(request);
    const { type, petName, description, lastSeenLocation, images } = await request.json();

    const post = await LostFound.create({
      type,
      petName,
      description,
      lastSeenLocation,
      images: images || [],
      userId: user._id
    });

    return NextResponse.json({
      success: true,
      message: 'Post created successfully',
      data: post
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
      redirect: error.message.includes('Not authorized') ? '/signin' : undefined
    }, { status: error.message.includes('Not authorized') ? 401 : 500 });
  }
}