import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('Environment variables check:');
    console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI);
    console.log('MONGODB_URI length:', process.env.MONGODB_URI?.length || 0);
    console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET);
    console.log('NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL);
    
    // Don't log the full URI for security, just check if it exists and has the right format
    const hasMongoUri = !!process.env.MONGODB_URI && process.env.MONGODB_URI.startsWith('mongodb');
    
    return NextResponse.json({
      success: true,
      message: 'Environment variables check completed',
      hasMongoUri,
      hasJwtSecret: !!process.env.JWT_SECRET,
      apiUrl: process.env.NEXT_PUBLIC_API_URL
    });
  } catch (error) {
    console.error('Error checking environment variables:', error);
    return NextResponse.json({
      success: false,
      message: error.message || 'Failed to check environment variables'
    }, { status: 500 });
  }
}