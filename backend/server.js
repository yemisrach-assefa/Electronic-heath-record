const express = require('express');
const app = express();
const cors = require("cors");
const errorhandler = require('./error-handler')
const helmet = require('helmet');
const dbConnection = require("./db")
const PORT = process.env.PORT|| 3000
const patientRoutes = require('./routes/patientsroute');
const frontDeskRoutes = require('./routes/frontDeskRoutes');
const adminRoutes = require('./routes/adminRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const labRoutes = require('./routes/labRoutes');
const staffMember = require('./routes/staffMember')



//connection to database
app.use(cors());
app.use(errorhandler);
app.use(errorhandler);
app.use('/api/v1/patients', patientRoutes);
app.use('/api/v1/registerNewPatient', frontDeskRoutes);
app.use('/api/v1/staff', adminRoutes);
app.use('/api/v1/doctor', doctorRoutes);
app.use('/api/v1/lab', labRoutes);
app.use('/api/v1/reset-password', staffMember);
app.use(helmet());




//connection to mongodb
dbConnection(); 
app.listen(PORT, () => { 
    console.log(`Server is running on port ${PORT}`); 
  });