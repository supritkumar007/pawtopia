const Pet = require('../models/Pet');

// @desc    Get all available pets
// @route   GET /api/pets
// @access  Public
const getPets = async (req, res) => {
  try {
    // Only show available pets to public
    const pets = await Pet.find({ status: 'available' })
      .populate('shelterId', 'name address phone')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: pets.length,
      data: pets
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single pet by ID
// @route   GET /api/pets/:id
// @access  Public
const getPetById = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id).populate('shelterId', 'name address phone email');

    if (!pet) {
      return res.status(404).json({
        success: false,
        message: 'Pet not found'
      });
    }

    res.status(200).json({
      success: true,
      data: pet
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create new pet (Admin only)
// @route   POST /api/pets
// @access  Private/Admin
const createPet = async (req, res) => {
  try {
    const pet = await Pet.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Pet added successfully',
      data: pet
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update pet (Admin only)
// @route   PATCH /api/pets/:id
// @access  Private/Admin
const updatePet = async (req, res) => {
  try {
    const pet = await Pet.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!pet) {
      return res.status(404).json({
        success: false,
        message: 'Pet not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Pet updated successfully',
      data: pet
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete pet (Admin only)
// @route   DELETE /api/pets/:id
// @access  Private/Admin
const deletePet = async (req, res) => {
  try {
    const pet = await Pet.findByIdAndDelete(req.params.id);

    if (!pet) {
      return res.status(404).json({
        success: false,
        message: 'Pet not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Pet deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all pets including adopted (Admin only)
// @route   GET /api/pets/admin/all
// @access  Private/Admin
const getAllPetsAdmin = async (req, res) => {
  try {
    const pets = await Pet.find()
      .populate('shelterId', 'name address phone')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: pets.length,
      data: pets
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getPets,
  getPetById,
  createPet,
  updatePet,
  deletePet,
  getAllPetsAdmin
};
