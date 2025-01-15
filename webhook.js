const express = require('express');
const { exec } = require('child_process');

const app = express();
app.use(express.json());

app.post('/webhook', (req, res) => {
  const { ref } = req.body;
  if (ref === 'refs/heads/main') {
    exec('git pull && npm install && pm2 restart nodeJsApp', (err, stdout, stderr) => {
      if (err) {
        console.error(`Error: ${stderr}`);
        return res.status(500).send(stderr);
      }
      console.log(stdout);
      res.status(200).send('Deployment successful!');
    });
  } else {
    res.status(200).send('No deployment needed.');
  }
});

app.listen(8082, () => console.log('Webhook server running on port 8082'));
