// src/controllers/authController.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Đăng ký người dùng
const register = async (req, res) => {
    const { email, password, name, city } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = `INSERT INTO Users (email, password, name, city) VALUES (?, ?, ?, ?)`;
        db.query(query, [email, hashedPassword, name, city], (err) => {
            if (err) return res.status(500).send('Lỗi khi đăng ký.');
            res.status(201).send('Đăng ký thành công.');
        });
    } catch (error) {
        res.status(500).send('Có lỗi xảy ra.');
    }
};

// Đăng nhập người dùng
const login = (req, res) => {
    const { email, password } = req.body;
    const query = `SELECT * FROM Users WHERE email = ?`;
    db.query(query, [email], async (err, results) => {
        if (err) return res.status(500).send('Lỗi server.');
        if (results.length === 0) return res.status(400).send('Email không tồn tại.');
        const user = results[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).send('Sai mật khẩu.');
        const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    });
};

module.exports = {
    register,
    login
};
