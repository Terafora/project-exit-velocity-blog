import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for the multilingual fields
interface MultilingualField {
  en: string;
  fr: string;
  ja: string;
  eo: string;
  es: string;
}

// Define the interface for the Post document
export interface IPost extends Document {
  title: MultilingualField;
  content: MultilingualField;
  author: string;
  tags: string[];
  imageURL?: string;
  date: Date;
  views: number;
}

// Create the schema
const postSchema = new Schema<IPost>({
  title: {
    en: { type: String, required: true },
    fr: { type: String, required: true },
    ja: { type: String, required: true },
    eo: { type: String, required: true },
    es: { type: String, required: true }
  },
  content: {
    en: { type: String, required: true },
    fr: { type: String, required: true },
    ja: { type: String, required: true },
    eo: { type: String, required: true },
    es: { type: String, required: true }
  },
  author: { type: String, required: true },
  tags: [{ type: String }],
  imageURL: { type: String },
  date: { type: Date, default: Date.now },
  views: { type: Number, default: 0 }
});

// Create and export the model
const Post = mongoose.model<IPost>('Post', postSchema);
export default Post;
