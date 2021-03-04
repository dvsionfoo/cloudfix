/* eslint-disable */
import React, { useState, useEffect } from "react";
import {useHistory} from 'react-router-dom';
import axios from "axios";
import { connect } from "react-redux";

import Recommendations from "../components/Recommendations";
import {actions} from './../../redux/appReducers';
import {SAVINGS_URL, LOCAL_STORAGE_KEY} from './../../app/appConfig';
import {FormatNumber} from './../helpers';

export function Dashboard(props) {
  const { realizedSavings, recommendedSavings, savings } = props;
  let history = useHistory();
  const userDetails = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  (!userDetails || !userDetails.accessToken) && history.push("/login")
  const [loading, setLoading] = useState(false);

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const fetchUserData = () => {
    axios.get(SAVINGS_URL).then(response => {
      savings(response.data);
      disableLoading();
    }).catch(error => {
      console.log('Error in getting savings', error);
      disableLoading();
    });       
  };

  useEffect(() => {
    enableLoading();
    fetchUserData();
    }, []);

  return (
    <>
      <div className="savings-row">
        <div className="savings-column">
          <div className="savingsAlert">
            <div className="savingsAlert-row">
              <div className="savingsAlert-column-1">
                {loading ? <span className="spinner spinner-white"></span> : <h1>${FormatNumber(recommendedSavings)}</h1>}                
              </div>
              <div className="savingsAlert-column-2">
                <h2>Recommended Savings</h2>
                <p>We have recommendations for you that would result in ${FormatNumber(recommendedSavings)} worth of annualized savings in AWS costs. All you have to do is schedule tasks for CloudFix.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="savings-column">
        <div className="savingsAlert realized">
            <div className="savingsAlert-row">
              <div className="savingsAlert-column-1">
                {loading ? <span className="spinner spinner-white"></span> : <h1>${FormatNumber(realizedSavings)}</h1>}
              </div>
              <div className="savingsAlert-column-2">
                <h2>Realized Savings</h2>
                <p>Congratulations! You’ve executed fixes that would result in ${FormatNumber(realizedSavings)} worth of annualized savings. Keep 
                saving with weekly recommendations &amp; automated fixes.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <Recommendations className="card-stretch gutter-b" />
        </div>
      </div>
    </>

  );
}
function mapStateToProps(state) {
  const { recommendedSavings, realizedSavings } = state.cloudFix;
  return { recommendedSavings, realizedSavings }
}
export default connect(mapStateToProps, actions)(Dashboard);