import { useState, useEffect } from 'react';
import './App.css';
import NewTodo from '../NewTodo/NewTodo';
import CalendarView from '../CalendarView/CalendarView';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import TodoListView from '../TodoListView';
import { getTodos, saveTodo, deleteTodo, updateTodo } from '../../service/todos';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  async function addTodo(todo) {
    const newTodo = {
      ...todo,
      status: "Created",
      dateCreated: new Date()
    };

    const savedTodo = await saveTodo(newTodo);
    const newTodos = [savedTodo, ...todos];
    setTodos(newTodos);
  }

  async function removeTodo(id) {
    const deletedTodoId = await deleteTodo(id);
    const newTodos = todos.filter(todo => todo._id !== deletedTodoId);
    setTodos(newTodos);
  }

  async function onEdit(id, updatedValue) {
    const updatedTodo = await updateTodo(id, updatedValue);
    const newTodos = todos.map(todo => {
      if (todo._id === id) return updatedTodo;
      else return todo;
    });
    setTodos(newTodos);
  }

  const [todoView, setTodoView] = useState('list-view');

  return (
    <Container>
      <Row>
        <Col><h2>To-Do List App</h2></Col>
      </Row>

      <NewTodo onClickSave={addTodo}/>

      {todos.length ? 
        <Tabs
          id="view-tab"
          activeKey={todoView}
          onSelect={(k) => setTodoView(k)}
          style={{marginTop: 24}}
          mountOnEnter={true}
        >
          <Tab eventKey="list-view" title="List View">
            <TodoListView 
              todos={todos} 
              onClickDelete={removeTodo}
              onEdit={onEdit}
            />
          </Tab>

          <Tab eventKey="calendar-view" title="Calendar View">
            <CalendarView 
              todos={todos}
              onClickDelete={removeTodo}
              onEdit={onEdit}
            />
          </Tab>
        </Tabs>
      : 
        <p>No To-Dos. Kindly add a new ToDo using the button above.</p>
      }
      
    </Container>
  );
}

export default App;
