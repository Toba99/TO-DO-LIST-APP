const { MongoClient, ObjectId } = require('mongodb');

const DB_URL = "mongodb://localhost:27017";
const DATABASE_NAME = "todos-db";
const COLLECTION = "todolist";

let todoListCollection;

async function connectToDb() {
  const client = await MongoClient.connect(DB_URL);
  console.log('Connected to Database Server');
  
  const db = client.db(DATABASE_NAME);
  todoListCollection = db.collection(COLLECTION);
}

async function insertTodo(todo) {
  await todoListCollection.insertOne(todo);
  return todo;
}

async function fetchTodos() {
  const todos = await todoListCollection.find().toArray();
  return todos;
}

async function updateTodo(todoId, newTodoValues) {
  const result = await todoListCollection.findOneAndUpdate(
    { _id: ObjectId(todoId) },
    { $set: newTodoValues } ,
    { returnOriginal: false }
  );
  return result.value;
}

async function deleteTodo(todoId) {
  const deletedTodo = await todoListCollection.deleteOne({_id: ObjectId(todoId)});
  return deletedTodo;
}

module.exports = { connectToDb, fetchTodos, insertTodo, updateTodo, deleteTodo };
