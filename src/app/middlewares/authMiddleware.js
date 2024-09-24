import jwt from 'jsonwebtoken';
import { UnauthenticatedError, UnauthorizedError } from '../../lib/error-definitions.js';
import User from '../models/user.js';
import dotenv from 'dotenv';
import { verifyToken } from '../providers/jwtProvider.js';

dotenv.config();

export const authMiddleware = (requiredRoles = []) => {
  return async (req, res, next) => {
    // Extract Authorization header
    const authHeader = req.headers.authorization;
    
    // Check if the Authorization header is present and starts with "Bearer"
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthenticatedError('Invalid or missing token');
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new UnauthenticatedError('Invalid or missing token');
    }

    try {
      // Verify the token using jwtProvider
      const decoded = verifyToken(token);

      // Fetch user from the database to ensure they exist and have the correct role
      const user = await User.findByPk(decoded.id);

      if (!user) {
        throw new UnauthenticatedError('User not found');
      }

      // Check if the user has one of the required roles
      if (requiredRoles.length && !requiredRoles.includes(user.role)) {
        throw new UnauthorizedError('Forbidden: Insufficient permissions');
      }
       
      req.user = user;
      next();
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new UnauthenticatedError('Unauthorized: Invalid token');
      }
      next(error); // Pass the error to the next middleware (error handler)
    }
  };
};

export default authMiddleware;
