const express = require('express')
//const configViewEngine = require('./src/config/viewEngine');
const app = express()
require('dotenv').config()
const port = process.env.PORT || 8082

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

