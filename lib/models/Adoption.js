import mongoose from 'mongoose';

const adoptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  petId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet',
    required: true
  },
  questionnaire: {
    type: Object,
    required: true
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['submitted', 'approved', 'rejected'],
    default: 'submitted'
  }
});

const Adoption = mongoose.model('Adoption', adoptionSchema);
export default Adoption;