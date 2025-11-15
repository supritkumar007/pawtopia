const Pet = require('../models/Pet');
const Shelter = require('../models/Shelter');
const Blog = require('../models/Blog');
const Adoption = require('../models/Adoption');
const User = require('../models/User');

// @desc    Get dashboard statistics (Admin)
// @route   GET /api/admin/stats
// @access  Private/Admin
const getDashboardStats = async (req, res) => {
  try {
    const totalPets = await Pet.countDocuments();
    const availablePets = await Pet.countDocuments({ status: 'available' });
    const adoptedPets = await Pet.countDocuments({ status: 'adopted' });
    const pendingAdoptions = await Adoption.countDocuments({ status: 'submitted' });
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalShelters = await Shelter.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        totalPets,
        availablePets,
        adoptedPets,
        pendingAdoptions,
        totalUsers,
        totalShelters
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create shelter (Admin)
// @route   POST /api/admin/shelter
// @access  Private/Admin
const createShelter = async (req, res) => {
  try {
    const shelter = await Shelter.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Shelter created successfully',
      data: shelter
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all shelters
// @route   GET /api/admin/shelters
// @access  Public
const getAllShelters = async (req, res) => {
  try {
    const shelters = await Shelter.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: shelters.length,
      data: shelters
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update shelter (Admin)
// @route   PATCH /api/admin/shelter/:id
// @access  Private/Admin
const updateShelter = async (req, res) => {
  try {
    const shelter = await Shelter.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!shelter) {
      return res.status(404).json({
        success: false,
        message: 'Shelter not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Shelter updated successfully',
      data: shelter
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete shelter (Admin)
// @route   DELETE /api/admin/shelter/:id
// @access  Private/Admin
const deleteShelter = async (req, res) => {
  try {
    const shelter = await Shelter.findByIdAndDelete(req.params.id);

    if (!shelter) {
      return res.status(404).json({
        success: false,
        message: 'Shelter not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Shelter deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create blog post (Admin)
// @route   POST /api/admin/blog
// @access  Private/Admin
const createBlog = async (req, res) => {
  try {
    const blog = await Blog.create({
      ...req.body,
      author: req.user._id
    });

    res.status(201).json({
      success: true,
      message: 'Blog post created successfully',
      data: blog
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all blogs
// @route   GET /api/admin/blogs
// @access  Public
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ published: true })
      .populate('author', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update blog (Admin)
// @route   PATCH /api/admin/blog/:id
// @access  Private/Admin
const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Blog post updated successfully',
      data: blog
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete blog (Admin)
// @route   DELETE /api/admin/blog/:id
// @access  Private/Admin
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Blog post deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all users (Admin)
// @route   GET /api/admin/users
// @access  Private/Admin
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getDashboardStats,
  createShelter,
  getAllShelters,
  updateShelter,
  deleteShelter,
  createBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
  getAllUsers
};
