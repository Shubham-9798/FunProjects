
// Define schema
var mongoose = require("mongoose");
var Schema = mongoose.Schema,  ObjectId = Schema.ObjectId;;

var SomeModelSchema = new Schema({
  phoneNumber:{ type: String},
  address1:{ type: String},
  address2:{ type: String},
  pin:{ type: String},


  updatedDate: { type: Date, default: Date.now },
  createdDate: { type: Date,  required: true}
});

// Compile model from schema
var userAddressTable = mongoose.model('UserAddress_tbl', SomeModelSchema );
module.exports = userAddressTable;