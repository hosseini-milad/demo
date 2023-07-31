const mongoose = require("mongoose");

const sepidarStockSchema = new mongoose.Schema({
  brandName: {type: String},
  lenzIndex: { type: String },
  material: { type: String },
  coating: { type: String },
  title: { type: String , unique: true},

  sku:{ type: String , unique: true},
  hesabfa:{type: String, unique: true},

  sph:{ type: String },
  cyl:{ type: String },
  dia: { type: String },
  add: { type: String },
  align: { type: String },
  design: { type: String },
  lenzType: { type: String },
  store:{type:String},
  price: { type: Number },
  price1: { type: Number },
  price2: { type: Number },
  purchase: { type: Number }
});

module.exports = mongoose.model("sepidarStock", sepidarStockSchema);