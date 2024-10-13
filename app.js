const express = require('express')
const cors = require('cors');
const app = express()
require('dotenv').config()
const port = process.env.PORT || 8082


// Cấu hình CORS
app.use(cors({
  origin: 'http://localhost:3000', // Địa chỉ frontend
  credentials: true // Cho phép cookie nếu cần
}));

const webRouter = require('./src/router/web');
const userRoutes = require('./src/router/userRouter');

// Middleware để phân tích dữ liệu JSON
app.use(express.json());
app.use('/', webRouter);


// Sử dụng router cho các route người dùng
app.use('/api', userRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

