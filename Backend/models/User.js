const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },
  profilePicture: { type: String }, // Add this field to store the path of the profile picture
});

const User = mongoose.model("User", userSchema);

module.exports = User;
