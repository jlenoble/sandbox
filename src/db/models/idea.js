import mongoose from '../mongoose';

const ideaSchema = new mongoose.Schema({
  title: String,
});

export const Idea = mongoose.model('Idea', ideaSchema);
