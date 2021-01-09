import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import DateTimePicker from 'react-datetime-picker';

export default function TodoModal({ show, todo, onClickSave, onClose }) {

  const [name, setName] = useState(todo.name || null);
  const [description, setDescription] = useState(todo.description || null);
  const [dueDate, setDueDate] = useState(todo.dueDate ? new Date(todo.dueDate) : new Date());
  const [priority, setPriority] = useState(todo.priority || null);
  const [status, setStatus] = useState(todo.status || null);

  useEffect(() => setStatus(todo.status), [todo.status]);

  const [errorMessage, setErrorMessage] = useState(null);

  return (
    <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>{todo.name ? "Edit " + todo.name : "Create To-Do Item"}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
        <Form>
          <Form.Group controlId="todoName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter To-Do title." defaultValue={name} onChange={(event) => setName(event.target.value)}/>
          </Form.Group>

          <Form.Group controlId="todoDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" placeholder="Enter a detailed description." defaultValue={description} onChange={(event) => setDescription(event.target.value)}/>
            <Form.Text className="text-muted">
              The devil's in the details.
            </Form.Text>
          </Form.Group>

          <Form.Label>Due Date</Form.Label>
          <div>
            <DateTimePicker
              required
              onChange={setDueDate}
              value={dueDate}
            />
          </div>

          <Form.Group controlId="priority">
            <Form.Label>Priority</Form.Label>
            <Form.Control as="select" defaultValue={priority} onChange={(event) => setPriority(event.target.value)}>
              <option disabled>Select a value</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </Form.Control>
            <Form.Text className="text-muted">
              1 is the highest priority. 3 is the lowest prioirity.
            </Form.Text>
          </Form.Group>

          {todo._id ? <Form.Group controlId="status">
            <Form.Label>Status</Form.Label>
            <Form.Control as="select" defaultValue={status} onChange={(event) => setStatus(event.target.value)}>
              <option disabled>Select a value</option>
              <option>Created</option>
              <option>In Progress</option>
              <option>Completed</option>
            </Form.Control>
          </Form.Group> : null}

          {errorMessage ? <Alert variant="danger">
            {errorMessage}
          </Alert> : null}
        </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => {
            if (!name) {
              setErrorMessage("Please enter Name.");
              console.log(dueDate);
              return;
            }

            if (!dueDate) {
              setErrorMessage("Please select a Due Date.");
              return;
            }

            if (!priority) {
              setErrorMessage("Please select Priority.");
              return;
            }
            
            setErrorMessage(null);
            onClickSave({ name, dueDate, priority, description, status });
            onClose();
          }}>
            Save Todo
          </Button>
        </Modal.Footer>
      </Modal>
  );
}
