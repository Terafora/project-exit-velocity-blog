import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Define the interface for the JWT payload
interface JwtPayload {
  id: string;
  [key: string]: any; // For any additional fields in the token
}

// Extend the Express Request interface to include the user property
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.header('Authorization');
  
  // Ensure the token is provided
  if (!authHeader) {
    res.status(401).json({ message: 'Access denied. No token provided.' });
    return;
  }

  // Check for Bearer token format
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

export default authMiddleware;
