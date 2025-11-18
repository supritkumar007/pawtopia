import { NextResponse } from 'next/server';
import connectDB from '@/lib/config/db';
import Blog from '@/lib/models/Blog';

// GET /api/blogs - Get all published blogs (Public)
export async function GET() {
  try {
    console.log('Connecting to database for blogs...');
    await connectDB();
    console.log('Database connected successfully for blogs');

    console.log('Fetching blogs...');
    const blogs = await Blog.find({ published: true })
      .populate('author', 'name')
      .sort({ createdAt: -1 });

    console.log('Found blogs:', blogs.length);
    if (blogs.length > 0) {
      console.log('First blog:', { id: blogs[0]._id, title: blogs[0].title, author: blogs[0].author });
    }

    return NextResponse.json({
      success: true,
      count: blogs.length,
      data: blogs
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({
      success: false,
      message: error.message
    }, { status: 500 });
  }
}