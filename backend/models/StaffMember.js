// models/StaffMember.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const staffMemberSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true }, // 'doctor', 'frontdesk', 'labTechnician', or 'staffMember'
  // Add more fields as needed
});

// Hash the password before saving
staffMemberSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

const StaffMember = mongoose.model('StaffMember', staffMemberSchema);

module.exports = StaffMember;
