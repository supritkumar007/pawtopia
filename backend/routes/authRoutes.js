const express = require('express');
const router = express.Router();
const { register, login, logout, getMe } = require('../controllers/authController');
const authRequired = require('../middleware/authMiddleware');

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.post('/logout', authRequired, logout);
router.get('/me', authRequired, getMe);

module.exports = router;
