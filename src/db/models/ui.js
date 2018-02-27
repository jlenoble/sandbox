import mongoose from '../mongoose';

const uiSchema = new mongoose.Schema({
  name: String,
  title: String,
}, {
  collection: 'UI',
});

export const UI = mongoose.model('UI', uiSchema);
