import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectDB from '@/lib/config/db';
import Pet from '@/lib/models/Pet';
import { authRequired, adminRequired } from '@/lib/middleware/auth';

// GET /api/pets/[id] - Get single pet by ID (Public)
export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = params;
    console.log('Looking for pet with ID:', id);

    // Try different approaches to find the pet
    let pet = null;

    // First try findById
    try {
      pet = await Pet.findById(id);
      console.log('findById result:', !!pet);
    } catch (error) {
      console.log('findById error:', error.message);
    }

    // If not found, try findOne with ObjectId
    if (!pet) {
      try {
        const objectId = new mongoose.Types.ObjectId(id);
        pet = await Pet.findOne({ _id: objectId });
        console.log('findOne with ObjectId result:', !!pet);
      } catch (error) {
        console.log('findOne with ObjectId error:', error.message);
      }
    }

    // If still not found, try findOne with string
    if (!pet) {
      try {
        pet = await Pet.findOne({ _id: id });
        console.log('findOne with string result:', !!pet);
      } catch (error) {
        console.log('findOne with string error:', error.message);
      }
    }

    console.log('Final pet found:', !!pet);

    // If found, populate shelter info
    if (pet) {
      pet = await Pet.findById(id).populate('shelterId', 'name address phone email');
    }

    if (!pet) {
      return NextResponse.json({
        success: false,
        message: 'Pet not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: pet
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message
    }, { status: 500 });
  }
}

// PATCH /api/pets/[id] - Update pet (Admin only)
export async function PATCH(request, { params }) {
  try {
    await connectDB();

    const user = await authRequired(request);
    adminRequired(user);

    const { id } = params;
    const updateData = await request.json();

    const pet = await Pet.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    );

    if (!pet) {
      return NextResponse.json({
        success: false,
        message: 'Pet not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Pet updated successfully',
      data: pet
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

// DELETE /api/pets/[id] - Delete pet (Admin only)
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const user = await authRequired(request);
    adminRequired(user);

    const { id } = params;
    const pet = await Pet.findByIdAndDelete(id);

    if (!pet) {
      return NextResponse.json({
        success: false,
        message: 'Pet not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Pet deleted successfully'
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