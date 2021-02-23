import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { useFormik } from "formik";
import axios from "axios";
import { connect } from "react-redux";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import ReactGA from 'react-ga';

import { REGISTER_URL, PRIVACY_URL, TERMS_URL, 
  HUBSPOT_LEAD_API, HUBSPOT_LEAD_API_PORTALID, 
  HUBSPOT_LEAD_API_FORMID, APP_DOMAIN, LOGIN_URL,
 GET_ACCOUNTS_URL, LOCAL_STORAGE_KEY } from './../../app/appConfig';
import { actions } from './../../redux/appReducers';
import {Logo} from './../components/Logo';

ReactGA.initialize('UA-179111689-1', {
  gaOptions: {
    allowLinker: true
  },
});
ReactGA.ga('require', 'linker');
ReactGA.ga('linker:autoLink', ['devgraph.com', 'cloudfix.devgraph.com']);

const initialValues = {
  name: "",
  company: "",
  email: "",
  phone: "",
  password: "",
  acceptTerms: false,
};

function Register(props) {
  let history = useHistory();
  const [loading, setLoading] = useState(false);
  const { accessToken } = props;
  accessToken && history.push("/dashboard");



  const RegistrationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Your name is required'),
    company: Yup.string()
      .required('Company name is required'),
    phone: Yup.string()
      .required('Your phone number is required')
      .matches(/^[+]\d{5,18}$/, "Enter your phone number with +, country code and the number. E.g. +15129572316"),
    email: Yup.string()
      .email("Wrong email format")
      .required('Email is required'),
    password: Yup.string()
      .min(8, "Minimum 8 chars")
      .max(50, "Maximum 50 chars")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
        )
      .required('Password is required')
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

  function _submitHubSpotForm(values, actions)  {
    var xhr = new XMLHttpRequest();
    var url = `${HUBSPOT_LEAD_API}/v3/integration/submit/${HUBSPOT_LEAD_API_PORTALID}/${HUBSPOT_LEAD_API_FORMID}`
    
    // Example request JSON:
    var data = JSON.stringify({
      "submittedAt": Date.now(),
      "fields": [
        {
          "name": "email",
          "value": values.email? values.email:''
        },
        {
          "name": "firstname",
          "value": values.name? values.name:''
        },
        {
          "name": "lastname",
          "value": 'NA'
        },
        {
          "name": "company",
          "value": values.company? values.company: ''
        },
        {
          "name": "phone",
          "value": values.phone? values.phone:''
        }
      ],
      "context": {
        "pageUri": APP_DOMAIN,
        "pageName": "CloudFix Sign Up"
      },
      "legalConsentOptions":{ // Include this object when GDPR options are enabled
        "consent":{
          "consentToProcess":true,
          "text":"I agree to allow Example Company to store and process my personal data.",
          "communications":[
            {
              "value":true,
              "subscriptionTypeId":999,
              "text":"I agree to receive marketing communications from Example Company."
            }
          ]
        }
      }
    });
    var final_data = JSON.stringify(data).replace(/\\"/g, '"').slice(1, -1)

    xhr.open('POST', url);
    // Sets the value of the 'Content-Type' HTTP request headers to 'application/json'
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function() {
        /* if(xhr.readyState == 4 && xhr.status == 200) { 
            alert(xhr.responseText); // Returns a 200 response if the submission is successful.
        } else if (xhr.readyState == 4 && xhr.status == 400){ 
            alert(xhr.responseText); // Returns a 400 error the submission is rejected.          
        } else if (xhr.readyState == 4 && xhr.status == 403){ 
            alert(xhr.responseText); // Returns a 403 error if the portal isn't allowed to post submissions.           
        } else if (xhr.readyState == 4 && xhr.status == 404){ 
            alert(xhr.responseText); //Returns a 404 error if the formGuid isn't found     
        } */
       }
    // Sends the request 
    xhr.send(final_data)
  }
  const formik = useFormik({
    initialValues,
    validationSchema: RegistrationSchema,

    onSubmit: (values, { setStatus, setSubmitting }) => {
      setStatus();
      setSubmitting(true);
      enableLoading();
      _submitHubSpotForm(values, actions);
      let reqBody = {
        "username": values.email,
        "password": values.password,
        "company": values.company,
        "phoneNumber": values.phone,
        "name": values.name
      }
      return axios.post(REGISTER_URL, reqBody)
        .then((response) => {
          props.register(response.data);
          setStatus("Registration successfull. You will be redirected to the next step");
          disableLoading();
          setSubmitting(false);
          ReactGA.event({
            category: 'CloudFix Sign Up',
            action: 'Sign up for free',
            label: 'CloudFix Sign up Completed'
          });

          /* Auto login after regiser */

          const loginReqBody = {
            username: values.email,
            password: values.password
          }

          return axios.post(LOGIN_URL, loginReqBody)
            .then((response) => {          
              const userAuthDetails = response.data;
              const config = {headers: { Authorization : userAuthDetails.accessToken} };
              
              axios.get(GET_ACCOUNTS_URL, config)
                .then((response) => {
                  const accounts = response.data;
                  userAuthDetails.totalAccounts =  accounts.length;
                  userAuthDetails.lastRequestedDate =  new Date().toISOString();
                  userAuthDetails.username = values.email
                  props.login(userAuthDetails);
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

          /* Auto login ends here */
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
    <div className="bareLayout register">
      <div className="left">
        <div className="leftContent">
          {/* begin::Header */}
          <Logo />
          <h1>Welcome to CloudFix</h1>
          <p>Create a CloudFix account and optimize your AWS</p>
          <div>
            <div className="row">
              <div className="col-md-12">
                <div className="login-form" id="kt_login_signin_form">

                  <form
                    id="kt_login_signin_form"
                    className="form fv-plugins-bootstrap fv-plugins-framework animated animate__animated animate__backInUp"
                    onSubmit={formik.handleSubmit}
                  >
                    {/* begin: Alert */}
                    {formik.status && (
                      <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
                        <div className="alert-text font-weight-bold">{formik.status}</div>
                      </div>
                    )}
                    {/* end: Alert */}

                    {/* begin: Fullname */}
                    <div className="form-group fv-plugins-icon-container">
                      <label htmlFor="name">Your Name</label>
                      <input
                        placeholder="Your name"
                        type="text"
                        className={`form-control ${getInputClasses(
                          "name"
                        )}`}
                        name="name"
                        {...formik.getFieldProps("name")}
                      />
                      {formik.touched.name && formik.errors.name ? (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">{formik.errors.name}</div>
                        </div>
                      ) : null}
                    </div>
                    {/* end: Fullname */}

                    {/* begin: Company */}
                    <div className="form-group fv-plugins-icon-container">
                      <label htmlFor="company">Company Name</label>
                      <input
                        placeholder="Company Name"
                        type="text"
                        className={`form-control ${getInputClasses(
                          "company"
                        )}`}
                        name="company"
                        {...formik.getFieldProps("company")}
                      />
                      {formik.touched.company && formik.errors.company ? (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">{formik.errors.company}</div>
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
                        className={`form-control ${getInputClasses(
                          "phone"
                        )}`}
                        name="phone"
                        {...formik.getFieldProps("phone")}
                      />
                      {formik.touched.phone && formik.errors.phone ? (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">{formik.errors.phone}</div>
                        </div>
                      ) : null}
                    </div>
                    {/* end: phone */}

                    {/* begin: Email */}
                    <div className="form-group fv-plugins-icon-container">
                      <label htmlFor="email">Your Email</label>
                      <input
                        placeholder="Your Email"
                        type="text"
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
                    {/* end: Email */}



                    {/* begin: Password */}
                    <div className="form-group fv-plugins-icon-container">
                      <label htmlFor="password">Password</label>
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
                        type="submit"
                        disabled={
                          formik.isSubmitting ||
                          !formik.isValid
                        }
                        className="btn btn-primary font-weight-bold"
                      >
                        <span>Sign Up for Free</span>
                        {loading && <span className="ml-3 spinner spinner-white"></span>}
                      </button>
                    </div>
                    <div className="form-group d-flex flex-wrap justify-content-between align-items-center">
                      <p>By clicking on "SIGN UP FOR FREE" you agree to our 
                        <a href={TERMS_URL} target="_blank" rel="noopener noreferrer"> terms</a> and <a href={PRIVACY_URL} rel="noopener noreferrer" target="_blank">privacy policy</a>.</p>

                      <p>Already have an account?  &nbsp;
                    <Link
                          to="/login"
                          className="link"
                          id="kt_login_forgot"
                        >
                          Login here
          </Link></p>

                    </div>
                  </form>
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
  const { accessToken } = state.cloudFix;
  return { accessToken }
}
export default connect(mapStateToProps, actions)(Register);