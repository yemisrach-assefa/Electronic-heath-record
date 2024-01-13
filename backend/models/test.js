const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  orderedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor', // You would have a Doctor model as well
    required: true,
  },
  tests: [
    {
      name: {
        type: String,
        required: true,
      },
      result: {
        type: String,
      },
    },
  ],
  status: {
    type: String,
    enum: ['Pending', 'Completed'],
    default: 'Pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Test', testSchema);
