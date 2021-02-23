import React from "react";
import { Modal, Button } from "react-bootstrap";

export function DeleteAccount(props) {
  const {onHide} = props;
      return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
            <Modal.Body>
                <h3>Disconnect AWS Account from CloudFix</h3>
                <p style={{margin:'10px 0px 10px 0px'}}>Instructions to disconnect your AWS Account from CloudFix</p>
                <p>1. Log in to your AWS account that you’d like to disconnect.</p>
                <p>2. Navigate to AWS CloudFormation at <a rel="noopener noreferrer" href="https://console.aws.amazon.com/cloudformation" target="_blank">https://console.aws.amazon.com/cloudformation</a></p>
                <p>3. On the stacks page in the CloudFormation console, select the stack that you used with CloudFix.</p>
                <p>4. In the stack details pane, choose Delete.</p>
                <p>5. Select Delete stack when prompted.</p>
                <p>6. Once the stack is deleted on CloudFormation, CloudFix will no longer connect to your AWS account.</p>
            </Modal.Body>
          <p className="addAccountsClose"><Button onClick={onHide} variant="outline-primary">Close</Button></p>
        </Modal>
      );
  }