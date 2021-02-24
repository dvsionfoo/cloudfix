import React, {useState} from "react";
import {Badge} from "react-bootstrap";

import {RecommendationActions} from './RecommendationActions';
import {FormatNumber} from "./../helpers";
import {filterRecommendationData, sortColumnData} from './../helpers/SortingAndFilterHelpers'

export const CompletedRecommendations = ({recommendations, onActionClick}) => {

    const [tableData, setTableData] = useState(recommendations);

    const handleOnAction = (recommendationId, actionType = 'now') => {
        onActionClick([recommendationId], actionType);
    };

    const sortColumn = (sortColumn, sortType) => {
        setTableData(sortColumnData(sortColumn, sortType, tableData));
    };

    const filterColumn = (event, filterOn) => {
        setTableData(filterRecommendationData(filterOn, event, recommendations));
    };

    return (
        <>

            {
                (!tableData || tableData.length === 0) ? (
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
                                <th>{<>
                                    <div className="sortArrowContainer">RESOURCE ID
                                        <div className="sortArrows">
                                            <img src={"/media/up-arrow.svg"}
                                                 onClick={() => sortColumn('resourceId', 'asc')} alt="icon"/>
                                            <img src={"/media/down-arrow.svg"}
                                                 onClick={() => sortColumn('resourceId', 'desc')}
                                                 alt="icon"/>
                                        </div>
                                    </div>
                                    <input onChange={(event) => filterColumn(event, 'resourceId')}
                                           placeholder="Search Resource Id"/></>}</th>
                                <th>{
                                    <>
                                        <div className="sortArrowContainer">ACCOUNT
                                            <div className="sortArrows">
                                                <img src={"/media/up-arrow.svg"}
                                                     onClick={() => sortColumn('accountId', 'asc')}
                                                     alt="icon"/>
                                                <img src={"/media/down-arrow.svg"}
                                                     onClick={() => sortColumn('accountId', 'desc')}
                                                     alt="icon"/>
                                            </div>
                                        </div>
                                        <input onChange={(event) => filterColumn(event, 'accountId')}
                                               placeholder="Search Account"/></>
                                }</th>
                                <th>{
                                    <>
                                        <div className="sortArrowContainer">REGION
                                            <div className="sortArrows">
                                                <img src={"/media/up-arrow.svg"}
                                                     onClick={() => sortColumn('region', 'asc')}
                                                     alt="icon"/>
                                                <img src={"/media/down-arrow.svg"}
                                                     onClick={() => sortColumn('region', 'desc')}
                                                     alt="icon"/>
                                            </div>
                                        </div>
                                        <input onChange={(event) => filterColumn(event, 'region')}
                                               placeholder="Search Region"/></>
                                }</th>
                                <th>SAVINGS</th>
                                <th>STATUS</th>
                                <th>ACTIONS</th>
                            </tr>
                            </thead>
                            <tbody>
                            {tableData.map((recommendation, index) => (
                                <tr key={index}>
                                    <td>{recommendation.opportunityDescription}</td>
                                    <td>{recommendation.resourceId}</td>
                                    <td>{recommendation.accountId}</td>
                                    <td>{recommendation.region}</td>
                                    <td>${FormatNumber(recommendation.annualSavings)}</td>
                                    <td><Badge pill variant="primary">{recommendation.status}</Badge></td>
                                    <td>
                                        <div style={{width: "120px"}}>
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
                    </div>
                )
            }
        </>
    );
};
