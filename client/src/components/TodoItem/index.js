import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TodoModal from '../TodoModal/TodoModal';
import { getPriorityColor } from '../../util'

function formatDate(dateString) {
  return new Date(dateString).toLocaleString();
}

function todoIsCompleted(status) {
  return status === "Completed";
}

export default function TodoItem({ todo, onClickDelete, onEdit }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <Card>
      <Card.Body>
        <Card.Title>{todo.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Due Date: {formatDate(todo.dueDate)}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          Priority: 
          <span 
            style={{color: getPriorityColor(todo.priority)}}
          >
            {todo.priority}
          </span>
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">Status: {todo.status}</Card.Subtitle>
        <Card.Text>{todo.description}</Card.Text>
        <Row>
          <Col md={6}>
            {todoIsCompleted(todo.status) ? 
              null : 
              <Button
                variant="success"
                onClick={() => onEdit(todo._id, { status: "Completed" })}
              >
                Complete
              </Button>
            }
            </Col>
          <Col md={{offset: 1, span:2}}><Button variant="secondary" onClick={() => setShowModal(true)}>Edit</Button></Col>
          <Col md={2}><Button variant="danger" onClick={() => onClickDelete(todo._id)}>Delete</Button></Col>
        </Row>
      </Card.Body>

      <TodoModal 
        show={showModal}
        todo={todo}
        key={todo._id}
        onClickSave={updatedValues => onEdit(todo._id, updatedValues)}
        onClose={() => setShowModal(false)}
      />
    </Card>
  );
}
