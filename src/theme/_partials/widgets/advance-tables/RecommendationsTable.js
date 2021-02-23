/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import SVG from "react-inlinesvg";
import { Nav, Tab, Badge } from "react-bootstrap";
import { toAbsoluteUrl } from "../../../_helpers";

export function RecommendationsTable({ className }) {
  const [key, setKey] = useState("Month");
  let [recommendations, setRecommendations] = useState([])

  useEffect(() => {
    fetch("/ui/recommendations")
      .then((response) => response.json())
      .then((json) => setRecommendations(json))
  }, []);


  return (
    <div className={`card card-custom ${className}`}>
      {/* begin::Header */}
      <div className="card-header border-0 py-5">
        <h3 className="card-title">
          <span className="card-label font-weight-bolder text-dark">
            Recommendations
          </span>
        </h3>
        <div className="card-toolbar">
          <Tab.Container defaultActiveKey={key}>
            <Nav
              as="ul"
              onSelect={_key => setKey(_key)}
              className="nav nav-pills nav-pills-sm nav-dark-75"
            >
              <Nav.Item className="nav-item" as="li">
                <Nav.Link
                  eventKey="Month"
                  className={`nav-link py-2 px-4 ${key === "Month" ? "active" : ""
                    }`}
                >
                  New
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="nav-item" as="li">
                <Nav.Link
                  eventKey="Week"
                  className={`nav-link py-2 px-4 ${key === "Week" ? "active" : ""
                    }`}
                >
                  Scheduled
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="nav-item" as="li">
                <Nav.Link
                  eventKey="Day"
                  className={`nav-link py-2 px-4 ${key === "Day" ? "active" : ""
                    }`}
                >
                  Completed
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Tab.Container>
        </div>
      </div>
      {/* end::Header */}

      {/* begin::Body */}
      <div className="card-body py-0">
        {/* begin::Table */}
        <div className="table-responsive">
          <table
            className="table table-head-custom table-vertical-center"
            id="kt_advance_table_widget_1"
          >
            <thead>
              <tr className="text-left">
                <th className="pl-0" style={{ width: "20px" }}>
                  <label className="checkbox checkbox-lg checkbox-single">
                    <input type="checkbox" value="1" />
                    <span></span>
                  </label>
                </th>
                <th className="pr-0" style={{ minWidth: "250px" }}>
                  RECOMMENDATION
                </th>
                <th style={{ minWidth: "100px" }}>TARGET</th>
                <th style={{ minWidth: "100px" }}>STATE</th>
                <th style={{ minWidth: "100px" }}>ACCOUNT</th>
                <th style={{ minWidth: "100px" }}>REGION</th>
                <th style={{ minWidth: "100px" }}>SAVINGS</th>
                <th style={{ minWidth: "150px" }}>
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="pl-0">
                  <label className="checkbox checkbox-lg checkbox-single">
                    <input type="checkbox" value="1" />
                    <span></span>
                  </label>
                </td>
                <td className="pr-0">
                  <span className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">
                    Update EBS volume to GP3
                  </span>
                </td>
                <td className="pl-0">
                  <span className="text-muted font-weight-bold text-muted d-block">
                    vol-129bef0
                  </span>
                </td>
                <td>
                  <Badge pill variant="primary">
                    Primary
                </Badge>
                </td>
                <td>
                  <span className="text-muted font-weight-bold text-muted d-block">
                    Value
                  </span>
                </td>
                <td>
                  <span className="text-muted font-weight-bold text-muted d-block">
                    Region
                  </span>
                </td>
                <td>
                  <span className="text-muted font-weight-bold text-muted d-block">
                    20000
                  </span>
                </td>
                <td className="pr-0">
                  <a
                    href="#"
                    className="btn btn-icon btn-light btn-hover-primary btn-sm"
                  >
                    <span className="svg-icon svg-icon-md svg-icon-primary">
                      <SVG
                        src={toAbsoluteUrl(
                          "/media/svg/icons/General/Settings-1.svg"
                        )}
                      ></SVG>
                    </span>
                  </a>
                  <a
                    href="#"
                    className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
                  >
                    <span className="svg-icon svg-icon-md svg-icon-secondary">
                      <SVG
                        src={toAbsoluteUrl(
                          "/media/svg/icons/Communication/Write.svg"
                        )}
                      ></SVG>
                    </span>
                  </a>
                  <a
                    href="#"
                    className="btn btn-icon btn-light btn-hover-primary btn-sm"
                  >
                    <span className="svg-icon svg-icon-md svg-icon-primary">
                      <SVG
                        src={toAbsoluteUrl(
                          "/media/svg/icons/General/Trash.svg"
                        )}
                      ></SVG>
                    </span>
                  </a>
                </td>
              </tr>
              {recommendations.map((recommendation) => (
                <tr>
                  <td className="pl-0">
                    <label className="checkbox checkbox-lg checkbox-single">
                      <input type="checkbox" value="1" />
                      <span></span>
                    </label>
                  </td>
                  <td className="pr-0">
                    <span className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">
                      Update EBS volume to GP3
                  </span>
                  </td>
                  <td className="pl-0">
                    <span className="text-muted font-weight-bold text-muted d-block">
                      vol-129bef0
                  </span>
                  </td>
                  <td>
                    <Badge pill variant="primary">
                      Primary
                </Badge>
                  </td>
                  <td>
                    <span className="text-muted font-weight-bold text-muted d-block">
                      Value {recommendation.customerId}
                    </span>
                  </td>
                  <td>
                    <span className="text-muted font-weight-bold text-muted d-block">
                      Region
                  </span>
                  </td>
                  <td>
                    <span className="text-muted font-weight-bold text-muted d-block">
                      20000
                  </span>
                  </td>
                  <td className="pr-0">
                    <a
                      href="#"
                      className="btn btn-icon btn-light btn-hover-primary btn-sm"
                    >
                      <span className="svg-icon svg-icon-md svg-icon-primary">
                        <SVG
                          src={toAbsoluteUrl(
                            "/media/svg/icons/General/Settings-1.svg"
                          )}
                        ></SVG>
                      </span>
                    </a>
                    <a
                      href="#"
                      className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
                    >
                      <span className="svg-icon svg-icon-md svg-icon-secondary">
                        <SVG
                          src={toAbsoluteUrl(
                            "/media/svg/icons/Communication/Write.svg"
                          )}
                        ></SVG>
                      </span>
                    </a>
                    <a
                      href="#"
                      className="btn btn-icon btn-light btn-hover-primary btn-sm"
                    >
                      <span className="svg-icon svg-icon-md svg-icon-primary">
                        <SVG
                          src={toAbsoluteUrl(
                            "/media/svg/icons/General/Trash.svg"
                          )}
                        ></SVG>
                      </span>
                    </a>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
        {/* end::Table */}
      </div>
      {/* end::Body */}
    </div>
  );
}
