const User = require('../models/User');
const Adoption = require('../models/Adoption');

// @desc    Get user profile
// @route   GET /api/profile/me
// @access  Private
const getProfile = async (req, res) => {
  try {
    // Fetch user's own data with populated favorites
    const user = await User.findById(req.user._id)
      .select('-password')
      .populate({
        path: 'favorites',
        match: { status: 'available' }, // Only show available pets in favorites
        select: 'name type breed images status ageYears ageMonths gender adoptionFee'
      })
      .populate({
        path: 'adoptedPets',
        populate: {
          path: 'petId',
          select: 'name type breed images adoptionFee'
        }
      });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Get user's adoption applications
    const adoptions = await Adoption.find({ userId: req.user._id })
      .populate('petId', 'name type breed images status')
      .sort({ submittedAt: -1 });

    res.status(200).json({
      success: true,
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          location: user.location,
          avatar: user.avatar,
          preferences: user.preferences,
          createdAt: user.createdAt
        },
        favorites: user.favorites || [],
        adoptions: adoptions,
        adoptedPets: adoptions.filter(a => a.status === 'approved').map(a => a.petId)
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
    const { name, phone, city, state, avatar, preferences } = req.body;

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
    if (city || state) {
      user.location = {
        city: city || user.location.city,
        state: state || user.location.state
      };
    }
    if (avatar) user.avatar = avatar;
    if (preferences) user.preferences = preferences;

    await user.save();

    // Return updated profile without password
    const updatedUser = await User.findById(user._id).select('-password');

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedUser
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
