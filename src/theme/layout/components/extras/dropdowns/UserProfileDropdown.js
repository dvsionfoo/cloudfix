/* eslint-disable no-restricted-imports */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

export function UserProfileDropdown() {
  return (
    <Dropdown drop="down" alignRight>
      <Dropdown.Toggle
        id="dropdown-toggle-user-profile"
      >
        <div
          className={
            "btn btn-icon btn-hover-transparent-white d-flex align-items-center btn-lg px-md-2 w-md-auto"
          }
        >
          <span className="text-white opacity-70 font-weight-bold font-size-base d-none d-md-inline mr-1">
          Welcome back,
          </span>{" "}
          <span className="text-white opacity-90 font-weight-bolder font-size-base d-none d-md-inline mr-4">
          Badri Varadarajan
          </span>
          <span className="symbol symbol-35">
            <span className="symbol-label text-white font-size-h5 font-weight-bold bg-white-o-30">
              B
            </span>
          </span>
        </div>
      </Dropdown.Toggle>
         </Dropdown>
  );
}
