const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const catSchema = new Schema({
  name: String,
  food: String,
  owner: {type: Schema.Types.ObjectId, ref: 'User'}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Cat = mongoose.model('Cat', catSchema);
module.exports = Cat;
