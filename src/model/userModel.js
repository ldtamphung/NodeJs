// src/models/userModel.js

const db = require('../config/db');

const getUserByEmail = (email, callback) => {
    const query = `SELECT * FROM Users WHERE email = ?`;
    db.query(query, [email], callback);
};

module.exports = {
    getUserByEmail
};
