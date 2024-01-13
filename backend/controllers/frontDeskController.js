const frontDeskController = {
  registerNewPatient: async (req, res) => {
    const { firstName, 
      lastName, 
      dateOfBirth,
      gender, 
      contact,
      bloodType, 
      allergies, 
      medications, 
      conditions } = req.body;

    // Validate input data
    if (!firstName || !lastName || !dateOfBirth || !gender || !contact) {
      return res.status(400).json({ error: 'Invalid input data' });
    }

    try {
      const existingPatient = await Patient.findOne({ firstName, lastName, dateOfBirth });

      if (existingPatient) {
        return res.json({
          success: false,
          message: 'Patient already registered',
          patientId: existingPatient.patientId,
          firstName: existingPatient.firstName,
          lastName: existingPatient.lastName,
        });
      }

      const patientId = generateUniquePatientId(firstName, lastName);

      const newPatient = new Patient({
        patientId,
        firstName,
        lastName,
        dateOfBirth,
        gender,
        contact,
        bloodType,
        allergies,
        medications,
        conditions,
      });

      await newPatient.save();

      res.json({
        success: true,
        message: 'Patient registered successfully',
        patientId,
        firstName,
        lastName,
      });
    } catch (error) {
      console.error('Error registering patient:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  },
};

module.exports = frontDeskController;
