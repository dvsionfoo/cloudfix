import React from "react";
import { Modal, Button } from "react-bootstrap";

export class AddEvent extends React.Component {
    render() {
      return (
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Schedule an event
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Please provide the event details</h4>
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
              ac consectetur ac, vestibulum at eros.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.onHide}>Cancel</Button>
            <Button variant="danger" onClick={this.props.onHide}>Add</Button>
          </Modal.Footer>
        </Modal>
      );
    }
  }