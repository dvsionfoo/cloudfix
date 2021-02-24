import React, {useState} from "react";
import {Button} from "react-bootstrap";

import {FormatNumber, toAbsoluteUrl} from "./../helpers";
import {RecommendationActions} from './RecommendationActions';
import {filterRecommendationData, sortColumnData} from './../helpers/SortingAndFilterHelpers'

export const NewRecommendations = ({recommendations, onActionClick}) => {

    const [allChecked, setAllchecked] = useState(false);
    const [selectedRecommendations, setSelectedRecommendations] = useState([]);
    const [tableData, setTableData] = useState(recommendations);
    const toggleAllCheckboxes = () => {
        if (!allChecked) {
            const allRecommendations = recommendations.map(r => r.id);
            setSelectedRecommendations(allRecommendations);
            setAllchecked(true);
        } else {
            setSelectedRecommendations([]);
            setAllchecked(false);
        }
    }

    const isRecommendationSelected = (id) => {
        return selectedRecommendations.includes(id);
    }

    const addRecommendation = (recommendationId) => {
        let newRecommendations = [...selectedRecommendations, recommendationId];
        setSelectedRecommendations(newRecommendations);
    }

    const removeRecommendation = (recommendationId) => {
        let newRecommendations = selectedRecommendations.filter(r => r !== recommendationId);
        setSelectedRecommendations(newRecommendations);
    }

    const addRemoveRecommendation = (recommendationId) => () => {
        isRecommendationSelected(recommendationId) ? removeRecommendation(recommendationId) : addRecommendation(recommendationId);
    }

    const handleOnAction = (recommendationId, actionType = 'now') => {
        onActionClick([recommendationId], actionType);
    };

    const handleBulkAction = (actionType) => () => {
        setAllchecked(false);
        setSelectedRecommendations([]);
        onActionClick(selectedRecommendations, actionType);
    }


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
                    <p>No new recommendations yet! We'll email you as soon as we find new saving opportunities.</p>
                ) : (
                    <div className="table-responsive">
                        <table
                            className="table table-head-custom table-vertical-center"
                            id="kt_advance_table_widget_1"
                        >
                            <thead>
                            <tr className="text-left">
                                <th>
                                    <label className="checkbox checkbox-sm checkbox-single">
                                        <input type="checkbox" onClick={toggleAllCheckboxes} checked={allChecked}/>
                                        <span></span>
                                    </label>
                                </th>

                                {
                                    selectedRecommendations.length > 0 ? (
                                        <th className="bulkActions" colSpan="6">
                                            <div style={{width: "500px"}}>
                                                <Button variant="outline-secondary" onClick={handleBulkAction('now')}>
                                                    <img
                                                        alt="action"
                                                        className="actionLink"
                                                        src={toAbsoluteUrl("/media/run.png")}
                                                    />
                                                    <span>RUN NOW</span>
                                                </Button>
                                                <Button variant="outline-secondary"
                                                        onClick={handleBulkAction('schedule')}>
                                                    <img
                                                        alt="action"
                                                        className="actionLink"
                                                        src={toAbsoluteUrl("/media/schedule.png")}
                                                    />
                                                    <span>SCHEDULE</span>
                                                </Button>
                                                <Button variant="outline-secondary"
                                                        onClick={handleBulkAction('cancel')}>
                                                    <img
                                                        alt="action"
                                                        className="actionLink"
                                                        src={toAbsoluteUrl("/media/delete.png")}
                                                    />
                                                    <span>IGNORE</span>
                                                </Button>
                                            </div>
                                        </th>
                                    ) : (
                                        <React.Fragment>
                                            <th>RECOMMENDATION</th>
                                            <th>{<>
                                                <div className="sortArrowContainer">RESOURCE ID
                                                    <div className="sortArrows">
                                                        <img src={"/media/up-arrow.svg"}
                                                             onClick={() => sortColumn('resourceId', 'asc')}
                                                             alt="icon"/>
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
                                            <th>ACTIONS</th>
                                        </React.Fragment>
                                    )
                                }
                            </tr>
                            </thead>
                            <tbody>
                            {tableData.map((recommendation, index) => (
                                <tr key={index}>
                                    <td>
                                        <label className="checkbox checkbox-sm checkbox-single">
                                            <input
                                                type="checkbox"
                                                checked={allChecked || isRecommendationSelected(recommendation.id)}
                                                onClick={addRemoveRecommendation(recommendation.id)}/>
                                            <span></span>
                                        </label>
                                    </td>
                                    <td>{recommendation.opportunityDescription}</td>
                                    <td>{recommendation.resourceId}</td>
                                    <td>{recommendation.accountId}</td>
                                    <td>{recommendation.region}</td>
                                    <td>${FormatNumber(recommendation.annualSavings)}</td>
                                    <td>
                                        <div style={{width: "120px"}}>
                                            <RecommendationActions
                                                recommendationId={recommendation.id}
                                                onAction={handleOnAction}
                                                recommendationType="New"
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
