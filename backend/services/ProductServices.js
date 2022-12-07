const e = require("express");
const ProductModelSchema = require("../models/ProductsSchema");
 
exports.createProduct = async (creds) => {
  return await ProductModelSchema.create(creds);
};

exports.deleteAllProducts = async() => {
    return await ProductModelSchema.deleteMany();
}

exports.getAllProducts = async() => {
  return await ProductModelSchema.find();
}