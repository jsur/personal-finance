const express = require('express');
const app = express();
const { cronJob, getQuotes } = require('./utils/alpha-vantage-poller');

require('dotenv').config();

app.get('/', (req, res) => res.send('ping!'));

cronJob();

app.listen(3000, () => console.log('listening on port 3000'));