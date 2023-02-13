'use strict';

const express = require('express');
const https = require('https');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send('HELLO WORLD FROM NODE');
});

app.get('/laravel', (req, res) => {
  res.send('Hello world from Laravel');
});

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});
