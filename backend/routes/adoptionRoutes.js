const express = require('express');
const router = express.Router();
const {
  applyForAdoption,
  getMyAdoptions,
  getAdoptionById,
  getAllAdoptions,
  approveAdoption,
  rejectAdoption
} = require('../controllers/adoptionController');
const authRequired = require('../middleware/authMiddleware');
const adminOnly = require('../middleware/adminMiddleware');

// Protected routes (require login)
router.post('/apply', authRequired, applyForAdoption);
router.get('/my', authRequired, getMyAdoptions);

// Admin routes
router.get('/admin/all', authRequired, adminOnly, getAllAdoptions);
router.get('/:id', authRequired, adminOnly, getAdoptionById);
router.patch('/:id/approve', authRequired, adminOnly, approveAdoption);
router.patch('/:id/reject', authRequired, adminOnly, rejectAdoption);

module.exports = router;
