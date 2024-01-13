const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  // Personal Information
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
  },

  // Contact Information
  contact: {
    phoneNumber: {
      type: String,
    },
    address: {
      city: {
        type: String,
      },
      state: {
        type: String,
      },
    },
  },

  // Medical Information
  bloodType: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  allergies: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model('Patient', patientSchema);