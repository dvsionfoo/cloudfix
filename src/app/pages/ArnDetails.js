import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

export const LOGIN_URL = "api/auth/login";

const initialValues = {
  arn: "",
  label: "",
};

export function ArnDetails(props) {
  const [loading, setLoading] = useState(false);
  const ArnSchema = Yup.object().shape({
    arn: Yup.string()
      .required('ARN is required'),
    label: Yup.string()
      .required('Label is required'),
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
    validationSchema: ArnSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      let reqBody = {
        arn: values.arn,
        label: values.label
      }
      enableLoading();
      setTimeout(() => {
        let req = axios.post(LOGIN_URL, reqBody)
        req.then(({ data: { accessToken } }) => {
            disableLoading();
            props.login(accessToken);
          })
          .catch(() => {
            disableLoading();
            setSubmitting(false); 
            setStatus("Invalid Details");
          });
      }, 1000);
    },
  });

  return (
    <div className={`card`} style={{width:'500px', margin: 'auto'}}>
    {/* begin::Header */}
    <div className="card-header border-0 py-5">
      <h3 className="card-title">
        <span className="card-label font-weight-bolder text-dark">
          Enter ARN details
        </span>
      </h3>
    </div>
    <div className="card-body py-0">
      <div className="row">
        <div className="col-md-12">
    <div className="login-form login-signin" id="kt_login_signin_form">
      {/*begin::Form*/}
      <form
        onSubmit={formik.handleSubmit}
        className="form fv-plugins-bootstrap fv-plugins-framework"
      >
      

        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="ARN"
            type="text"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "arn"
            )}`}
            name="arn"
            {...formik.getFieldProps("arn")}
          />
          {formik.touched.arn && formik.errors.arn ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.arn}</div>
            </div>
          ) : null}
        </div>
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Label"
            type="text"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "label"
            )}`}
            name="label"
            {...formik.getFieldProps("label")}
          />
          {formik.touched.label && formik.errors.label ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.label}</div>
            </div>
          ) : null}
        </div>
        <div className="form-group d-flex flex-wrap justify-content-between align-items-center">
          <button
            id="kt_login_signin_submit"
            type="submit"
            disabled={formik.isSubmitting}
            className={`btn btn-primary font-weight-bold px-9 py-4 my-3`}
          >
            <span>Continue</span>
            {loading && <span className="ml-3 spinner spinner-white"></span>}
          </button>
        </div>
      </form>
      {/*end::Form*/}
    </div>
    </div>
    </div>
    </div>
    </div>
  );
}
