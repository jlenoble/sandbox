import mongoose from '../mongoose';

const uiSchema = new mongoose.Schema({
  title: String,
});

export const UI = mongoose.model('UI', uiSchema);
