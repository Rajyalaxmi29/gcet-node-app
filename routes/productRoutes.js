import express from 'express';
import Product from '../models/productModel.js';

const productRouter = express.Router();

// GET /products/all
productRouter.get("/all", async (req, res) => {
  try {
    const products = await Product.find(); // This will fetch all the products
    res.json(products); // Send them as a JSON response
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
});

export default productRouter;
