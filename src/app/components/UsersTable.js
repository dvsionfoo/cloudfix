/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "./../helpers";

export function UsersTable({ className }) {
  return (
    <div className={`card card-custom ${className}`}>
      {/* begin::Header */}
      <div className="card-header border-0 py-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label font-weight-bolder text-dark">
            Users
          </span>
          <span className="text-muted mt-3 font-weight-bold font-size-sm">
            Manage your users
          </span>
        </h3>
        <div className="card-toolbar">
          <a
            href="#"
            className="btn btn-success font-weight-bolder font-size-sm"
          >
            <span className="svg-icon svg-icon-md svg-icon-white">
              <SVG
                src={toAbsoluteUrl(
                  "/media/svg/icons/Communication/Add-user.svg"
                )}
                className="h-50 align-self-center"
              ></SVG>
            </span>
            Add New User
          </a>
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
                <th style={{ minWidth: "100px" }}></th>
                <th style={{ minWidth: "250px" }}>Name &amp; Email</th>
                <th style={{ minWidth: "150px" }}>Role</th>
                <th className="pr-0 text-right" style={{ minWidth: "150px" }}>
                  action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="pr-0">
                  <div className="symbol symbol-50 symbol-light mt-1">
                    <span className="symbol-label">
                      <SVG
                        src={toAbsoluteUrl("/media/svg/avatars/001-boy.svg")}
                        className="h-75 align-self-end"
                      ></SVG>
                    </span>
                  </div>
                </td>
                <td className="pl-0">
                  <a
                    href="#"
                    className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg"
                  >
                    Brad Simmons
                  </a>
                  <span className="text-muted font-weight-bold text-muted d-block">
                    email@domain.com
                  </span>
                </td>
                <td>
                  <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                    Admin
                  </span>
                  <span className="text-muted font-weight-bold">
                    <b>Since</b> March 10, 2020
                  </span>
                </td>
                <td className="pr-0 text-right">
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
                    <span className="svg-icon svg-icon-md svg-icon-primary">
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
              <tr>
                <td className="pr-0">
                  <div className="symbol symbol-50 symbol-light mt-1">
                    <span className="symbol-label">
                      <SVG
                        src={toAbsoluteUrl("/media/svg/avatars/018-girl-9.svg")}
                        className="h-75 align-self-end"
                      ></SVG>
                    </span>
                  </div>
                </td>
                <td className="pl-0">
                  <a
                    href="#"
                    className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg"
                  >
                    Jessie Clarcson
                  </a>
                  <span className="text-muted font-weight-bold text-muted d-block">
                  email@domain.com
                  </span>
                </td>
                <td>
                  <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                    User
                  </span>
                  <span className="text-muted font-weight-bold">
                    <b>Since</b> April 10, 2020
                  </span>
                </td>
                <td className="pr-0 text-right">
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
                    <span className="svg-icon svg-icon-md svg-icon-primary">
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
              <tr>
                <td className="pr-0">
                  <div className="symbol symbol-50 symbol-lightv mt-1">
                    <span className="symbol-label">
                      <SVG
                        src={toAbsoluteUrl(
                          "/media/svg/avatars/047-girl-25.svg"
                        )}
                        className="h-75 align-self-end"
                      ></SVG>
                    </span>
                  </div>
                </td>
                <td className="pl-0">
                  <a
                    href="#"
                    className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg"
                  >
                    Lebron Wayde
                  </a>
                  <span className="text-muted font-weight-bold text-muted d-block">
                  email@domain.com
                  </span>
                </td>
                <td>
                  <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                    RoadGee
                  </span>
                  <span className="text-muted font-weight-bold">
                    <b>Since</b> June, 1999
                  </span>
                </td>
                <td className="pr-0 text-right">
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
                    <span className="svg-icon svg-icon-md svg-icon-primary">
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
              <tr>
                <td className="pr-0">
                  <div className="symbol symbol-50 symbol-light  mt-1">
                    <span className="symbol-label">
                      <SVG
                        src={toAbsoluteUrl("/media/svg/avatars/014-girl-7.svg")}
                        className="h-75 align-self-end"
                      ></SVG>
                    </span>
                  </div>
                </td>
                <td className="pl-0">
                  <a
                    href="#"
                    className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg"
                  >
                    Natali Trump
                  </a>
                  <span className="text-muted font-weight-bold text-muted d-block">
                  email@domain.com
                  </span>
                </td>
                <td>
                  <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                    Manager
                  </span>
                  <span className="text-muted font-weight-bold">Since 1990</span>
                </td>
                <td className="pr-0 text-right">
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
                    <span className="svg-icon svg-icon-md svg-icon-primary">
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
            </tbody>
          </table>
        </div>
        {/* end::Table */}
      </div>
      {/* end::Body */}
    </div>
  );
}
