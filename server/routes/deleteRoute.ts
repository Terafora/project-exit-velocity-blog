import express, { Request, Response } from 'express';
import Post, { IPost } from '../models/Post';
import authMiddleware from '../middleware/authMiddleware';

// Define custom request handler interface
interface CustomRequestHandler<P = {}, ResBody = any, ReqBody = any> {
  (req: Request<P, ResBody, ReqBody>, res: Response<ResBody>): void | Promise<void>;
}

const router = express.Router();

// Define delete post handler
const deletePostHandler: CustomRequestHandler<
  { postId: string }, 
  { message: string, deletedPost?: IPost }
> = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.postId);
    if (!deletedPost) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }
    res.json({ message: 'Post deleted', deletedPost });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

router.delete('/:postId', authMiddleware, deletePostHandler);

export default router;
