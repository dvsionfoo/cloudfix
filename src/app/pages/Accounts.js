import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Icon from '@material-ui/core/Icon';
import axios from "axios";
import { connect } from "react-redux";
import {useHistory} from 'react-router-dom';

import { AddUser } from './../components/AddUser';
import { actions } from './../../redux/appReducers';
import { GET_ACCOUNTS_URL, LOCAL_STORAGE_KEY } from './../../app/appConfig';
import { toAbsoluteUrl } from "./../helpers";
import { DeleteAccount } from './../components/DeleteAccount';

function Accounts(props) {
  let history = useHistory();
  const userDetails = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  (!userDetails || !userDetails.accessToken) && history.push("/login")

  const { userAccounts, accounts } = props;
  const [modal, setModal] = useState(false);
  const [deleteAccountModal, setDeleteAccountModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const enableLoading = () => {
    setLoading(true);
  };
  const disableLoading = () => {
    setLoading(false);
  };
  const showModal = () => {
    setModal(true);
  };

  const hideModal = () => {
    setModal(false);
  };

  const hideModalGetAccounts = () => {
    hideModal();
    getUserAccounts();
  }

  const showDeleteAccountModal = () => {
    setDeleteAccountModal(true);
  };

  const hideDeleteAccountModal = () => {
    setDeleteAccountModal(false);
  };

  const getUserAccounts = () => {
    enableLoading();
    return axios.get(GET_ACCOUNTS_URL)
      .then((response) => {
        accounts(response.data);
        disableLoading();
      })
      .catch(error => {
        disableLoading();
      });
  }

  const showDeleteInfo = () => {
    showDeleteAccountModal();
  }

  const getLastScheduleDate = (timeInSeconds) => {
    let t = new Date(0);
    t.setSeconds(timeInSeconds);
    return t.toLocaleString();
  }

  useEffect(() => {
    getUserAccounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


  return (
    <div className="accounts-page">
      <AddUser show={modal} onHide={hideModalGetAccounts} />
      <DeleteAccount show={deleteAccountModal} onHide={hideDeleteAccountModal} />
      <div className="row">
        <div className="col-md-12">
          <div className={`card card-custom card-stretch gutter-b`}>
            {/* begin::Header */}
            <div className="card-header border-0 py-5">
              <h3 className="card-title align-items-start flex-column">
                <span className="card-label font-weight-bolder">
                  AWS Accounts
          </span>
                <span className="text-muted mt-3 font-weight-bold font-size-sm">
                  Manage your accounts
          </span>
              </h3>
              <div className="card-toolbar">
                <Button
                  className="btn btn-outline-primary font-weight-bolder font-size-sm"
                  onClick={getUserAccounts}
                ><Icon className="fa fa-sync" />
                  Refresh Accounts {loading && <span className="ml-3 spinner spinner-white"></span>}
                </Button>
                <Button
                  className="btn btn-outline-primary font-weight-bolder font-size-sm"
                  onClick={showModal}
                ><Icon className="fa fa-plus" />
                  Add New AWS Account
                </Button>
              </div>
            </div>
            {/* end::Header */}

            {/* begin::Body */}
            <div className="card-body py-0">
              {/* begin::Table */}
              <div className="table-responsive">
                {
                  (!userAccounts || userAccounts.length === 0) ? (
                    <p>No AWS accounts added yet.</p>
                  ) : (
                      <table
                        className="table table-head-custom table-vertical-center"
                        id="kt_advance_table_widget_1"
                      >
                        <thead>
                          <tr className="text-left">
                            <th style={{ minWidth: "100px" }}></th>
                            <th style={{ minWidth: "250px" }}>Account ID</th>
                            <th style={{ minWidth: "250px" }}>last scanned time</th>
                            <th style={{ minWidth: "150px" }}>last scanned status</th>
                            <th className="pr-0 text-right" style={{ minWidth: "150px" }}>

                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {userAccounts.map((account, index) => (
                            <tr key={index}>
                              <td className="pr-0">
                                <i className="fa fa-cloud"></i>
                              </td>
                              <td className="pl-0">{account.accountId}</td>
                              <td className="pl-0">{account.lastScheduleDate && getLastScheduleDate(account.lastScheduleDate)}</td>
                              <td className="pl-0">{account.lastScheduleStatus}</td>
                              <td className="pr-0 text-right">
                                
                                  <img 
                                      alt="action" 
                                      className="actionLink" 
                                      src={toAbsoluteUrl("/media/delete.png")}
                                      onClick={showDeleteInfo}
                                  />
                             
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
              </div>
              {/* end::Table */}
            </div>
            {/* end::Body */}
          </div>
        </div>
      </div>
    </div>

  );
}

function mapStateToProps(state) {
  const { accounts } = state.cloudFix;
  return { userAccounts: accounts }
}
export default connect(mapStateToProps, actions)(Accounts);