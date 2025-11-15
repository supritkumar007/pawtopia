import { NextResponse } from 'next/server';
import connectDB from '@/lib/config/db';
import LostFound from '@/lib/models/LostFound';
import { authRequired } from '@/lib/middleware/auth';

// PATCH /api/lostfound/[id]/resolve - Mark post as resolved (Private)
export async function PATCH(request, { params }) {
  try {
    await connectDB();

    const user = await authRequired(request);
    const { id } = params;

    const post = await LostFound.findById(id);

    if (!post) {
      return NextResponse.json({
        success: false,
        message: 'Post not found'
      }, { status: 404 });
    }

    // Check if user owns the post
    if (post.userId.toString() !== user._id.toString()) {
      return NextResponse.json({
        success: false,
        message: 'Not authorized to update this post'
      }, { status: 403 });
    }

    post.status = 'resolved';
    await post.save();

    return NextResponse.json({
      success: true,
      message: 'Post marked as resolved',
      data: post
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
      redirect: error.message.includes('Not authorized') ? '/signin' : undefined
    }, { status: error.message.includes('Not authorized') ? 401 : 500 });
  }
}