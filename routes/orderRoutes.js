// routes/orderRouter.js
import express from 'express';
import orderModel from "../models/orderModel.js";

const orderRouter = express.Router();

orderRouter.post("/new", async (req, res) => {
    try {
        const { email, orderValue, items } = req.body;

        if (!email || orderValue === undefined || !Array.isArray(items)) {
            return res.status(400).json({ error: "Email, orderValue, and items are required" });
        }

        const result = await orderModel.create({ email, orderValue, items });

        return res.status(201).json(result);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default orderRouter;
