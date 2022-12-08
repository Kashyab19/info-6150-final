const productService = require("../services/ProductServices");
 
exports.addProduct = async (req, res) => {
    try {
        const product = await productService.createProduct(req.body);
        res.json({ data: product, status: "success" });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
  }

exports.deleteAllProducts = async(req, res) => {
    try{
        await productService.deleteAllProducts();
        res.json({status:"Deleted all the data"})
    }
    catch{
        res.status(500).json({error:err.message});
    }
}

exports.getAllProducts = async (req, res) => {
    try {
      const product = await productService.getAllProducts();
      res.json({ data: product, status: "Get All API" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
