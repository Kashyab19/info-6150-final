const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const multer  = require('multer')
const productsSchema = new Schema({
    productOwner: String,
    productName : String,
    productPrice: String,
    location:{
        address1: String,
        address2: String,
        city: String,
        state: String,
        zipcode: String
    },
    details:{
        productCondition: String,
        productMaterial: String,
        colour: String,
        firstPhoto: String
    }
});
 
module.exports = mongoose.model("Products", productsSchema);