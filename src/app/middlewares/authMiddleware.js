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
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthenticatedError('Invalid or missing token');
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new UnauthenticatedError('Invalid or missing token');
    }

    try {
      //we use this code to verify the token using jwtProvider
      const decoded = verifyToken(token);

      //this will fetch user from the database to ensure they exist and have the correct role
      const user = await User.findByPk(decoded.id);

      if (!user) {
        throw new UnauthenticatedError('User not found');
      }

      //to check if the user has one of the required roles
      if (requiredRoles.length && !requiredRoles.includes(user.role)) {
        throw new UnauthorizedError('Forbidden: Insufficient permissions');
      }
       
      req.user = user;
      next();
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new UnauthenticatedError('Unauthorized: Invalid token');
      }
      next(error); 
    }
  };
};

export const driverMiddleware = ( req, res, next) => {
  if (req.user.role !== 'driver') {
    return res.status(403).json({message: 'access denied, driver role required'});
  } next();
};
  export const adminMiddleware =( req, res, next ) => {
    if ( req.user.role !== 'driver') {
      return res.status(403).json({message: 'access denied, admin role required'});
    } next();
  };
export const adminMiddlewareOrDriverMiddleware = ( req, res, next) => {
  isAdmin( req, res, (err) => {
    if (err) {
      isDriver( req, res, next);
    } else {
      next();
    }
  });
};

export default authMiddleware;
