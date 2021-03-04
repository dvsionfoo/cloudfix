import React from "react";
import { Modal, Button } from "react-bootstrap";

import {RECOMMENDATION_TYPES_URL, RISK_LEVELS} from './../appConfig';
import { toAbsoluteUrl } from "./../helpers";

export function RecommendationInfo(props) {
  const { onHide, recommendation, show } = props;
  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h3>Recommendation Details</h3>
          <p>
            {recommendation && recommendation.opportunityType}&nbsp;-&nbsp;
            {recommendation && recommendation.opportunityDescription}
            <a 
              class="btn btn-outline-secondary"
              style={{marginLeft: '20px'}}
              href={RECOMMENDATION_TYPES_URL[recommendation && recommendation.opportunityType.toLowerCase()]} 
              target="_blank" 
              rel="noopener noreferrer"
              >
                <img 
                alt="Learn more" 
                className="actionLink" 
                style={{marginRight: '10px'}}
                src={toAbsoluteUrl("/media/info.png")}/> 
                Learn More
              </a>
          </p>
          <p>Risk Level - {RISK_LEVELS[recommendation && recommendation.risk]}</p>
        </Modal.Title>

      </Modal.Header>
      <Modal.Body>        
        <p>${recommendation && recommendation.annualSavings} Annual savings on annual cost of ${recommendation && recommendation.annualCost}</p>
        <div className="row">
          <div className="table-responsive">
            <table
              className="table table-head-custom table-vertical-center"
              id="kt_advance_table_widget_1"
            >
              <thead>
                <tr className="text-left">
                  <th style={{ minWidth: "100px" }}>ACCOUNT</th>
                  <th style={{ minWidth: "100px" }}>REGION</th>
                  <th style={{ minWidth: "200px" }}>RESOURCE ID</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{recommendation && recommendation.accountId}</td>
                  <td>{recommendation && recommendation.region}</td>
                  <td>{recommendation && recommendation.resourceId}</td>
                </tr>
              </tbody>
            </table>
            {
              recommendation && recommendation.parameters && (
                <div className="parameters">
                  <h5>Parameters</h5>
                  <hr />
                  <table className="table table-head-custom">
                    <thead>
                      <tr>
                        <td>Parameter</td>
                        <td>Value</td>
                      </tr>
                    </thead>
                    <tbody>

                      {
                        Object.keys(recommendation.parameters).map(key => (
                          <tr>
                            <td>{key}</td>
                            <td>{recommendation.parameters[key]}</td>
                          </tr>
                        ))
                      }
                      
                    </tbody>
                  </table>
                </div>
              )

            }
            
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="justify-content-between">
        <p style={{textAlign: 'center', width: '100%'}}><Button onClick={onHide} variant="outline-primary">Close</Button></p>
      </Modal.Footer>
    </Modal>
  );
}
