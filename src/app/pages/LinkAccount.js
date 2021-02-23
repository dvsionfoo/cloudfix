import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { toAbsoluteUrl } from "./../helpers";
import { GET_RUN_TEMPLATE_URL, GET_ACCOUNTS_URL, LOCAL_STORAGE_KEY, STEP_BY_STEP_GUIDE } from './../../app/appConfig';
import { actions } from './../../redux/appReducers';

export function LinkAccount(props) {
    let history = useHistory();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    let polling = null;
    let pollRequestCount = 0;
    const pollInterval = 10000;
    const maxRetries = 100;

    const getTemplateURL = () => {
        setLoading(true);
        return axios.get(GET_RUN_TEMPLATE_URL)
          .then((response) => {
              const { url } = response.data;
              window.open(url, "_blank");         
              polling = setInterval(()=>{ getRunTemplateStatus(GET_ACCOUNTS_URL)}, pollInterval);
              setError(`Got the required details. Requesting status now...`);
          })
          .catch(error => {
            setLoading(false);
            const { message, statusCode } = error.response.data;
            setError(`Error: ${message}. Error Code: ${statusCode}`);
          });
      };

    const getRunTemplateStatus = (accountsURL) => {
        pollRequestCount++;
        axios.get(accountsURL)
        .then((response) => {
          if (response.data.length > 0) {
            // Update the local storage
            const userAuthData = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY));
            userAuthData.totalAccounts = response.data.length;
            window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userAuthData));

            //Remove timer, set accoutns & Redirect to dashboard
            props.accounts(response.data);
            clearInterval(polling);
            history.push('/dashboard');
          } else if (pollRequestCount >= maxRetries) {
            //Remove timer & show error
            clearInterval(polling);
            setError(`The server took too long to process. Try again`);
            setLoading(false);
          } else {
            setError(`Getting the status of the request. Tried ${pollRequestCount} ${pollRequestCount === 1 ? 'time' : 'times'}`);
          }
        })
        .catch(error => {
          setLoading(false);
          clearInterval(polling);
          const { message, statusCode } = error.response.data;
          setError(`Error: ${message}. Error Code: ${statusCode}`);
        });
      }

    return (
        <div className="link-account">
            <div className="row">
                <div className="col-md-12">
                    <div className="aws-connect">
                        <img src={toAbsoluteUrl("/media/AWSlogo.png")} alt="logo" width="100" />
                        <h1>Connect Your AWS Account</h1>
                        <p>You need to be logged in to your AWS account in this browser before you can connect CloudFix.
                           If you are not logged in yet 
                           <a href="https://console.aws.amazon.com/" className="link" target="_blank" rel="noopener noreferrer"> log in to your aws account</a> now.</p>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="row aws-connect-template">
                        <div className="col-md-6 col-sm-12">
                            <h2>Run CloudFormation Template</h2>
                            <p>You need to run this simple CloudFormation template that creates an 
                               IAM role for CloudFix and grants permissions so that CloudFix can access your AWS account.</p>
                        </div>
                        <div className="col-md-6 run col-sm-12">
                            { error && <p className="errorMessage">{error}</p> }
                            <button
                                type="buttton"
                                disabled={false}
                                onClick={getTemplateURL}
                                className={`btn btn-primary font-weight-bold px-9 py-4 my-3 block`}>
                                <span>RUN TEMPLATE</span> {loading && <span className="ml-3 spinner spinner-white"></span>}
                            </button>
                            <p>Need help? <a href={STEP_BY_STEP_GUIDE} target="_blank" rel="noopener noreferrer" className="link"> Check out step-by-step guide</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default connect(null, actions)(LinkAccount);