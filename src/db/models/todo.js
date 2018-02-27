import mongoose from '../mongoose';

const todoSchema = new mongoose.Schema({
  title: String,
  created: {type: Date, default: Date.now()},
  evaluation: {type: Number, default: -1},
});

export const Todo = mongoose.model('Todo', todoSchema);
