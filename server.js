const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Ruta de ejemplo
app.get('/api', (req, res) => {
  res.send({ message: 'Hello from API!' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
