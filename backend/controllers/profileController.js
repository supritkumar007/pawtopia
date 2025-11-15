const User = require('../models/User');
const Adoption = require('../models/Adoption');

// @desc    Get user profile
// @route   GET /api/profile/me
// @access  Private
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select('-password')
      .populate({
        path: 'favorites',
        select: 'name type breed images status'
      });

    // Get adopted pets
    const adoptedPets = await Adoption.find({
      userId: req.user._id,
      status: 'approved'
    }).populate('petId', 'name type breed images');

    res.status(200).json({
      success: true,
      data: {
        user,
        adoptedPets: adoptedPets.map(a => a.petId)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/profile/update
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const { name, phone, location, avatar } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Update fields
    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (location) user.location = location;
    if (avatar) user.avatar = avatar;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getProfile,
  updateProfile
};
