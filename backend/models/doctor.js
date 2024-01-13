const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  specialty: { type: String, required: true },
  // Add more fields as needed
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;