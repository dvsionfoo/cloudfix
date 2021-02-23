import React from "react";
import SVG from "react-inlinesvg";
import {toAbsoluteUrl} from "./../helpers";

export function Instructions({ className }) {
  return (
    <>
      <div className={`card card-custom ${className}`} style={{width: '600px', margin: 'auto'}}>
        {/* Header */}
        <div className="card-header border-0">
          <h1 className="card-title align-items-start flex-column">
          <span className="card-label font-weight-bolder text-dark">
            Instructions
          </span>
          <span className="text-muted mt-3 font-weight-bold font-size-sm">
            Steps to follow
          </span>
          </h1>
        </div>

        {/* Body */}
        <div className="card-body pt-0">
          <div className="d-flex align-items-center mb-9 bg-light-warning rounded p-5">
            <span className="svg-icon svg-icon-warning mr-5 svg-icon-lg">
              <SVG
                src={toAbsoluteUrl("/media/svg/icons/Home/Library.svg")}
              ></SVG>
            </span>

            <div className="d-flex flex-column flex-grow-1 mr-2">
              <p className="font-weight-bold text-dark-75 text-hover-primary font-size-lg mb-1">
                Download the instructions file
              </p>
              <p className="text-muted font-weight-bold">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
            </div>

            
          </div>

          <div className="d-flex align-items-center bg-light-success rounded p-5 mb-9">
            <span className="svg-icon svg-icon-success mr-5 svg-icon-lg">
              <SVG
                src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}
              ></SVG>
            </span>
            <div className="d-flex flex-column flex-grow-1 mr-2">
                <p className="font-weight-bold text-dark-75 text-hover-primary font-size-lg mb-1">
                Lorem ipsum dolor sit amet
              </p>
              <p className="text-muted font-weight-bold">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
            </div>

            
          </div>

          <div className="d-flex align-items-center bg-light-danger rounded p-5 mb-9">
            <span className="svg-icon svg-icon-danger mr-5 svg-icon-lg">
              <SVG
                src={toAbsoluteUrl(
                  "/media/svg/icons/Communication/Group-chat.svg"
                )}
              ></SVG>
            </span>

            <div className="d-flex flex-column flex-grow-1 mr-2">
            <p className="font-weight-bold text-dark-75 text-hover-primary font-size-lg mb-1">
                Lorem ipsum dolor sit amet
              </p>
              <p className="text-muted font-weight-bold">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
            
            </div>
          </div>

          <div className="d-flex align-items-center bg-light-info rounded p-5">
            <span className="svg-icon svg-icon-info mr-5 svg-icon-lg">
              <SVG
                src={toAbsoluteUrl("/media/svg/icons/General/Attachment2.svg")}
              ></SVG>
            </span>

            <div className="d-flex flex-column flex-grow-1 mr-2">
            <p className="font-weight-bold text-dark-75 text-hover-primary font-size-lg mb-1">
                Enter the ARN number
              </p>
              <p className="text-muted font-weight-bold">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
            
            </div>

            
          </div>
        </div>
      </div>
    </>
  );
}
