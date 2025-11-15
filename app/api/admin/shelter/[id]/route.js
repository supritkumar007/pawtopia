import { NextResponse } from 'next/server';
import connectDB from '@/lib/config/db';
import Shelter from '@/lib/models/Shelter';
import { authRequired, adminRequired } from '@/lib/middleware/auth';

// PATCH /api/admin/shelter/[id] - Update shelter (Admin)
export async function PATCH(request, { params }) {
  try {
    await connectDB();

    const user = await authRequired(request);
    adminRequired(user);

    const { id } = params;
    const updateData = await request.json();

    const shelter = await Shelter.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    );

    if (!shelter) {
      return NextResponse.json({
        success: false,
        message: 'Shelter not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Shelter updated successfully',
      data: shelter
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

// DELETE /api/admin/shelter/[id] - Delete shelter (Admin)
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const user = await authRequired(request);
    adminRequired(user);

    const { id } = params;
    const shelter = await Shelter.findByIdAndDelete(id);

    if (!shelter) {
      return NextResponse.json({
        success: false,
        message: 'Shelter not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Shelter deleted successfully'
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