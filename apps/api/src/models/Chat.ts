import { Schema, model, Document } from 'mongoose';

interface IChat extends Document {
  sender: Schema.Types.ObjectId;
  receiver: Schema.Types.ObjectId;
  message?: string;
  fileUrl?: string;
  createdAt: Date;
}

const chatSchema = new Schema<IChat>({
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  message: String,
  fileUrl: String,
  createdAt: { type: Date, default: Date.now }
}, {
  collection: 'Chats'
});

export default model<IChat>('Chat', chatSchema);
