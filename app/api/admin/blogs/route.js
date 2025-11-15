import { NextResponse } from 'next/server';
import connectDB from '@/lib/config/db';
import Blog from '@/lib/models/Blog';

// GET /api/admin/blogs - Get all blogs (Public)
export async function GET() {
  try {
    await connectDB();

    const blogs = await Blog.find({ published: true })
      .populate('author', 'name')
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      count: blogs.length,
      data: blogs
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message
    }, { status: 500 });
  }
}