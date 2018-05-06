const express = require('express');
const router = express.Router();
const Stock = require('../models/Stock');

router.get('/', async (req, res) => {
  const symbol = new RegExp(req.query.symbol);
  const stocks = await Stock.find({
    symbol: {
      $regex: symbol
    }
  });
  res.send(stocks);
});

module.exports = router;