const express = require('express');
const { connectToDb, fetchTodos, insertTodo, updateTodo, deleteTodo } = require('./db');

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

const PORT = 5000;

server.get('/todos', async (req, res) => {
  const allTodos = await fetchTodos();
  res.json(allTodos);
});

server.post('/todos', async (req, res) => {
  const newTodo = req.body;
  const createdTodo = await insertTodo(newTodo);
  res.json(createdTodo);
});

server.put('/todos/:id', async (req, res) => {
  const todoId = req.params.id;
  const updatedTodo = await updateTodo(todoId, req.body);
  res.json(updatedTodo);
});

server.delete('/todos/:id', async (req, res) => {
  const todoId = req.params.id;
  await deleteTodo(todoId);
  res.json({ deleted: todoId });
});

server.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
});

connectToDb();
