import express from 'express';
import { Request, Response, RequestHandler } from 'express';
import Post, { IPost } from '../models/Post';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

// Define route handler types
interface CustomRequestHandler<P = {}, ResBody = any, ReqBody = any> {
  (req: Request<P, ResBody, ReqBody>, res: Response<ResBody>): void | Promise<void>;
}

// Get all posts (public route)
const getAllPosts: CustomRequestHandler<{}, IPost[] | { message: string; error?: string }> = async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    
    if (!posts || posts.length === 0) {
      console.log('No posts found in database');
      res.status(404).json({ message: 'No posts found' });
      return;
    }

    console.log(`Successfully retrieved ${posts.length} posts`);
    res.json(posts);
  } catch (err: any) {
    console.error('Database error when fetching posts:', err);
    res.status(500).json({ 
      message: 'Error fetching posts',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

router.get('/', getAllPosts);

// Get a specific post (public route)
const getPostById: CustomRequestHandler<{ postId: string }, IPost | { message: string }> = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.postId,
      { $inc: { views: 1 } },
      { new: true }
    );
    res.json(post);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

router.get('/:postId', getPostById);

// Create a post (protected route)
const createPost: CustomRequestHandler<{}, IPost | { message: string; error: string }, Partial<IPost>> = async (req, res) => {
  const newPost = new Post(req.body);
  try {
    await newPost.save(); 
    res.status(201).json(newPost); 
  } catch (err: any) {
    // Return detailed validation error message
    res.status(400).json({ message: 'Validation error', error: err.message });
    console.error("Validation error:", err.message); // Log detailed error to the console
  }
};

router.post('/', authMiddleware, createPost);

export default router;
