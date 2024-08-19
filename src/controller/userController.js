const db = require('../config/db');

// Hàm để lấy danh sách người dùng
const getUsers = (req, res) => {
    const query = 'SELECT id, email, name, city FROM Users'; // Truy vấn cơ sở dữ liệu

    db.query(query, (err, results) => {
        if (err) return res.status(500).send('Lỗi khi lấy danh sách người dùng.');
        res.status(200).json(results); // Trả về danh sách người dùng dưới dạng JSON
    });
};

module.exports = {
    getUsers
};
