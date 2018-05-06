const mongoose = require('mongoose');

const configSchema = new mongoose.Schema({
  stockSaveDone: {
    type: Boolean
  }
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Config = mongoose.model('Config', configSchema);

module.exports = Config;