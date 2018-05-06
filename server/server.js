const express = require('express');
const mongoose = require('mongoose');
const app = express();
const stocks = require('./routes/stocks');
const { cronJob, getQuotes } = require('./utils/alpha-vantage-poller');

require('dotenv').config();

app.get('/', (req, res) => res.send('ping!'));

app.use('/stocks', stocks);

// cronJob();

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('Connected to mongo!');
  getQuotes();
});
app.listen(3000, () => console.log('listening on port 3000'));