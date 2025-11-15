const express = require('express');
const router = express.Router();
const {
  addToFavorites,
  removeFromFavorites,
  getMyFavorites
} = require('../controllers/favoritesController');
const authRequired = require('../middleware/authMiddleware');

// All routes require authentication
router.post('/add', authRequired, addToFavorites);
router.post('/remove', authRequired, removeFromFavorites);
router.get('/my', authRequired, getMyFavorites);

module.exports = router;
