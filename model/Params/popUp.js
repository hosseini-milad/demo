const mongoose = require("mongoose");

const popupSchema = new mongoose.Schema({
  title: { type: String},
  message: { type: String},
  date: { type: Date,default: Date.now()}
});

module.exports = mongoose.model("popup", popupSchema);