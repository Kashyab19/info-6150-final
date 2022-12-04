const express = require("express");

const {
  addProduct,
  deleteAllProducts,
  getAllProducts
} = require("../controller/ProductController");
 
const router = express.Router();
 
router.route("/add-product").post(addProduct);

//DELETE
router.route("/delete-all").delete(deleteAllProducts);

router.route("/get-all-products").get(getAllProducts);
 
module.exports = router;