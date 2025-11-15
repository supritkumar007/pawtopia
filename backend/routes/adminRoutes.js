const express = require('express');
const router = express.Router();
const {
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
} = require('../controllers/adminController');
const authRequired = require('../middleware/authMiddleware');
const adminOnly = require('../middleware/adminMiddleware');

// All admin routes require authentication and admin role
router.use(authRequired, adminOnly);

// Dashboard
router.get('/stats', getDashboardStats);

// Shelter management
router.post('/shelter', createShelter);
router.get('/shelters', getAllShelters);
router.patch('/shelter/:id', updateShelter);
router.delete('/shelter/:id', deleteShelter);

// Blog management
router.post('/blog', createBlog);
router.get('/blogs', getAllBlogs);
router.patch('/blog/:id', updateBlog);
router.delete('/blog/:id', deleteBlog);

// User management
router.get('/users', getAllUsers);

module.exports = router;
