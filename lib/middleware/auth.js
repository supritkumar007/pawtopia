import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const authRequired = async (req) => {
  let token;

  // Get authorization header from Next.js Request object
  const authHeader = req.headers.get('authorization');
  
  // Check for token in Authorization header
  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1];
  }

  // Make sure token exists
  if (!token) {
    throw new Error('Not authorized to access this route');
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from token
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

export const adminRequired = (user) => {
  if (user.role !== 'admin') {
    throw new Error('Admin access required');
  }
};