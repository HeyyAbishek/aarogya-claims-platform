const insurers = require("../models/insurer.models");
const bcrypt = require("bcryptjs"); 
const loginValidation = require("../validations/login.validation.js");
const generateToken = require("../services/generateToken.js");
const claims = require("../models/claims.models");

const insurerLogin = async (req, res) => {
      try {
            const validatedData = loginValidation.safeParse(req.body);
            if (validatedData.error) {
                  return res.status(400).json(validatedData.error);
            }
            const insurer = await insurers.findOne({
                  email: validatedData.data.email,
            });
            if (!insurer) {
                  return res.status(403).json({
                        message: "Insurer not found",
                  });
            }

            const isMatch = await bcrypt.compare(
                  validatedData.data.password,
                  insurer.password
            );
            if (!isMatch) {
                  return res.status(400).json({
                        message: "Invalid credentials",
                  });
            }
            const token = generateToken(validatedData.data.email);
            res.status(200).json({
                  message: "Insurer logged in successfully",
                  token: token,
            });
      } catch (err) {
            res.status(500).json({
                  message: err.message,
            });
      }
};

const insurerLogout = async (req, res) => {
      // Stateless logout for cloud deployment compatibility
      return res.status(200).json({
            message: "Logged out successfully",
      });
};

const showClaims = async (req, res) => {
      try {
            // Implements Requirement I-1: Filtering by Status, Date, and Amount
            const { status, date, minAmount, maxAmount } = req.query;
            let query = {};

            if (status) query.status = status;
            
            if (date) {
                  const startDate = new Date(date);
                  const endDate = new Date(date);
                  endDate.setDate(endDate.getDate() + 1);
                  query.submissionDate = { $gte: startDate, $lt: endDate };
            }

            if (minAmount || maxAmount) {
                  query.claimAmount = {};
                  if (minAmount) query.claimAmount.$gte = Number(minAmount);
                  if (maxAmount) query.claimAmount.$lte = Number(maxAmount);
            }

            const allClaims = await claims.find(query).sort({ submissionDate: -1 });
            res.status(200).json({
                  message: "All claims retrieved successfully",
                  claims: allClaims,
            });
      } catch (err) {
            res.status(500).json({
                  message: err.message,
            });
      }
};

const editClaims = async (req, res) => {
      try {
        const { status, approvedAmount, insurerComments } = req.body;
    
        const updatedClaim = await claims.findByIdAndUpdate(
          req.params.id,
          {
            $set: {
              status: status,
              // Convert approvedAmount to a Number if it's provided, otherwise keep as null
              approvedAmount: approvedAmount !== "" && approvedAmount != null ? Number(approvedAmount) : null,
              insurerComments: insurerComments || "",
            },
          },
          { new: true, runValidators: true }
        );
    
        if (!updatedClaim) {
          return res.status(404).json({
            message: "Claim not found",
          });
        }
    
        res.status(200).json({
          message: "Claim updated successfully",
          claim: updatedClaim,
        });
      } catch (err) {
        res.status(500).json({
          message: err.message,
        });
      }
};

const getClaimById = async (req, res) => {
      try {
        const claim = await claims.findById(req.params.id);
        if (!claim) {
          return res.status(404).json({ message: 'Claim not found' });
        }
        res.status(200).json(claim);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
};

module.exports = {
      insurerLogin,
      insurerLogout,
      showClaims,
      editClaims,
      getClaimById
};