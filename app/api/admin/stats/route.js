import { NextResponse } from 'next/server';
import connectDB from '@/lib/config/db';
import Pet from '@/lib/models/Pet';
import Shelter from '@/lib/models/Shelter';
import Blog from '@/lib/models/Blog';
import Adoption from '@/lib/models/Adoption';
import User from '@/lib/models/User';
import { authRequired, adminRequired } from '@/lib/middleware/auth';

// GET /api/admin/stats - Get dashboard statistics (Admin)
export async function GET(request) {
  try {
    await connectDB();

    const user = await authRequired(request);
    adminRequired(user);

    const totalPets = await Pet.countDocuments();
    const availablePets = await Pet.countDocuments({ status: 'available' });
    const adoptedPets = await Pet.countDocuments({ status: 'adopted' });
    const pendingAdoptions = await Adoption.countDocuments({ status: 'submitted' });
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalShelters = await Shelter.countDocuments();

    return NextResponse.json({
      success: true,
      data: {
        totalPets,
        availablePets,
        adoptedPets,
        pendingAdoptions,
        totalUsers,
        totalShelters
      }
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