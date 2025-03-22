import { Schema, model } from 'mongoose';

const thanksgivingSchema = new Schema({
  memberName: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default model('Thanksgiving', thanksgivingSchema);