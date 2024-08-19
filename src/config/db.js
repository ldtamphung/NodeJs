const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'nodeJsStudy',
  port: 3307 // Sửa thành cổng của bạn nếu khác
});

connection.connect((err) => {
  if (err) {
    console.error('Lỗi kết nối đến cơ sở dữ liệu:', err.stack);
    return;
  }
  console.log('Kết nối thành công đến MySQL với ID:', connection.threadId);
});

module.exports = connection;
