import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const authRequired = async (req) => {
  let token;

  // Check for token in Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  // Check for token in cookies
  else if (req.cookies?.token) {
    token = req.cookies.token;
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