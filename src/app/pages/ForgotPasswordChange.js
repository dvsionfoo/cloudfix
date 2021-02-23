import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useHistory, useLocation } from 'react-router-dom';

import { FORGOT_PASSWORD_RESET_URL } from './../../app/appConfig';
import {Logo} from './../components/Logo';
import {getQueryParams} from './../helpers';

export function ForgotPasswordChange(props) {
  const location = useLocation();
  const queryParms = getQueryParams(location.search); 
  const code = queryParms.get('code');
  const email = queryParms.get('email');
  const initialValues = {
    email: email ? email : '',
    code: code ? code : '',
    password: ""
  };
  console.log(email, code);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const LoginSchema = Yup.object().shape({
    email: !email && Yup.string()
      .email("Wrong email format")
      .min(6, "Minimum 6 characters")
      .max(50, "Maximum 50 characters")
      .required("Email is required"),
    code: !code && Yup.string()
      .required('Code is required'),
    password: Yup.string()
      .min(8, "Minimum 8 chars")
      .max(50, "Maximum 50 chars")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
        )
      .required('Password is required'),
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
        code: values.code,
        password: values.password
      }
      enableLoading();
      return axios.post(FORGOT_PASSWORD_RESET_URL, reqBody)
        .then((response) => {
          setStatus("Password updated successfully, please login with your new password.");
          disableLoading();
          setSubmitting(false);
          setTimeout(history.push('/login'), 3000);
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
          <h1>Forgot password : Reset</h1>
          <h2 className="sub-heading">Reset your passsword here.</h2>
          <p>A mail with the reset code was sent to your registered email account.</p>
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

                    {
                      !email && (
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
                      )

                    }

                    {
                      !code && (
                   
                          <div className="form-group fv-plugins-icon-container">
                            <label htmlFor="code">Code</label>
                            <input
                              placeholder="Code sent in email"
                              type="text"
                              className={`form-control ${getInputClasses(
                                "code"
                              )}`}
                              name="code"
                              {...formik.getFieldProps("code")}
                            />
                            {formik.touched.code && formik.errors.code ? (
                              <div className="fv-plugins-message-container">
                                <div className="fv-help-block">{formik.errors.code}</div>
                              </div>
                            ) : null}
                          </div>
                      )
                    }

                    {/* begin: Password */}
                    <div className="form-group fv-plugins-icon-container">
                      <label htmlFor="password">New Password</label>
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
                        <span>Reset my password</span>
                        {loading && <span className="ml-3 spinner spinner-white"></span>}
                      </button>
                    </div>
                    <div className="form-group d-flex flex-wrap justify-content-between align-items-center">
                      <p><Link
                        to="/forgot-password"
                        className="link"
                        id="kt_login_forgot"
                      >
                        Get reset code
          </Link></p>
                      <p><Link
                          to="/register"
                          className="link"
                          id="kt_login_forgot"
                        >Sign up</Link></p>

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
