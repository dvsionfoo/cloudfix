/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Nav, Tab } from "react-bootstrap";
import axios from "axios";
import { connect } from "react-redux";

import {NewRecommendations} from './NewRecommendations';
import {ScheduledRecommendations} from './ScheduledRecommendations';
import {CompletedRecommendations} from './CompletedRecommendations';
import {InprogressRecommendations} from './InprogressRecommendations';
import {RECOMMENDATIONS_URL} from './../../app/appConfig';
import {actions} from './../../redux/appReducers';
import { ScheduleExecution } from './ScheduleExecution';
import { RecommendationInfo } from './RecommendationInfo';
import { SCHEDULE_EVENT_URL, FUTURE_SCHEDULE_TIME } from './../../app/appConfig';

function Recommendations(props) {
    const [scheduleModal, setShowScheduleModal] = useState(false);
    const [infoModal, setShowInfoModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [recommendationsData, setRecommendationsData] = useState({});

    const showScheduleModal = () => {
      setShowScheduleModal(true);
    }
    const hideScheduleModal = () => {
      setShowScheduleModal(false);
    }

    const hideInfoModal = () => {
      setShowInfoModal(false);
    }
    const showInfoModal = () => {
      setShowInfoModal(true);
    }

  const {userDetails, 
      completedRecommendations, 
      newRecommendations, 
      scheduledRecommendations, 
      recommendations, 
      inprogressRecommendations, 
      allRecommendations} = props;

  const [key, setKey] = useState("new");

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const fetchData = () => {
    axios.get(RECOMMENDATIONS_URL, { params : userDetails} ).then(response => {
      recommendations(response.data);
      disableLoading();
    }).catch(error => {
      disableLoading();
      console.log('Error in getting recommendations', error)
    });       
  };

  useEffect(() => {
      setError(`Loading your recommendations`);
      enableLoading(); 
      fetchData();
    }, []);

    const refetchRecommendations = () => {
      setError(`Reloading your recommendations`);
      enableLoading(); 
      fetchData();
    }

  const scheduleRecommendations = (recommendationIds, scheduledDate, status = 'Scheduled') => {
    setError(`Processing action for the recommendation`);
    enableLoading();
    const requestBody = {
      recommendationIds,
      scheduledDate,
      status
    };
    return axios.post(SCHEDULE_EVENT_URL, requestBody)
      .then((response) => {
          refetchRecommendations();
          hideScheduleModal();
      })
      .catch(error => {
          const { message, statusCode } = error.response.data;
          setError(`Error: ${message}. Error Code: ${statusCode}`);
          disableLoading();
      });   
}

const handleRecommendationAction = (recommendations, actionType) => {

  if( actionType === 'schedule' ) {
    setRecommendationsData(recommendations);
    showScheduleModal(recommendations);
  }
  else if (actionType === 'now') {
    const scheduledDate = getScheduledDate();
    scheduleRecommendations(recommendations, scheduledDate, 'Scheduled');
  } else if (actionType === 'reject') {
    const scheduledDate = getScheduledDate();
    scheduleRecommendations(recommendations, scheduledDate, 'Rejected');
  } else if (actionType === 'cancel') {
    const scheduledDate = getScheduledDate();
    scheduleRecommendations(recommendations, scheduledDate, 'Cancelled');
  } else {
    setRecommendationsData(recommendations);
    showInfoModal();
  }
}

const handleScheduleExecutionAction = (recommendations, userScheduledDate) => {
  scheduleRecommendations(recommendations, userScheduledDate);  
}

const getScheduledDate = (date = undefined) => {
  var scheduledDate = date ? new Date(date) : new Date();
  scheduledDate.setMinutes(scheduledDate.getMinutes() + FUTURE_SCHEDULE_TIME);
  return new Date(scheduledDate).toISOString();
}


  return (
    <div className={`card card-custom recommendations`}>
      {/* begin::Header */}
      <div className="card-header border-0 py-5">
        <h3 className="card-title">
          <span className="card-label font-weight-bolder">
            Recommendations
          </span>
        </h3>
        { loading && (<p className="recommendationsLoader">{error} <span className="ml-6 spinner spinner-white"></span></p>) }
        <div className="card-toolbar">
          <Tab.Container defaultActiveKey={key}>
            <Nav
              as="ul"
              onSelect={_key => setKey(_key)}
              className="nav nav-pills nav-pills-sm nav-dark-75"
            >
              <Nav.Item className="nav-item" as="li">
                <Nav.Link
                  eventKey="new"
                  className={`nav-link py-2 px-4 ${key === "new" ? "active" : ""
                    }`}
                >
                  New
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="nav-item" as="li">
                <Nav.Link
                  eventKey="scheduled"
                  className={`nav-link py-2 px-4 ${key === "scheduled" ? "active" : ""
                    }`}
                >
                  Scheduled
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="nav-item" as="li">
                <Nav.Link
                  eventKey="inprogress"
                  className={`nav-link py-2 px-4 ${key === "Inprogress" ? "active" : ""
                    }`}
                >
                  In-progress
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="nav-item" as="li">
                <Nav.Link
                  eventKey="completed"
                  className={`nav-link py-2 px-4 ${key === "Completed" ? "active" : ""
                    }`}
                >
                  Completed
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Tab.Container>
        </div>
      </div>
      {/* end::Header */}

      {/* begin::Body */}
      <div className="card-body py-0">

          {
            key === 'new' && newRecommendations && (
            <NewRecommendations 
              recommendations={newRecommendations} 
              onActionClick={handleRecommendationAction} 
            />)
          }
          {key === 'scheduled' && scheduledRecommendations && (
            <ScheduledRecommendations 
              recommendations={scheduledRecommendations}
              onActionClick={handleRecommendationAction} 
            />)}
          { key === 'completed' && completedRecommendations && (
            <CompletedRecommendations 
              recommendations={completedRecommendations} 
              onActionClick={handleRecommendationAction} 
              />)}
          { key === 'inprogress' && completedRecommendations && (
            <InprogressRecommendations 
              recommendations={inprogressRecommendations} 
              onActionClick={handleRecommendationAction} 
              />)}

              
          <ScheduleExecution 
            show={scheduleModal} 
            onHide={hideScheduleModal} 
            recommendations={recommendationsData}
            handleActionClick={handleScheduleExecutionAction}
            />

          <RecommendationInfo 
            recommendation={allRecommendations && allRecommendations.length > 0 && allRecommendations.find(element => element.id === recommendationsData[0])} 
            show={infoModal}
            onHide={hideInfoModal} 
          />
      </div>
      {/* end::Body */}
    </div>
  );
}

function mapStateToProps(state) {
  const { newRecommendations, scheduledRecommendations, completedRecommendations, inprogressRecommendations, allRecommendations } = state.cloudFix.recommendations;
  return { newRecommendations, scheduledRecommendations, completedRecommendations, inprogressRecommendations, allRecommendations }
}

export default connect(mapStateToProps, actions)(Recommendations);