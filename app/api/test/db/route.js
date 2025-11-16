import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET() {
  try {
    console.log('Testing MongoDB connection...');
    console.log('MONGODB_URI:', process.env.MONGODB_URI?.substring(0, 30) + '...');
    
    // Test connection
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, {
      bufferCommands: false,
      maxPoolSize: 1,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
    });
    console.log('✅ MongoDB Connected Successfully');
    
    // List collections
    console.log('Getting collections...');
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));
    
    // Close connection
    await mongoose.connection.close();
    console.log('✅ MongoDB Connection Closed');
    
    return NextResponse.json({
      success: true,
      message: 'MongoDB connection test successful',
      collections: collections.map(c => c.name)
    });
  } catch (error) {
    console.error('❌ MongoDB Connection Test Failed:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    
    return NextResponse.json({
      success: false,
      message: error.message || 'MongoDB connection test failed'
    }, { status: 500 });
  }
}