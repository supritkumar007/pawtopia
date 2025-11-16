const Adoption = require('../models/Adoption');
const Pet = require('../models/Pet');
const User = require('../models/User');

// @desc    Submit adoption application
// @route   POST /api/adoption/apply
// @access  Private
const applyForAdoption = async (req, res) => {
  try {
    const { petId, questionnaire } = req.body;

    // Check if pet exists and is available
    const pet = await Pet.findById(petId);

    if (!pet) {
      return res.status(404).json({
        success: false,
        message: 'Pet not found'
      });
    }

    if (pet.status !== 'available') {
      return res.status(400).json({
        success: false,
        message: 'This pet is not available for adoption'
      });
    }

    // Check if user already applied for this pet
    const existingApplication = await Adoption.findOne({
      userId: req.user._id,
      petId: petId,
      status: { $in: ['submitted', 'approved'] }
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: 'You have already applied for this pet'
      });
    }

    // Create adoption application
    const adoption = await Adoption.create({
      userId: req.user._id,
      petId,
      questionnaire
    });

    // Update pet status to pending
    pet.status = 'pending';
    await pet.save();

    res.status(201).json({
      success: true,
      message: 'Adoption application submitted successfully',
      data: adoption
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get user's adoption applications
// @route   GET /api/adoption/my
// @access  Private
const getMyAdoptions = async (req, res) => {
  try {
    const adoptions = await Adoption.find({ userId: req.user._id })
      .populate('petId', 'name type breed images status')
      .sort({ submittedAt: -1 });

    res.status(200).json({
      success: true,
      count: adoptions.length,
      data: adoptions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single adoption application (Admin)
// @route   GET /api/adoption/:id
// @access  Private/Admin
const getAdoptionById = async (req, res) => {
  try {
    const adoption = await Adoption.findById(req.params.id)
      .populate('userId', 'name email phone location')
      .populate('petId', 'name type breed images');

    if (!adoption) {
      return res.status(404).json({
        success: false,
        message: 'Adoption application not found'
      });
    }

    res.status(200).json({
      success: true,
      data: adoption
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all adoption applications (Admin)
// @route   GET /api/adoption/admin/all
// @access  Private/Admin
const getAllAdoptions = async (req, res) => {
  try {
    const adoptions = await Adoption.find()
      .populate('userId', 'name email phone')
      .populate('petId', 'name type breed images status')
      .sort({ submittedAt: -1 });

    res.status(200).json({
      success: true,
      count: adoptions.length,
      data: adoptions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Approve adoption application (Admin)
// @route   PATCH /api/adoption/:id/approve
// @access  Private/Admin
const approveAdoption = async (req, res) => {
  try {
    const adoption = await Adoption.findById(req.params.id);

    if (!adoption) {
      return res.status(404).json({
        success: false,
        message: 'Adoption application not found'
      });
    }

    // Update adoption status
    adoption.status = 'approved';
    await adoption.save();

    // Update pet status to adopted
    const pet = await Pet.findById(adoption.petId);
    if (pet) {
      pet.status = 'adopted';
      await pet.save();
    }

    // Add adoption to user's adoptedPets array
    const user = await User.findById(adoption.userId);
    if (user && !user.adoptedPets.includes(adoption._id)) {
      user.adoptedPets.push(adoption._id);
      await user.save();
    }

    res.status(200).json({
      success: true,
      message: 'Adoption application approved',
      data: adoption
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Reject adoption application (Admin)
// @route   PATCH /api/adoption/:id/reject
// @access  Private/Admin
const rejectAdoption = async (req, res) => {
  try {
    const adoption = await Adoption.findById(req.params.id);

    if (!adoption) {
      return res.status(404).json({
        success: false,
        message: 'Adoption application not found'
      });
    }

    // Update adoption status
    adoption.status = 'rejected';
    await adoption.save();

    // Update pet status back to available
    const pet = await Pet.findById(adoption.petId);
    if (pet) {
      pet.status = 'available';
      await pet.save();
    }

    res.status(200).json({
      success: true,
      message: 'Adoption application rejected',
      data: adoption
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  applyForAdoption,
  getMyAdoptions,
  getAdoptionById,
  getAllAdoptions,
  approveAdoption,
  rejectAdoption
};
