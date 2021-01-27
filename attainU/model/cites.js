var mongoose = require("mongoose");
var Schema = mongoose.Schema,  ObjectId = Schema.ObjectId;;

var SomeModelSchema = new Schema({
id: {
     type: String
},
name: { type: String},
state: { type: String}, 


});

// Compile model from schema
var citiesTable = mongoose.model('cities_tbl', SomeModelSchema );
module.exports = citiesTable;