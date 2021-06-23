import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Icon from '@material-ui/core/Icon';
import axios from "axios";
import { connect } from "react-redux";
import { useHistory } from 'react-router-dom';

import AddUpdateUsers from './../components/AddUpdateUsers';
import { actions } from './../../redux/appReducers';
import { GET_USERS, LOCAL_STORAGE_KEY } from './../../app/appConfig';

function Users(props) {
  let history = useHistory();
  const userDetails = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  (!userDetails || !userDetails.accessToken) && history.push("/login")

  const { users, setUsers } = props;
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userToUpdate, setUserToUpdate] = useState();

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
    getUsers();
  }

  const getUsers = () => {
    enableLoading();
    return axios.get(GET_USERS)
      .then((response) => {
        setUsers(response.data);
        disableLoading();
      })
      .catch(error => {
        disableLoading();
      });
  }

  const deleteUser = (userId) => () => {
    enableLoading();
    return axios.delete(GET_USERS + '/' + userId)
      .then((response) => {
        getUsers();
        disableLoading();
      })
      .catch(error => {
        disableLoading();
      });
  }

  const editUser = (user) => () => {
    setUserToUpdate(user);
    showModal();
  }

  const addUser = () => {
    setUserToUpdate(null);
    showModal();
  }

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className="accounts-page">
      <AddUpdateUsers show={modal} onHide={hideModalGetAccounts} userDetails={userToUpdate} />

      <div className="row">
        <div className="col-md-12">
          <div className={`card card-custom card-stretch gutter-b`}>
            {/* begin::Header */}
            <div className="card-header border-0 py-5">
              <h3 className="card-title align-items-start flex-column">
                <span className="card-label font-weight-bolder">Users {loading && <span className="ml-3 spinner spinner-red"></span>}</span>
              </h3>
              <div className="card-toolbar">
                <Button
                  className="btn btn-outline-primary font-weight-bolder font-size-sm"
                  onClick={addUser}
                ><Icon className="fa fa-plus" />
                  Add User
                </Button>
              </div>
            </div>
            {/* end::Header */}

            {/* begin::Body */}
            <div className="card-body py-0">
              {/* begin::Table */}
              <div className="table-responsive">
                {
                  (!users || users.length === 0) ? (
                    <p>No users added yet.</p>
                  ) : (
                    <table
                      className="table table-head-custom table-vertical-center"
                      id="kt_advance_table_widget_1"
                    >
                      <thead>
                        <tr className="text-left">
                          <th style={{ minWidth: "250px" }}>USERNAME</th>
                          <th style={{ minWidth: "100px" }}>NAME</th>
                          <th style={{ minWidth: "100px" }}>COMPANY</th>
                          <th style={{ minWidth: "100px" }}>PHONE</th>
                          <th style={{ minWidth: "100px" }}>ROLE</th>
                          <th className="pr-0 text-right" style={{ minWidth: "50px" }}>

                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user, index) => (
                          <tr key={index}>
                            <td className="pl-0">{user.username}</td>
                            <td className="pl-0">{user.name}</td>
                            <td className="pl-0">{user.company}</td>
                            <td className="pl-0">{user.phone}</td>
                            <td className="pl-0">{user.role}</td>
                            <td className="pr-0 text-right action-icons">

                              <Icon className="fa fa-plus" onClick={editUser(user)} color="primary" />
                              <Icon className="fa fa-trash" onClick={deleteUser(user.id)} color="error" />

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
  const { users } = state.cloudFix;
  return { users }
}
export default connect(mapStateToProps, actions)(Users);