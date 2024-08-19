const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');
const { getUsers } = require('../controller/userController');


// Route để lấy danh sách người dùng
router.get('/users', authenticateToken, getUsers);


module.exports = router;