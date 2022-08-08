require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const URI = process.env.MONGODB_URI;
const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(URI, {
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch(console.error);

// Models
const Todo = require("./models/todo");

app.get("/todos", async (request, response) => {
  try {
    const todos = await Todo.find();
    return response.json(todos);
  } catch (Error) {
    throw Error;
  }
});

app.post("/todo/new", async (request, response) => {
  try {
    const todo = await new Todo({
      text: request.body.text,
    });

    todo.save();
    return response.json(todo);
  } catch (Error) {
    throw Error;
  }
});

app.delete("/todo/delete/:id", async (request, response) => {
  try {
    const result = await Todo.findByIdAndDelete(request.params.id);
    return response.json(result);
  } catch (Error) {
    throw Error;
  }
});

app.put("/todo/complete/:id", async (request, response) => {
  try {
    const todo = await Todo.findById(request.params.id);
    todo.completed = !todo.completed;
    todo.save();

    return response.json(todo);
  } catch (Error) {
    throw Error;
  }
});

app.listen(process.env.PORT, () => console.log("Server started on port 8000"));
