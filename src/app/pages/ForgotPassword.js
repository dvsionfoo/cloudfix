import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { FORGOT_PASSWORD_URL } from './../../app/appConfig';
import {Logo} from './../components/Logo';

const initialValues = {
  email: ""
};

export function ForgotPassword(props) {
  const [loading, setLoading] = useState(false);
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Wrong email format")
      .min(6, "Minimum 6 characters")
      .max(50, "Maximum 50 characters")
      .required("Email is required")
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
        username: values.email
      }
      enableLoading();
      return axios.post(FORGOT_PASSWORD_URL, reqBody)
        .then((response) => {
          setStatus("Instructions sent to your email address for resetting the password. Check your spam folder too");
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
    <div className="bareLayout">
      <div className="left">
        <div className="leftContent">
          {/* begin::Header */}
          <Logo />
          <h1>Forgot password</h1>
          <p>No problem! Enter your registered email ID.</p>
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
                      <label for="email">Your Email</label>
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
                        to="/login"
                        className="link"
                        id="kt_login_forgot"
                      >
                        Log in
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
