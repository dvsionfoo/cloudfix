import React, { useState } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";

import { CHANGE_PASSWORD_URL, LOCAL_STORAGE_KEY } from './../../app/appConfig';
import { actions } from './../../redux/appReducers';

const initialValues = {
  email: ""
};

function ChangePassword(props) {
  let history = useHistory();
  const userDetails = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  (!userDetails || !userDetails.accessToken) && history.push("/login")

  const [loading, setLoading] = useState(false);
  const LoginSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, "Minimum 8 chars")
      .max(50, "Maximum 50 chars")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
        )
      .required('Old password is required'),
      newPassword: Yup.string()
      .min(8, "Minimum 8 chars")
      .max(50, "Maximum 50 chars")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
        )
      .required('New password is required'),
  });

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return "is-invalid";
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return "is-valid";
    }

    return "";
  };

  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      setSubmitting(true);
      setStatus();
      let reqBody = {
        oldPassword: values.password,
        newPassword: values.newPassword
      }
      enableLoading();
      return axios.post(CHANGE_PASSWORD_URL, reqBody)
        .then((response) => {
          setStatus("Password changed successfully.");
          disableLoading();
          setSubmitting(false);
        })
        .catch(error => {
          setSubmitting(false);
          const { message, statusCode } = error.response.data;
          setStatus(`Error: ${message}. Error Code: ${statusCode}`);
          disableLoading();
        });
    },
  });

  return (

    <div className="change-password-page">
     
      <div className="row">
        <div className="col-md-12">
          <div className={`card card-custom card-stretch gutter-b`}>
            {/* begin::Header */}
            <div className="card-header border-0 py-5">
              <h3 className="card-title align-items-start flex-column">
                <span className="card-label font-weight-bolder">
                  Change Password
          </span>
                <span className="text-muted mt-3 font-weight-bold font-size-sm">
                  Update your password
          </span>
              </h3>
            </div>
            {/* end::Header */}

            {/* begin::Body */}
            <div className="card-body py-0">
            <div className="login-form" id="kt_login_signin_form">
                  {/*begin::Form*/}
                  <form
                    onSubmit={formik.handleSubmit}
                    className="form fv-plugins-bootstrap fv-plugins-framework"
                  >
                    {/* begin: Alert */}
                    {formik.status && (
                      <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
                        <div className="alert-text font-weight-bold">{formik.status}</div>
                      </div>
                    )}
                    {/* end: Alert */}


                     {/* begin: Password */}
                    <div className="form-group fv-plugins-icon-container">
                      <label htmlFor="password">Old Password</label>
                      <input
                        placeholder="Password"
                        type="password"
                        className={`form-control ${getInputClasses(
                          "password"
                        )}`}
                        name="password"
                        {...formik.getFieldProps("password")}
                      />
                      {formik.touched.password && formik.errors.password ? (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">{formik.errors.password}</div>
                        </div>
                      ) : null}
                    </div>
                    {/* end: Password */}

                    {/* begin: Password */}
                    <div className="form-group fv-plugins-icon-container">
                      <label htmlFor="newPassword">New Password</label>
                      <input
                        placeholder="New Password"
                        type="password"
                        className={`form-control ${getInputClasses(
                          "newPassword"
                        )}`}
                        name="newPassword"
                        {...formik.getFieldProps("newPassword")}
                      />
                      {formik.touched.newPassword && formik.errors.newPassword ? (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">{formik.errors.newPassword}</div>
                        </div>
                      ) : null}
                    </div>
                    {/* end: Password */}

                    <div className="action-btn">
                      <button
                        id="kt_login_signin_submit"
                        type="submit"
                        disabled={
                          formik.isSubmitting ||
                          !formik.isValid
                        }
                        className={`btn btn-primary font-weight-bold px-9 py-4 my-3 block`}
                      >
                        <span>Change my password</span>
                        {loading && <span className="ml-3 spinner spinner-white"></span>}
                      </button>
                    </div>
                    <div className="form-group d-flex flex-wrap justify-content-between align-items-center">
                      <p><Link
                        to="/dashboard"
                        className="link"
                        id="kt_login_forgot"
                      >
                        Dashboard
          </Link></p>
                      <p><Link
                          to="/accounts"
                          className="link"
                          id="kt_login_forgot"
                        >AWS Accounts</Link></p>

                    </div>
                  </form>
                  {/*end::Form*/}
                </div>
            </div>
            {/* end::Body */}
          </div>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
    const { accessToken } = state.cloudFix;
    return { accessToken }
  }
  export default connect(mapStateToProps, actions)(ChangePassword);