import React, {useEffect} from "react";
import { connect } from "react-redux";
import { Button, Badge, Dropdown } from "react-bootstrap";
import axios from "axios";
import {useHistory, useLocation} from 'react-router-dom';

import {actions} from './../../../../redux/appReducers';
import { LOCAL_STORAGE_KEY, GET_USER_DETAILS, GET_ACCOUNTS_URL } from './../../../../app/appConfig';


function Topbar(props) {  
  const { accessToken, totalAccounts, user, userDetails, accounts, logout} = props;  
  const history = useHistory();
  const locationName = useLocation().pathname.substr(1);
  
  useEffect(() => {
    const fetchUserData = () => {
      axios.get(GET_USER_DETAILS).then(result => {
        user(result.data);
      }).catch(error => {
        console.log('Forcing user to logoout', error);
        logoutUser();
      });
    }; 
    const fetchAccountsData = () => {
      axios.get(GET_ACCOUNTS_URL).then(result => {
        const userAccountsResult = result.data;
        userAccountsResult.length === 0 && history.push("/link-account");
        accounts(userAccountsResult);
      }).catch(error => {
        console.log('Forcing user to logoout', error);
        logoutUser();
      })        
    }; 
    fetchUserData();
    fetchAccountsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, accounts]);

    const logoutUser = () => {
      window.localStorage.removeItem(LOCAL_STORAGE_KEY);
      logout();
      history.push("/login");
    }

  return (
    <div className="topbar">
      <div
        className="topbar-item"
        data-toggle="tooltip"
        title="Quick panel"
        data-placement="right"
        style={{'marginRight': '10px'}}
      >
      { accessToken ? (
       <>
      <div>
                
          { totalAccounts > 0 && locationName === 'dashboard' && <Button className="accounts-count-btn" variant="outline-primary" href="/#accounts" size="sm">AWS Accounts <Badge variant="success">{totalAccounts}</Badge></Button>}
          { totalAccounts > 0 && locationName === 'accounts' && <Button className="accounts-count-btn" variant="outline-primary" href="/#dashboard" size="sm">Recommendations</Button>}
          { totalAccounts > 0 && locationName === 'link-account' && <Button className="accounts-count-btn" variant="outline-primary" href="/#dashboard" size="sm">Recommendations</Button>}
         
          
      </div>
        { userDetails && userDetails.name && 
          <Dropdown className="user-dropdown">
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components" data-name={userDetails.name}>
            </Dropdown.Toggle>
            <Dropdown.Menu>           
              <Dropdown.Item eventKey="5" href="/#change-password">Change Password</Dropdown.Item>
              <Dropdown.Item eventKey="4" onClick={logoutUser}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
      }
      </>
        ) : (
          <>
      <div><Button variant="secondary" size="sm" href="/#register" style={{'marginRight': '10px'}}>Register</Button></div>
      <div><Button variant="secondary" size="sm" href="/#login">Login </Button></div>
      </>
        )}
    </div>
    </div>
  );
}

const CustomToggle = React.forwardRef((props, ref) => {
  const { children, onClick } = props;
  return (
  
  <a
    href="/"
    ref={ref}
    className="abbr"
    onClick={e => {
      e.preventDefault();
      onClick(e);
    }}
  >
    <span className="welcome-text">Welcome,</span>
    {props['data-name']}
    <span className="abbr-text">{getAbbr(props['data-name'])}</span>
    {children}
  </a>
);

});

const getAbbr = (name) => {
  const parts = name.split(' ');
  let abbvr = parts && parts[0] && parts[0].charAt(0);
  abbvr += parts && parts[1] ? parts[1].charAt(0) : '';
  return abbvr;
}

function mapStateToProps(state) {
  const { accessToken, totalAccounts, userDetails } = state.cloudFix;
  return { accessToken, totalAccounts, userDetails }
}

export default connect(mapStateToProps, actions)(Topbar);