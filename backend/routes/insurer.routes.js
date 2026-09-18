const express = require('express');
const router = express.Router();
const { 
  insurerLogin, 
  insurerLogout, 
  showClaims, 
  editClaims, 
  getClaimById 
} = require('../controllers/insurer.controllers.js');
const authenticateUser = require('../middlewares/authentication.js');

// Insurer authentication (uses seeded mock user)
router.post('/login', insurerLogin);
router.post('/logout', authenticateUser, insurerLogout);

// View all claims (supports query filters for status, date, amount)
router.get('/claims', authenticateUser, showClaims);

// Get a single claim's full details
router.get('/claims/:id', authenticateUser, getClaimById);

// Update claim status, approved amount, and comments
router.put('/claims/:id', authenticateUser, editClaims);

module.exports = router;