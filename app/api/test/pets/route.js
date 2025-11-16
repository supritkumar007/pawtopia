import { NextResponse } from 'next/server';
import connectDB from '@/lib/config/db';
import Pet from '@/lib/models/Pet';

export async function GET() {
  try {
    console.log('Connecting to database...');
    await connectDB();
    console.log('Database connected successfully');

    console.log('Fetching available pets without populate...');
    const pets = await Pet.find({ status: 'available' }).sort({ createdAt: -1 });
    console.log(`Found ${pets.length} available pets`);

    return NextResponse.json({
      success: true,
      count: pets.length,
      data: pets
    });
  } catch (error) {
    console.error('Error in GET /api/test/pets:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    
    return NextResponse.json({
      success: false,
      message: error.message || 'Failed to fetch pets'
    }, { status: 500 });
  }
}