const User = require('../models/User');
const Pet = require('../models/Pet');

// @desc    Add pet to favorites
// @route   POST /api/favorites/add
// @access  Private
const addToFavorites = async (req, res) => {
  try {
    const { petId } = req.body;

    // Check if pet exists
    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.status(404).json({
        success: false,
        message: 'Pet not found'
      });
    }

    // Get user
    const user = await User.findById(req.user._id);

    // Check if already in favorites
    if (user.favorites.includes(petId)) {
      return res.status(400).json({
        success: false,
        message: 'Pet already in favorites'
      });
    }

    // Add to favorites
    user.favorites.push(petId);
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Pet added to favorites',
      data: user.favorites
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Remove pet from favorites
// @route   POST /api/favorites/remove
// @access  Private
const removeFromFavorites = async (req, res) => {
  try {
    const { petId } = req.body;

    // Get user
    const user = await User.findById(req.user._id);

    // Check if pet is in favorites
    if (!user.favorites.includes(petId)) {
      return res.status(400).json({
        success: false,
        message: 'Pet not in favorites'
      });
    }

    // Remove from favorites
    user.favorites = user.favorites.filter(
      (favId) => favId.toString() !== petId
    );
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Pet removed from favorites',
      data: user.favorites
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get user's favorite pets
// @route   GET /api/favorites/my
// @access  Private
const getMyFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: 'favorites',
      select: 'name type breed images status ageYears ageMonths gender adoptionFee'
    });

    res.status(200).json({
      success: true,
      count: user.favorites.length,
      data: user.favorites
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  addToFavorites,
  removeFromFavorites,
  getMyFavorites
};
