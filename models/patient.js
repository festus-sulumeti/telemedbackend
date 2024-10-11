const pool = require('../config/db')
const bcrypt = require('bcrypt')


//Addition of a new patient in the system 

const addPatient = async (patientData) => {
    const { first_name, last_name, email, password_hash, phone, date_of_birth, gender, address } = patientData;

    //Setting the password information in the system
    const hashedPassword = await bcrypt.hash(password_hash, 10);


    // kufill data ya patient kwa system
    const query = `INSERT INTO patients (first_name, last_name, email, password_hash, phone, date_of_birth, gender, address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING  *`;

    const values = [first_name, last_name, email, password_hash, phone, date_of_birth, gender, address];

    const result = await pool.query(query, values);

    return result.rows[0];
}

// Getting the patients in the system
const getAllPatients = async () => {
   const result = await pool.query('SELECT * FROM patients');
   return result.rows;
}


//  Kutafuta patient na email yao 
const findPatientByEmail = async (email) => {
    const query = 'SELECT * FROM patients WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0];
}


module.exports = { addPatient, getAllPatients, findPatientByEmail };