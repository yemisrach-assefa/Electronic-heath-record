// controllers/doctorController.js
const Doctor = require('../models/doctor');

const doctorController = {
  viewPatientInformation: async (req, res) => {
    try {
      // Fetch the doctor and patient information from the database
      const doctorId = req.user.id; // Assuming you have user authentication and the doctor's ID is stored in the session
      const patientId = req.params.patientId;

      // Additional logic to check if the doctor has access to this patient's information
      // Dummy logic: Check if the doctor is assigned to this patient or if they have a specific role allowing access

      const patientInformation = await Doctor.findById(doctorId).select('patients').populate('patients');

      if (!patientInformation) {
        return res.status(404).json({ error: 'Patient not found' });
      }

      const patientData = patientInformation.patients.find(patient => patient._id == patientId);

      if (!patientData) {
        return res.status(403).json({ error: 'Doctor does not have access to this patient\'s information' });
      }

      res.json(patientData);
    } catch (error) {
      console.error('Error viewing patient information:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  updatePatientRecord: async (req, res) => {
    try {
      // Fetch the doctor and patient information from the database
      const doctorId = req.user.id; // Assuming you have user authentication and the doctor's ID is stored in the session
      const patientId = req.params.patientId;

      // Additional logic to check if the doctor has permission to update this patient's record
      // Dummy logic: Check if the doctor is assigned to this patient or if they have a specific role allowing access

      const patientInformation = await Doctor.findById(doctorId).select('patients');

      if (!patientInformation) {
        return res.status(404).json({ error: 'Patient not found' });
      }

      const patientData = patientInformation.patients.find(patient => patient._id == patientId);

      if (!patientData) {
        return res.status(403).json({ error: 'Doctor does not have access to this patient\'s information' });
      }

      // Dummy update logic
      // For simplicity, assume you are updating a field named 'patientRecord' in the Doctor model
      const updatedRecord = await Doctor.updateOne(
        { _id: doctorId, 'patients._id': patientId },
        { $set: { 'patients.$.patientRecord': req.body.patientRecord } }
      );

      res.json(updatedRecord);
    } catch (error) {
      console.error('Error patient record:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = doctorController;
