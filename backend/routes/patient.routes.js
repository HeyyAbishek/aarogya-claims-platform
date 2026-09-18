const express = require('express');
const router = express.Router();
const { patientLogin, patientLogout, createClaim, showClaimStatus } = require('../controllers/patients.controllers.js');
const authenticateUser = require('../middlewares/authentication.js');
const upload = require('../middlewares/upload.js'); // Import the Cloudinary upload middleware we just created

// Removed patientRegister since registration is bypassed via seeding (S-1)
router.post('/login', patientLogin);
router.post('/logout', authenticateUser, patientLogout);

// Use upload.single('document') to send the file straight to Cloudinary
router.post('/claim', authenticateUser, upload.single('document'), createClaim);

router.get('/claimStatus', authenticateUser, showClaimStatus);

module.exports = router;