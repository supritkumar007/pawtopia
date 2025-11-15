import { NextResponse } from 'next/server';
import connectDB from '@/lib/config/db';
import LostFound from '@/lib/models/LostFound';
import { authRequired, adminRequired } from '@/lib/middleware/auth';

// DELETE /api/lostfound/[id] - Delete lost/found post (Admin only)
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const user = await authRequired(request);
    adminRequired(user);

    const { id } = params;
    const post = await LostFound.findByIdAndDelete(id);

    if (!post) {
      return NextResponse.json({
        success: false,
        message: 'Post not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Post deleted successfully'
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