import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import { Formik } from "formik";
import axios from "axios";
import { connect } from "react-redux";
import * as Yup from "yup";

import { GET_USERS, LOCAL_STORAGE_KEY } from './../../app/appConfig';
import { actions } from './../../redux/appReducers';


function AddUpdateUsers(props) {
  
  let history = useHistory();
  const loginDetails = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  (!loginDetails || !loginDetails.accessToken) && history.push("/login");

  const { userDetails, onHide } = props;
  const [loading, setLoading] = useState(false);

  const RegistrationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required'),
    company: Yup.string()
      .required('Company is required'),
    phone: Yup.string()
      .required('Your phone number is required')
      .matches(/^[+]\d{5,18}$/, "Enter your phone number with +, country code and the number. E.g. +15129572316"),
    username: Yup.string()
      .email("Wrong username format")
      .required('Email is required'),
    role: Yup.string()
      .required('Role is required'),
  });

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const getInputClasses = (fieldname, formik) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return "is-invalid";
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return "is-valid";
    }

    return "";
  };


  const addUpdateUser = (userId) => (values, { setStatus, setSubmitting }) => {
    setStatus(userId ? 'Updating User' : 'Adding User');
    setSubmitting(true);
    enableLoading();
    let reqBody = {
      "username": values.username,
      "company": values.company,
      "phone": values.phone,
      "name": values.name,
      "role": values.role
    }
    return axios({
      method: userId ? 'PUT' : 'POST',
      url: userId ? `${GET_USERS}/${userId}` : GET_USERS,
      data: reqBody
    })
      .then((response) => {
        // props.register(response.data);
        setStatus("User added successfully");
        disableLoading();
        setSubmitting(false);
        onHide();
      })
      .catch(error => {
        setSubmitting(false);
        const { message, statusCode } = error.response.data;
        setStatus(`Error: ${message}. Error Code: ${statusCode}`);
        disableLoading();
      });
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div style={{ padding: '30px' }}>
        <div className="row">
          <div className="col-md-12">
            <div className="login-form" id="kt_login_signin_form">
              <Formik
                initialValues={{
                  name: userDetails ? userDetails.name : '',
                  company: userDetails ? userDetails.company : '',
                  username: userDetails ? userDetails.username : "",
                  phone: userDetails ? userDetails.phone : "",
                  role: userDetails ? userDetails.role : ""
                }}
                validationSchema={RegistrationSchema}
                onSubmit={addUpdateUser(userDetails ? userDetails.id : undefined)}
              >
                {props => (
                  <form
                    id="kt_login_signin_form"
                    className="form fv-plugins-bootstrap fv-plugins-framework animated animate__animated animate__backInUp"
                    onSubmit={props.handleSubmit}
                  >
                    {/* begin: Alert */}
                    {Formik.status && (
                      <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
                        <div className="alert-text font-weight-bold">{Formik.status}</div>
                      </div>
                    )}
                    {/* end: Alert */}

                    {/* begin: Email */}
                    <div className="form-group fv-plugins-icon-container">
                      <label htmlFor="username">Email</label>
                      <input
                        disabled={userDetails && userDetails.id ? true : false}
                        placeholder="Email"
                        type="text"
                        className={`form-control ${getInputClasses("username", props)}`}
                        name="username"
                        {...props.getFieldProps("username")}
                      />
                      {props.touched.username && props.errors.username ? (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">{props.errors.username}</div>
                        </div>
                      ) : null}
                    </div>
                    {/* end: Email */}

                    {/* begin: Fullname */}
                    <div className="form-group fv-plugins-icon-container">
                      <label htmlFor="name">Name</label>
                      <input
                        placeholder="Name"
                        type="text"
                        className={`form-control ${getInputClasses("name", props)}`}
                        name="name"
                        {...props.getFieldProps("name")}
                      />
                      {props.touched.name && props.errors.name ? (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">{props.errors.name}</div>
                        </div>
                      ) : null}
                    </div>
                    {/* end: Fullname */}

                    {/* begin: Company */}
                    <div className="form-group fv-plugins-icon-container">
                      <label htmlFor="company">Company</label>
                      <input
                        placeholder="Company"
                        type="text"
                        className={`form-control ${getInputClasses("company", props)}`}
                        name="company"
                        {...props.getFieldProps("company")}
                      />
                      {props.touched.company && props.errors.company ? (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">{props.errors.company}</div>
                        </div>
                      ) : null}
                    </div>
                    {/* end: Company */}

                    {/* begin: Phone */}
                    <div className="form-group fv-plugins-icon-container">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        placeholder="Phone Number"
                        type="text"
                        className={`form-control ${getInputClasses("phone", props)}`}
                        name="phone"
                        {...props.getFieldProps("phone")}
                      />
                      {props.touched.phone && props.errors.phone ? (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">{props.errors.phone}</div>
                        </div>
                      ) : null}
                    </div>
                    {/* end: phone */}


                    {/* begin: Role */}
                    <div className="form-group fv-plugins-icon-container">
                      <label htmlFor="role">Role</label>
                      <select
                        id="role"
                        name="role"
                        className={`form-control ${getInputClasses("role", props)}`}
                        {...props.getFieldProps("role")}>
                        <option value="">Select Role</option>
                        <option value="TENANT_ADMIN">TENANT_ADMIN</option>
                      </select>
                      {props.touched.role && props.errors.role ? (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">{props.errors.role}</div>
                        </div>
                      ) : null}
                    </div>
                    {/* end: role */}




                    <div className="action-btn">
                      <button
                        type="submit"
                        disabled={
                          props.isSubmitting ||
                          !props.isValid
                        }
                        className="btn btn-primary"
                      >
                        <span>{userDetails && userDetails.id ? 'Update' : 'Add'} User</span>
                        {loading && <span className="ml-3 spinner spinner-white"></span>}
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={onHide}
                        variant="outline-primary"
                        style={{ marginLeft: '10px' }}
                      >
                        <span>Cancel</span>
                      </button>
                    </div>

                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>

    </Modal>
  );
}

function mapStateToProps(state) {
  const { accessToken } = state.cloudFix;
  return { accessToken }
}

export default connect(mapStateToProps, actions)(AddUpdateUsers);