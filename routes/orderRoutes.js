import express from 'express';
import orderModel from "../models/orderModel.js";

const orderRouter = express.Router();

// POST /orders/new
orderRouter.post("/new", async (req, res) => {
  try {
    const { email, orderValue, items } = req.body;

    if (!email || orderValue === undefined) {
      return res.status(400).json({ error: "Email and orderValue are required" });
    }

    const result = await orderModel.create({ email, orderValue, items });
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// ✅ NEW: GET /orders/all?email=xxx
orderRouter.get("/all", async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const orders = await orderModel.find({ email });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default orderRouter;
