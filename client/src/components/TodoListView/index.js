import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TodoItem from '../TodoItem';
import './index.css';

export default function TodoListView({todos, onClickDelete, onEdit }) {
  return (
    <Container fluid className="todo-list-view">
      <Row>
        {todos.map(todo => (
          <Col md={6} className="mb-4" key={todo._id}>
            <TodoItem 
              todo={todo}
              onClickDelete={onClickDelete}
              onEdit={onEdit}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
