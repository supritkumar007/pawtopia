const express = require('express');
const router = express.Router();
const {
  createPost,
  getLostPets,
  getFoundPets,
  getAllPosts,
  resolvePost,
  deletePost,
  getMyPosts
} = require('../controllers/lostFoundController');
const authRequired = require('../middleware/authMiddleware');
const adminOnly = require('../middleware/adminMiddleware');

// Public routes
router.get('/lost', getLostPets);
router.get('/found', getFoundPets);
router.get('/all', getAllPosts);

// Protected routes
router.post('/post', authRequired, createPost);
router.get('/my', authRequired, getMyPosts);
router.patch('/:id/resolve', authRequired, resolvePost);

// Admin routes
router.delete('/:id', authRequired, adminOnly, deletePost);

module.exports = router;
