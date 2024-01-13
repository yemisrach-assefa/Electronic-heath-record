// controllers/adminController.js
const { v4: uuidv4 } = require('uuid');
const StaffMember = require('../models/StaffMember');

// Function to generate a unique ID for staff members
const generateUniqueStaffId = () => {
  const uuid = uuidv4();
  return `STAFF-${uuid}`;
};

// Dummy admin credentials (replace these with your actual admin credentials)
const adminCredentials = {
  username: 'admin',
  password: 'admin123',
};

// Controller for Admin operations
const adminController = {
  // Function to register a new staff member
  registerStaffMember: async (req, res) => {
    const { firstName, lastName, role, idNumber, username, password } = req.body;

    // Validate admin credentials
    if (username !== adminCredentials.username || password !== adminCredentials.password) {
      return res.status(401).json({ error: 'Unauthorized: Invalid admin credentials' });
    }

    // Validate input data
    if (!firstName || !lastName || !role) {
      return res.status(400).json({ error: 'Invalid input data' });
    }

    try {
      // Check if the staff member already exists based on certain criteria (e.g., ID number)
      const existingStaffMember = await StaffMember.findOne({ idNumber });

      if (existingStaffMember) {
        // Staff member already exists, return a response indicating that the staff member has been registered
        return res.json({
          message: 'Staff member already registered',
          staffId: existingStaffMember.staffId,
          firstName: existingStaffMember.firstName,
          lastName: existingStaffMember.lastName,
        });
      }

      // Generate a unique staff ID
      const staffId = generateUniqueStaffId();

      // Create a new staff member record
      const newStaffMember = new StaffMember({
        staffId,
        firstName,
        lastName,
        role,
        idNumber,
      });

      // Save the staff member record to the database
      await newStaffMember.save();

      // Return a success response
      res.json({ message: 'Staff member registered successfully', staffId, firstName, lastName });
    } catch (error) {
      console.error('Error registering staff member:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Function to add a new staff member (placeholder implementation)
  addStaffMember: (req, res) => {
    // Placeholder implementation to add a new staff member
    res.json({ message: 'Functionality to add a new staff member will be implemented.' });
  },

  // Function to view staff information (placeholder implementation)
  viewStaffInformation: (req, res) => {
    // Placeholder implementation to view staff information
    res.json({ message: 'Functionality to view staff information will be implemented.' });
  },
};

module.exports = adminController;
