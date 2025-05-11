import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for the Update document
export interface IUpdate extends Document {
  title: string;
  content: string;
  date: Date;
}

// Create the schema
const updateSchema = new Schema<IUpdate>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

// Create and export the model
const Update = mongoose.model<IUpdate>('Update', updateSchema);
export default Update;
