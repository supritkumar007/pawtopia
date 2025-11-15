const mongoose = require('mongoose');

const lostFoundSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['lost', 'found'],
    required: true
  },
  petName: {
    type: String,
    required: [true, 'Please provide pet name'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  lastSeenLocation: {
    type: String,
    required: [true, 'Please provide last seen location']
  },
  images: [{
    type: String
  }],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'resolved'],
    default: 'active'
  },
  postedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('LostFound', lostFoundSchema);
