import React from "react";
import { Alert } from "react-bootstrap";

export function Setup() {
  return (
    <>
    <div className="row">
        <div className="col-md-12">
        <Alert variant="success">
          <Alert.Heading>Connect Your AWS Account</Alert.Heading>
          <p>
          You need to be logged in to your AWS account in this browser
          before you can connect CloudFix. If you are not logged in yet, <Alert.Link href="/login"> log in to your aws account         </Alert.Link> now
          </p>
          
        </Alert>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
        <Alert variant="danger">
          <Alert.Heading>Run CloudFormation Template</Alert.Heading>
          <p>
          You need to run this simple CloudFormation template that creates
an IAM role for CloudFix and grants permissions so that CloudFix
can access your AWS account.
          </p>
          
        </Alert>

        </div>
        <div className="col-md-6">
        <Alert variant="danger">
          
          <p>
          We are waiting for you to complete creating the
CloudFormation stack. As soon as the stack is created,
your AWS account will be linked with CloudFix.
          </p>
          
        </Alert>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
        <Alert variant="dark">
          <p>We are waiting for you to complete creating the
CloudFormation stack. As soon as the stack is created,
your AWS account will be linked with CloudFix.</p>
          
        </Alert>
        </div>
      </div>
    </>

  );
}
