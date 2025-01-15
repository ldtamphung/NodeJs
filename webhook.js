const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const crypto = require('crypto');

const app = express();
const PORT = 8082;
const SECRET = '987654321123456789';  // Khóa bí mật bạn đã cấu hình trên GitHub webhook

// Cấu hình body-parser để xử lý JSON request
app.use(bodyParser.json());

// Xử lý webhook
app.post('/webhook', (req, res) => {
  // Kiểm tra header 'X-Hub-Signature' để xác minh yêu cầu đến từ GitHub
  const signature = req.headers['x-hub-signature'];
  const payload = JSON.stringify(req.body);
  const hmac = crypto.createHmac('sha1', SECRET);
  const digest = `sha1=${hmac.update(payload).digest('hex')}`;

  // So sánh signature
  if (signature !== digest) {
    return res.status(403).send('Không hợp lệ - Chữ ký không đúng');
  }

  const { ref } = req.body;  // Lấy nhánh mà sự kiện xảy ra

  console.log(`Nhận được ref: ${ref}`);

  // Kiểm tra xem ref có phải là "refs/heads/main" không
  const branch = ref.split('/').pop();  // Lấy phần cuối của ref
  if (branch === 'main') {
    exec('cd /home/ubuntu/NodeJs && git pull && npm install && pm2 restart nodeJsApp', (err, stdout, stderr) => {
      if (err) {
        console.error(`Lỗi khi thực thi lệnh: ${err.message}`);
        return res.status(500).send('Lỗi khi cập nhật mã nguồn.');
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return res.status(500).send('Lỗi khi cập nhật mã nguồn.');
      }
      console.log(`stdout: ${stdout}`);
      return res.status(200).send('Mã nguồn đã được cập nhật và ứng dụng đã được khởi động lại!');
    });
  } else {
    return res.status(400).send('Nhánh không hợp lệ.');
  }
});

// Lắng nghe cổng 8082
app.listen(PORT, () => {
  console.log(`Server đang lắng nghe trên cổng ${PORT}`);
});
