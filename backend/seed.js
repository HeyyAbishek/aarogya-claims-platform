const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const Patient = require('./models/patients.models.js');
const Insurer = require('./models/insurer.models.js');

const seedDB = async () => {
  try {
    // Reverted this line back to environment variables for security
    await mongoose.connect(process.env.MONGO_URI || process.env.MONGO_URL);
    console.log('Database connected for seeding...');

    // Clear old mock entries to prevent duplicates
    await Patient.deleteMany({ email: 'patient@demo.com' });
    await Insurer.deleteMany({ email: 'insurer@demo.com' });

    const hashedPassword = await bcrypt.hash('password123', 10);

    // Seed Patient
    await Patient.create({
      userName: 'Demo Patient',
      email: 'patient@demo.com',
      password: hashedPassword,
    });

    // Seed Insurer
    await Insurer.create({
      userName: 'Demo Insurer',
      email: 'insurer@demo.com',
      password: hashedPassword,
    });

    console.log('SUCCESS: Seeded mock Patient and Insurer accounts!');
    console.log('Patient: patient@demo.com / password123');
    console.log('Insurer: insurer@demo.com / password123');
    
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedDB();