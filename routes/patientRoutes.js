const express = require('express');
const router = express.Router();
const { registerPatient, getPatients, loginPatient } = require('../controllers/patientController')

router.post('/register', registerPatient);
router.post('/login', loginPatient);
router.get('/', getPatients);

module.exports = router