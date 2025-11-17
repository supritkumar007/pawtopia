import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectDB from '@/lib/config/db';
import Pet from '@/lib/models/Pet';
import { authRequired, adminRequired } from '@/lib/middleware/auth';

// GET /api/pets/[id] - Get single pet by ID (Public)
export async function GET(request, { params }) {
  try {
    console.log('Connecting to database...');
    await connectDB();
    console.log('Database connected successfully');

    // In Next.js 15+, params might be a Promise
    const resolvedParams = await params;
    const { id } = resolvedParams;
    console.log('Resolved params:', resolvedParams);
    console.log('Looking for pet with ID:', id);
    if (id) {
      console.log('ID type:', typeof id);
      console.log('ID length:', id.length);
    } else {
      console.log('ID is undefined or null!');
      return NextResponse.json({
        success: false,
        message: 'Invalid pet ID'
      }, { status: 400 });
    }

    // First check if pet exists at all (without status filter)
    const petExists = await Pet.findById(id);
    console.log('Pet exists (any status):', !!petExists);
    if (petExists) {
      console.log('Pet status:', petExists.status);
      console.log('Pet name:', petExists.name);
    }

    // Then check with status filter
    const pet = await Pet.findOne({ _id: id, status: 'available' });
    console.log('Pet found with status filter:', !!pet);

    // If found, populate shelter info
    if (pet) {
      const populatedPet = await Pet.findById(id).populate('shelterId', 'name address phone email');
      console.log('Returning populated pet data');
      return NextResponse.json({
        success: true,
        data: populatedPet
      });
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

    const resolvedParams = await params;
    const { id } = resolvedParams;
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

    const resolvedParams = await params;
    const { id } = resolvedParams;
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