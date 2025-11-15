import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  content: {
    type: String,
    required: [true, 'Please provide content']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    enum: ['News', 'Tips', 'Stories', 'Events', 'General'],
    default: 'General'
  },
  images: [{
    type: String
  }],
  tags: [{
    type: String
  }],
  published: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;