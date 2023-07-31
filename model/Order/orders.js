const mongoose = require("mongoose");

const OrdersSchema = new mongoose.Schema({
  userId:{type: mongoose.Schema.Types.ObjectId, ref: 'user'},
  stockId: {type: mongoose.Schema.Types.ObjectId, ref: 'stocks'},
  manageId: {type: String},
  //frameShape: { type: String },
  stockOrderNo:{type:String},
  hesabfaFaktor:{type:String},
  stockOrderPrice:{type:String},
  stockFaktor:[{type:Object}],
  stockFaktorOrg:[{type:Object}],

  stockService:[{type:Object}],
  stockServicePrice:{type:String},
  stockGurantee:{type:String},
  stockGuranteeName:{type:String},

  status:{ type: String },
  date:{ type: Date },
});

module.exports = mongoose.model("orders", OrdersSchema);