import React from 'react';
import {Modal,Button} from 'react-bootstrap'
// import { Container } from './styles';

function MyModal(props) {
    return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            {props.title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          {props.insideTitle && <h4>{props.insideTitle}</h4>}
           {props.content && <p>
             {props.content}
            </p>}
            {props.children}
          </Modal.Body>
          <Modal.Footer>

            <Button onClick={props.onHide}>Cerrar</Button>
          </Modal.Footer>
        </Modal>
      );
    }

export default MyModal;