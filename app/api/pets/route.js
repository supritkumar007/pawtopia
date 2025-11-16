import { NextResponse } from 'next/server';
import connectDB from '@/lib/config/db';
import Pet from '@/lib/models/Pet';
import { authRequired, adminRequired } from '@/lib/middleware/auth';

// GET /api/pets - Get all available pets (Public)
export async function GET() {
  try {
    console.log('GET /api/pets called');
    await connectDB();
    console.log('Database connected');

    // Simple query without populate for testing
    console.log('Fetching pets...');
    const pets = await Pet.find({ status: 'available' }).limit(5);
    console.log(`Found ${pets.length} pets`);

    return NextResponse.json({
      success: true,
      count: pets.length,
      data: pets
    });
  } catch (error) {
    console.error('Error in GET /api/pets:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    
    // Try to provide more context about the error
    if (error.name === 'MongoServerSelectionError') {
      console.error('This is a MongoDB connection error. Check your MONGODB_URI environment variable.');
    } else if (error.name === 'MongoNetworkError') {
      console.error('This is a MongoDB network error. Check your network connection.');
    }
    
    return NextResponse.json({
      success: false,
      message: error.message || 'Failed to fetch pets'
    }, { status: 500 });
  }
}

// POST /api/pets - Create new pet (Admin only)
export async function POST(request) {
  try {
    await connectDB();

    const user = await authRequired(request);
    adminRequired(user);

    const petData = await request.json();
    const pet = await Pet.create(petData);

    return NextResponse.json({
      success: true,
      message: 'Pet added successfully',
      data: pet
    }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/pets:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    
    return NextResponse.json({
      success: false,
      message: error.message || 'Failed to create pet',
      redirect: error.message?.includes('Not authorized') ? '/signin' : undefined
    }, { 
      status: error.message?.includes('Admin access required') ? 403 :
             error.message?.includes('Not authorized') ? 401 : 500 
    });
  }
}