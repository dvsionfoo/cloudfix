import React from "react";
import { Badge } from "react-bootstrap";

import { RecommendationActions } from './RecommendationActions';
import { FormatNumber } from "./../helpers";

export const CompletedRecommendations = ({ recommendations, onActionClick }) => {

  const handleOnAction = (recommendationId, actionType = 'now') => {
    onActionClick([recommendationId], actionType);
  };

  return (
    <>

      {
        (!recommendations || recommendations.length === 0) ? (
          <p>No fixes! Go to new recommendations tab to get started.</p>
        ) : (
            <div className="table-responsive">
              <table
                className="table table-head-custom table-vertical-center"
                id="kt_advance_table_widget_1"
              >
                <thead>
                  <tr className="text-left">
                    <th>RECOMMENDATION</th>
                    <th>RESOURCE ID</th>
                    <th>ACCOUNT</th>
                    <th>REGION</th>
                    <th>SAVINGS</th>
                    <th>STATUS</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {recommendations.map((recommendation, index) => (
                    <tr key={index}>
                      <td>{recommendation.opportunityDescription}</td>
                      <td>{recommendation.resourceId}</td>
                      <td>{recommendation.accountId}</td>
                      <td>{recommendation.region}</td>
                      <td>${FormatNumber(recommendation.annualSavings)}</td>
                      <td><Badge pill variant="primary">{recommendation.status}</Badge></td>
                      <td> <div style={{ width: "120px" }}>
                        <RecommendationActions
                          recommendationId={recommendation.id}
                          onAction={handleOnAction}
                          recommendationType="Completed"
                          lastExecutionDate={recommendation.scheduledAt}
                        />
                      </div>
                      </td>
                    </tr>
                  ))}

                </tbody>
              </table>
            </div >
          )
      }
    </>
  );
};
