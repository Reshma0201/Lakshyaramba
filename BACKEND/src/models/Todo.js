import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  deadline: { type: Date }, // optional for later
});

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
