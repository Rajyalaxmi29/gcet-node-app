import mongoose from 'mongoose';

const todoSchema = mongoose.Schema({
  task: { type: String, required: true },
  completed: { type: Boolean, default: false }
});

export default mongoose.model("Todo", todoSchema);
