import mongoose from 'mongoose';

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a pet name'],
    trim: true
  },
  type: {
    type: String,
    required: [true, 'Please specify pet type'],
    enum: ['Dog', 'Cat', 'Bird', 'Rabbit', 'Other']
  },
  breed: {
    type: String,
    required: [true, 'Please provide breed information'],
    trim: true
  },
  ageYears: {
    type: Number,
    required: true,
    min: 0
  },
  ageMonths: {
    type: Number,
    required: true,
    min: 0,
    max: 11
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female']
  },
  size: {
    type: String,
    required: true,
    enum: ['Small', 'Medium', 'Large']
  },
  temperament: [{
    type: String
  }],
  vaccinated: {
    type: Boolean,
    default: false
  },
  sterilized: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  adoptionFee: {
    type: Number,
    required: true,
    min: 0
  },
  images: [{
    type: String
  }],
  medicalRecords: [{
    type: String
  }],
  shelterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shelter'
  },
  status: {
    type: String,
    enum: ['available', 'adopted', 'pending'],
    default: 'available'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Pet = mongoose.model('Pet', petSchema);
export default Pet;