import React from "react";
import { useHistory } from 'react-router-dom';
import { connect } from "react-redux";

import { actions } from './../../redux/appReducers';
import {Logo} from './../components/Logo';

export function RefreshToken(props) {
  let history = useHistory();
  const { accessToken, totalAccounts } = props;
  accessToken && totalAccounts > 0 && history.push("/dashboard");

  return (
    <div className="bareLayout">
      <div className="left">
        <div className="leftContent">
          {/* begin::Header */}
          <Logo />
          <h1>Authenticating you...</h1>
          <p>You will be redirected after.</p>
          <div>
              
          </div>
        </div>
      </div>
     
    </div>
  );
}

function mapStateToProps(state) {
  const { accessToken, totalAccounts } = state.cloudFix;
  return { accessToken, totalAccounts }
}

export default connect(mapStateToProps, actions)(RefreshToken);