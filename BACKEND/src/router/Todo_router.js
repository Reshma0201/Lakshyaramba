import express from "express";
import { createTodo, getTodos, updateTodo, deleteTodo } from "../controller/todocontroller.js";
import authMiddleware from "../middlewares/auth_middleware.js";

const router = express.Router();

// Protect all todo routes
router.post("/todos", authMiddleware, createTodo);
router.get("/todos", authMiddleware, getTodos);
router.put("/todos/:id", authMiddleware, updateTodo);
router.delete("/todos/:id", authMiddleware, deleteTodo);

export default router;


/*import express from "express";
import Todo from "../models/todomodel.js";

const router = express.Router();

router.post("/todo", async (req, res) => {
  try {
    const { title, deadline } = req.body; // deadline optional
    const todo = await Todo.create({ title, deadline });
    res.status(201).json({ success: true, data: todo });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
router.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json({ success: true, data: todos });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.patch("/todo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const todo = await Todo.findByIdAndUpdate(id, updates, { new: true });
    if (!todo) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, data: todo });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete("/todo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}); */
