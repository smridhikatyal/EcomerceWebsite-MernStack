const mongoose = require('mongoose');

const registeredUserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {type:String},
});

const registeredUser = mongoose.model('registeredUser', registeredUserSchema,'registeredusers');
module.exports = registeredUser;
