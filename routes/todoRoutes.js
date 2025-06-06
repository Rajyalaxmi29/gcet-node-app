import express from 'express';
import todoModel from '../models/todoModel.js';

const todoRouter = express.Router();

// GET /todo/todo — fetch all todos
todoRouter.get("/todo", async (req, res) => {
  try {
    const todos = await todoModel.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Error fetching todos", error });
  }
});

// POST /todo/todo — add new todo
todoRouter.post("/todo", async (req, res) => {
  try {
    const { task } = req.body;
    if (!task) {
      return res.status(400).json({ message: "Task is required" });
    }
    const newTodo = await todoModel.create({ task });
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: "Error creating todo", error });
  }
});

export default todoRouter;
