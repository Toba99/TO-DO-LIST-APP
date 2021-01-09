import {useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import TodoModal from '../TodoModal/TodoModal';

function NewTodo({onClickSave}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <Container>
      <Row>
        <Col>
          <Button variant="primary" onClick={() => setShowModal(true)}>Add to-do item.</Button>
        </Col>
      </Row>

      <TodoModal 
        show={showModal}
        todo={{}}
        onClickSave={onClickSave}
        onClose={() => setShowModal(false)}
      />
    </Container>
  );
}

export default NewTodo;
