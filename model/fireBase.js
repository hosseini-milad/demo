const mongoose = require("mongoose");

const FireBaseSchema = new mongoose.Schema({
  userID: { type: String},
  fireBase: { type: String},
  date:{type:Date},
});

module.exports = mongoose.model("firebase", FireBaseSchema);