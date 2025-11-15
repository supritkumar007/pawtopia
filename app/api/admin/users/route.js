import { NextResponse } from 'next/server';
import connectDB from '@/lib/config/db';
import User from '@/lib/models/User';
import { authRequired, adminRequired } from '@/lib/middleware/auth';

// GET /api/admin/users - Get all users (Admin)
export async function GET(request) {
  try {
    await connectDB();

    const user = await authRequired(request);
    adminRequired(user);

    const users = await User.find().select('-password').sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      count: users.length,
      data: users
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