const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  // This route will cause a memory leak if a large request body is sent
  let largeData = '';
  req.on('data', chunk => {
    largeData += chunk;
  });
  req.on('end', () => {
    res.send('OK');
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});