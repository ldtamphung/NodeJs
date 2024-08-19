const express = require('express');
const { getHomePage } = require('../controller/homeController');
const router = express.Router();
const authController = require('../controller/authController');
router.get('/hello', getHomePage);
// Đăng ký người dùng
router.post('/register', authController.register);

// Đăng nhập người dùng
router.post('/login', authController.login);


module.exports = router;