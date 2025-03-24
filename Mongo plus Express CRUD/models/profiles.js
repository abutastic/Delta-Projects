const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  bio: {
    type: String,
    default: "I am leaf app user",
    maxLength: 50,
  },
  pin: {
    type: Number,
    min: 10000,
    max: 99999,
    required: true,
  },
});

const Profile = mongoose.model("profile", profileSchema);

module.exports = Profile;
