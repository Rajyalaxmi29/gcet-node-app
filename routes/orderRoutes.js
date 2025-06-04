import express from 'express';
import orderModel from "../models/orderModel.js";

const orderRouter = express.Router();

orderRouter.post("/new", async (req, res) => {
    try {
        const { email, orderValue } = req.body;

        if (!email || orderValue === undefined) {
            return res.status(400).json({ error: "Email and orderValue are required" });
        }

        const result = await orderModel.create({ email, orderValue });

        return res.status(201).json(result);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default orderRouter;
