import { NextResponse } from 'next/server';
import connectDB from '@/lib/config/db';
import Blog from '@/lib/models/Blog';
import { authRequired, adminRequired } from '@/lib/middleware/auth';

// POST /api/admin/blog - Create blog post (Admin)
export async function POST(request) {
  try {
    await connectDB();

    const user = await authRequired(request);
    adminRequired(user);

    const blogData = await request.json();
    const blog = await Blog.create({
      ...blogData,
      author: user._id
    });

    return NextResponse.json({
      success: true,
      message: 'Blog post created successfully',
      data: blog
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