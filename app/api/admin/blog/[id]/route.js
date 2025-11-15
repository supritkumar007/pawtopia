import { NextResponse } from 'next/server';
import connectDB from '@/lib/config/db';
import Blog from '@/lib/models/Blog';
import { authRequired, adminRequired } from '@/lib/middleware/auth';

// PATCH /api/admin/blog/[id] - Update blog (Admin)
export async function PATCH(request, { params }) {
  try {
    await connectDB();

    const user = await authRequired(request);
    adminRequired(user);

    const { id } = params;
    const updateData = await request.json();

    const blog = await Blog.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    );

    if (!blog) {
      return NextResponse.json({
        success: false,
        message: 'Blog post not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Blog post updated successfully',
      data: blog
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

// DELETE /api/admin/blog/[id] - Delete blog (Admin)
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const user = await authRequired(request);
    adminRequired(user);

    const { id } = params;
    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      return NextResponse.json({
        success: false,
        message: 'Blog post not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Blog post deleted successfully'
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