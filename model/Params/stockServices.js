const mongoose = require("mongoose");

const stockServiceSchema = new mongoose.Schema({
  title: { type: String},
  category: { type: String},
  brand: { type: String},
  colorPrice: { type: String},
  description: { type: String},
  hesabfa:{ type: String},
  imageUrl:{ type: String}
});

module.exports = mongoose.model("stockservice", stockServiceSchema);