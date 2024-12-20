const express = require('express');
const app = express();
const port = 3000;

app.use(express.json({limit: '50mb'})); // Set a reasonable limit to prevent huge requests 
app.post('/', (req, res) => {
  //This demonstrates how to correctly handle incoming request streams
  let data = '';
  req.on('data', chunk => {
    data += chunk.toString();
  });
  req.on('end', () => {
    try {
      const jsonData = JSON.parse(data);
      res.status(200).send('Data received successfully');
    } catch (error) {
      res.status(400).send('Invalid JSON');
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});