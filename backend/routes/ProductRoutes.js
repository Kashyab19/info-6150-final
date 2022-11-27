const express = require("express");

const {
  addProduct,
  deleteAllProducts
} = require("../controller/ProductController");
 
const router = express.Router();
 
router.route("/add-product").post(addProduct);

//DELETE
router.route("/delete-all").delete(deleteAllProducts);
 
module.exports = router;