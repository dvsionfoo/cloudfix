import React from "react";
import { Modal, Button } from "react-bootstrap";
import LinkAccount from './../pages/LinkAccount';

export function AddUser(props) {
  const {onHide} = props;
      return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <LinkAccount />
          <p className="addAccountsClose"><Button onClick={onHide} variant="outline-primary">Close</Button></p>
        </Modal>
      );
  }