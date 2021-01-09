import axios from 'axios';

export async function getTodos() {
  const response = await axios.get('/todos');
  return response.data;
}

export async function saveTodo(newTodo) {
  const response = await axios.post('/todos', newTodo);
  return response.data;
}

export async function deleteTodo(todoId) {
  const response = await axios.delete('/todos/' + todoId);
  return response.data.deleted;
}

export async function updateTodo(todoId, updatedTodo) {
  const response = await axios.put('/todos/' + todoId, updatedTodo);
  return response.data;
}
