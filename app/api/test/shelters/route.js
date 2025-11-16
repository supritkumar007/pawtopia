import { NextResponse } from 'next/server';
import connectDB from '@/lib/config/db';
import Shelter from '@/lib/models/Shelter';

export async function GET() {
  try {
    console.log('Connecting to database...');
    await connectDB();
    console.log('Database connected successfully');

    console.log('Fetching shelters...');
    const shelters = await Shelter.find({});
    console.log(`Found ${shelters.length} shelters`);

    return NextResponse.json({
      success: true,
      count: shelters.length,
      data: shelters
    });
  } catch (error) {
    console.error('Error in GET /api/test/shelters:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    
    return NextResponse.json({
      success: false,
      message: error.message || 'Failed to fetch shelters'
    }, { status: 500 });
  }
}