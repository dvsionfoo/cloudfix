import React, { useState } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { actions } from './../../redux/appReducers';
import { LOGIN_URL, LOCAL_STORAGE_KEY, GET_ACCOUNTS_URL } from './../../app/appConfig';
import {Logo} from './../components/Logo';

const initialValues = {
  email: "",
  password: "",
};

export function Login(props) {
  let history = useHistory();
  const { login, totalAccounts } = props;
  const userDetails = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  if( userDetails && userDetails.accessToken) {
    totalAccounts > 0 ? history.push("/dashboard") : history.push("/link-account")
  } 


  const [loading, setLoading] = useState(false);
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Wrong email format")
      .min(6, "Minimum 6 characters")
      .max(50, "Maximum 50 characters")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Minimum 8 characters")
      .max(50, "Maximum 50 characters")
      .required("Password is required"),
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
        username: values.email,
        password: values.password
      }
      enableLoading();
      return axios.post(LOGIN_URL, reqBody)
        .then((response) => {          
          const userAuthDetails = response.data;
          const config = {headers: { Authorization : userAuthDetails.accessToken} };
          
          axios.get(GET_ACCOUNTS_URL, config)
            .then((response) => {
              const accounts = response.data;
              userAuthDetails.totalAccounts =  accounts.length;
              userAuthDetails.lastRequestedDate =  new Date().toISOString();
              userAuthDetails.username = values.email
              login(userAuthDetails);
              window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userAuthDetails));
              setStatus();
              history.push(accounts && accounts.length > 0 ? "/dashboard" : "/link-account");
            })
            .catch(error => {
              setSubmitting(false);
              const { message, statusCode } = error.response.data;
              setStatus(`Error: ${message}. Error Code: ${statusCode}`);
              disableLoading();
            });
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
    <div className="bareLayout">
      <div className="left">
        <div className="leftContent">
          {/* begin::Header */}
          <Logo />
          <h1>Login to CloudFix</h1>
          <p>Unlock recommendations to optimize your AWS</p>
          <div>
            <div className="row">
              <div className="col-md-12">
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

                    <div className="form-group fv-plugins-icon-container">
                      <label htmlFor="email">Your Email</label>
                      <input
                        placeholder="Email"
                        type="email"
                        className={`form-control ${getInputClasses(
                          "email"
                        )}`}
                        name="email"
                        {...formik.getFieldProps("email")}
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">{formik.errors.email}</div>
                        </div>
                      ) : null}
                    </div>
                    <div className="form-group fv-plugins-icon-container">
                      <label htmlFor="email">Password</label>
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
                        <span>Sign In</span>
                        {loading && <span className="ml-3 spinner spinner-white"></span>}
                      </button>
                    </div>
                    <div className="form-group d-flex flex-wrap justify-content-between align-items-center">
                      <p><Link
                        to="/forgot-password"
                        className="link"
                        id="kt_login_forgot"
                      >
                        Forgot Password?
          </Link></p>
                      <p>Need an account? &nbsp;
                    <Link
                          to="/register"
                          className="link"
                          id="kt_login_forgot"
                        >
                          Sign up here
          </Link></p>

                    </div>
                  </form>
                  {/*end::Form*/}
                </div>
              </div>
            </div>
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

export default connect(mapStateToProps, actions)(Login);