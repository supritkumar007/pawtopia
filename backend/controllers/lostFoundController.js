const LostFound = require('../models/LostFound');

// @desc    Create lost/found post
// @route   POST /api/lostfound/post
// @access  Private
const createPost = async (req, res) => {
  try {
    const { type, petName, description, lastSeenLocation, images } = req.body;

    const post = await LostFound.create({
      type,
      petName,
      description,
      lastSeenLocation,
      images: images || [],
      userId: req.user._id
    });

    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      data: post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all lost pet posts
// @route   GET /api/lostfound/lost
// @access  Public
const getLostPets = async (req, res) => {
  try {
    const posts = await LostFound.find({ type: 'lost', status: 'active' })
      .populate('userId', 'name phone email')
      .sort({ postedAt: -1 });

    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all found pet posts
// @route   GET /api/lostfound/found
// @access  Public
const getFoundPets = async (req, res) => {
  try {
    const posts = await LostFound.find({ type: 'found', status: 'active' })
      .populate('userId', 'name phone email')
      .sort({ postedAt: -1 });

    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all lost/found posts
// @route   GET /api/lostfound/all
// @access  Public
const getAllPosts = async (req, res) => {
  try {
    const posts = await LostFound.find({ status: 'active' })
      .populate('userId', 'name phone email')
      .sort({ postedAt: -1 });

    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Mark post as resolved
// @route   PATCH /api/lostfound/:id/resolve
// @access  Private
const resolvePost = async (req, res) => {
  try {
    const post = await LostFound.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    // Check if user owns the post
    if (post.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this post'
      });
    }

    post.status = 'resolved';
    await post.save();

    res.status(200).json({
      success: true,
      message: 'Post marked as resolved',
      data: post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete lost/found post (Admin only)
// @route   DELETE /api/lostfound/:id
// @access  Private/Admin
const deletePost = async (req, res) => {
  try {
    const post = await LostFound.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Post deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get user's own posts
// @route   GET /api/lostfound/my
// @access  Private
const getMyPosts = async (req, res) => {
  try {
    const posts = await LostFound.find({ userId: req.user._id })
      .sort({ postedAt: -1 });

    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createPost,
  getLostPets,
  getFoundPets,
  getAllPosts,
  resolvePost,
  deletePost,
  getMyPosts
};
