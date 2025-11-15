import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'Pet Adoption Backend API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      pets: '/api/pets',
      adoption: '/api/adoption',
      favorites: '/api/favorites',
      profile: '/api/profile',
      lostfound: '/api/lostfound',
      admin: '/api/admin'
    }
  });
}