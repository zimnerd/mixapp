import { Schema, model, Document } from 'mongoose';

interface IMessage extends Document {
  matchId: Schema.Types.ObjectId;
  sender: Schema.Types.ObjectId;
  content: string;
  createdAt: Date;
}

const messageSchema = new Schema<IMessage>({
  matchId: { type: Schema.Types.ObjectId, ref: 'Match', required: true },
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
}, {
  collection: 'Messages'
});

export default model<IMessage>('Message', messageSchema);
