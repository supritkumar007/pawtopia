import mongoose from 'mongoose';

const shelterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide shelter name'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide description'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String
  },
  phone: {
    type: String,
    required: [true, 'Please provide contact number']
  },
  email: {
    type: String,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  images: [{
    type: String
  }],
  capacity: {
    type: Number,
    default: 0
  },
  currentOccupancy: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Shelter = mongoose.model('Shelter', shelterSchema);
export default Shelter;