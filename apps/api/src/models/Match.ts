import { Schema, model, Document } from 'mongoose';

interface IMatch extends Document {
  user1: Schema.Types.ObjectId;
  user2: Schema.Types.ObjectId;
  status: 'pending' | 'accepted' | 'rejected';
  messages: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt?: Date;
}

const matchSchema = new Schema<IMatch>({
  user1: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  user2: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date }
}, {
  collection: 'Matches'
});

export default model<IMatch>('Match', matchSchema);
