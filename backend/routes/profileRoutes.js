const express = require('express');
const router = express.Router();
const {
  getProfile,
  updateProfile
} = require('../controllers/profileController');
const authRequired = require('../middleware/authMiddleware');

// All routes require authentication
router.get('/me', authRequired, getProfile);
router.put('/update', authRequired, updateProfile);

module.exports = router;
