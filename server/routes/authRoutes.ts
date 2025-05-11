import express, { Request, Response } from 'express';

// Define custom request handler interface
interface CustomRequestHandler<P = {}, ResBody = any, ReqBody = any> {
  (req: Request<P, ResBody, ReqBody>, res: Response<ResBody>): void | Promise<void>;
}
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Define the interface for the login request body
interface LoginRequest {
  username: string;
  password: string;
}

// Define login handler
const loginHandler: CustomRequestHandler<{}, { token: string } | { message: string }, LoginRequest> = async (req, res) => {
  const { username, password } = req.body as LoginRequest;

  // Check if credentials match the admin details from .env
  if (username === process.env.ADMIN_USERNAME) {
    // Compare hashed password using bcrypt
    const isMatch = await bcrypt.compare(password, process.env.ADMIN_PASSWORD);
    
    if (isMatch) {
      // Create a JWT token
      const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ token });
      return;
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }
};

// Admin login route
router.post('/login', loginHandler);

export default router;
