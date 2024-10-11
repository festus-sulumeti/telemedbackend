const express = require('express');
const app = express();
require('dotenv').config();


app.use(express.json());

const patientRoutes = require('./routes/patientRoutes');


// use the Routes

app.use('/patients', patientRoutes);

//starting the server.
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server inarun kwa hii  PORT ${PORT}`);
});