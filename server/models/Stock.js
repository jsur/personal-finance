const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  symbol: {
    type: String
  },
  latestOpen: {
    type: String,
  },
  latestClose: {
    type: String,
  },
  latestHigh: {
    type: String,
  },
  latestLow: {
    type: String,
  }
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;