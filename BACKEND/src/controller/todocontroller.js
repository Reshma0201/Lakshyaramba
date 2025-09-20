import Todo from "../models/todomodel.js";

//  Create a new todo
export const createTodo = async (req, res) => {
  try {
    const { title, category } = req.body;

    // userId comes from auth middleware (decoded JWT)
    const todo = new Todo({
      title,
      category,
      user: req.user.id, //  link todo to the logged-in user
    });

    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Error creating todo", error });
  }
};

//  Get all todos for logged-in user
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Error fetching todos", error });
  }
};

//  Update a todo (only if belongs to user)
export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    const todo = await Todo.findOneAndUpdate(
      { _id: id, user: req.user.id }, // check todo belongs to user
      { title, completed },
      { new: true }
    );

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: "Error updating todo", error });
  }
};

// Delete a todo (only if belongs to user)
export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findOneAndDelete({ _id: id, user: req.user.id });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting todo", error });
  }
};
 