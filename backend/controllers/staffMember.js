// controllers/staffMemberController.js
const StaffMember = require('../models/StaffMember');
const bcrypt = require('bcryptjs');

const staffMemberController = {
  resetPassword: async (req, res) => {
    try {
      const staffMemberId = req.user.id; // Assuming you have user authentication and the staff member's ID is stored in the session
      const { currentPassword, newPassword } = req.body;

      // Additional logic to check if the staff member has the right to reset the password

      const staffMember = await StaffMember.findById(staffMemberId);

      if (!staffMember) {
        return res.status(404).json({ error: 'Staff member not found' });
      }

      // Check if the current password provided matches the stored password
      const isPasswordMatch = await bcrypt.compare(currentPassword, staffMember.password);

      if (!isPasswordMatch) {
        return res.status(401).json({ error: 'Current password is incorrect' });
      }

      // Hash and update the password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      staffMember.password = hashedPassword;

      // Save the updated staff member record
      await staffMember.save();

      res.json({ message: 'Password reset successful' });
    } catch (error) {
      console.error('Error resetting password:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = staffMemberController;
