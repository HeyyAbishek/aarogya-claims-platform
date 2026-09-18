const patients = require("../models/patients.models.js");
const claims = require("../models/claims.models.js");
const generateToken = require("../services/generateToken.js");
const loginValidation = require("../validations/login.validation.js");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const patientLogin = async (req, res) => {
      try {
            const validatedData = loginValidation.safeParse(req.body);
            if (validatedData.error) {
                  return res.status(400).json(validatedData.error);
            }
            const patient = await patients.findOne({
                  email: validatedData.data.email,
            });
            if (!patient) {
                  return res.status(400).json({
                        message: "Patient not found",
                  });
            }

            const isMatch = await bcrypt.compare(
                  validatedData.data.password,
                  patient.password
            );
            if (!isMatch) {
                  return res.status(400).json({
                        message: "Invalid credentials",
                  });
            }
            const token = generateToken(validatedData.data.email);
            res.status(200).json({
                  message: "Patient logged in successfully",
                  token: token,
            });
      } catch (err) {
            res.status(500).json({
                  message: err.message,
            });
      }
};

const patientLogout = async (req, res) => {
      // Stateless logout: the frontend handles this by clearing the JWT from localStorage
      return res.status(200).json({
            message: "Logged out successfully",
      });
};

const createClaim = async (req, res) => {
      try {
        const token = req.header("Authorization").split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const patient = await patients.findOne({ email: decoded.email });
        
        if (!patient) {
          return res.status(404).json({ message: "Patient not found" });
        }

        const { name, email, claimAmount, description } = req.body;
        
        // Ensure a file was uploaded through Cloudinary / Multer
        if (!req.file) {
          return res.status(400).json({ message: "No supporting document uploaded" });
        }

        const claim = new claims({
          patientId: patient._id,
          name,
          email,
          claimAmount: Number(claimAmount),
          description,
          document: req.file.path, // Automatically stores the secure Cloudinary URL
          status: "Pending"
        });

        await claim.save();

        res.status(201).json({
          message: "Claim created successfully",
          claim,
        });
      } catch (err) {
        res.status(500).json({
          message: err.message,
        });
      }
};

const showClaimStatus = async (req, res) => {
      try {
            const token = req.header("Authorization").split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const patient = await patients.findOne({ email: decoded.email });
            
            // Fetch claims matching this patient and sort by newest first
            const patientClaims = await claims.find({ patientId: patient._id }).sort({ submissionDate: -1 });
            
            res.status(200).json({
                  message: "Claims retrieved successfully",
                  claims: patientClaims
            });
      } catch (err) {      
            res.status(500).json({
                  message: err.message
            });
      }
};

module.exports = {
      patientLogin,
      patientLogout,
      createClaim,
      showClaimStatus
};