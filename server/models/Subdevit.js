const mongoose = require('mongoose');

const subdevitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  mods: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  created_on: {
    type: Date,
    default: Date.now,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
  ],
  subscribers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

module.exports = mongoose.model('Subdevit', subdevitSchema);
