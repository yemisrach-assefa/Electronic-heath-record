const mongoose = require("mongoose");
require("dotenv").config();

const DB = process.env.MONGO_URL;

async function dbConnection() {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Other options as needed
    });

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }

  // You can listen to events like 'error', 'disconnected', etc.
  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
    // You might want to attempt to reconnect here
  });

 
}

module.exports = dbConnection;
