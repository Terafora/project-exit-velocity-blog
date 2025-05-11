import express, { Request, Response } from 'express';
import Post, { IPost } from '../models/Post';
import authMiddleware from '../middleware/authMiddleware';

// Define custom request handler interface
interface CustomRequestHandler<P = {}, ResBody = any, ReqBody = any> {
  (req: Request<P, ResBody, ReqBody>, res: Response<ResBody>): void | Promise<void>;
}

const router = express.Router();

// Define update post handler
const updatePostHandler: CustomRequestHandler<
  { postId: string },
  IPost | { message: string },
  Partial<IPost>
> = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      { $set: req.body },
      { new: true }
    );
    res.json(updatedPost);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

router.patch('/:postId', authMiddleware, updatePostHandler);

export default router;
