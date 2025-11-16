import { NextResponse } from 'next/server';
import connectDB from '@/lib/config/db';
import User from '@/lib/models/User';
import Pet from '@/lib/models/Pet';
import Adoption from '@/lib/models/Adoption';
import Shelter from '@/lib/models/Shelter';
import { authRequired, adminRequired } from '@/lib/middleware/auth';

export async function GET(request) {
  try {
    await connectDB();

    // Check authentication and admin role
    const user = await authRequired(request);
    adminRequired(user);

    // Get stats
    const totalPets = await Pet.countDocuments();
    const availablePets = await Pet.countDocuments({ status: 'available' });
    const adoptedPets = await Pet.countDocuments({ status: 'adopted' });
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalShelters = await Shelter.countDocuments();
    
    // Adoption stats
    const pendingAdoptions = await Adoption.countDocuments({ status: 'submitted' });
    const approvedAdoptions = await Adoption.countDocuments({ status: 'approved' });
    const rejectedAdoptions = await Adoption.countDocuments({ status: 'rejected' });

    return NextResponse.json({
      success: true,
      data: {
        totalPets,
        availablePets,
        adoptedPets,
        pendingAdoptions,
        approvedAdoptions,
        rejectedAdoptions,
        totalUsers,
        totalShelters
      }
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message
    }, { status: error.message.includes('Admin access required') ? 403 : 401 });
  }
}