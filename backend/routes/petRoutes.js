const express = require('express');
const router = express.Router();
const {
  getPets,
  getPetById,
  createPet,
  updatePet,
  deletePet,
  getAllPetsAdmin
} = require('../controllers/petController');
const authRequired = require('../middleware/authMiddleware');
const adminOnly = require('../middleware/adminMiddleware');

// Public routes
router.get('/', getPets);
router.get('/:id', getPetById);

// Admin routes
router.get('/admin/all', authRequired, adminOnly, getAllPetsAdmin);
router.post('/', authRequired, adminOnly, createPet);
router.patch('/:id', authRequired, adminOnly, updatePet);
router.delete('/:id', authRequired, adminOnly, deletePet);

module.exports = router;
