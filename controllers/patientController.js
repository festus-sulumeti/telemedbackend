const { addPatient, getAllPatients, findPatientByEmail } = require('../models/patient');
const bcrypt = require('bcrypt'); // Import bcrypt for password comparison

const registerPatient = async (req, res) => {
  try {
    const patient = await addPatient(req.body);
    res.status(201).json({ message: 'Patient registered', patient });
  } catch (err) {
    res.status(500).json({ message: 'Error registering patient', error: err.message });
  }
};

const getPatients = async (req, res) => {
  try {
    const patients = await getAllPatients();
    res.status(200).json(patients);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching patients', error: err.message });
  }
};

const loginPatient = async (req, res) => {
  const { email, password } = req.body;

  try {
    const patient = await findPatientByEmail(email);
    if (!patient) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare the provided password with the stored hashed password
    const match = await bcrypt.compare(password, patient.password_hash);
    if (!match) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful', patient });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
};

module.exports = { registerPatient, getPatients, loginPatient };