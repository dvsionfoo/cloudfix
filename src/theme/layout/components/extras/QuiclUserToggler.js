
import React from "react";

export function QuickUserToggler(props) {
  // const {name} = props;
  const name = "Test"
  const parts = name.split(' ');
  let abbvr = parts && parts[0] && parts[0].charAt(0);
  abbvr += parts && parts[1] ? parts[1].charAt(0) : '';
  return (
    <>

      <div className="topbar-item">
        <div
          className="btn btn-icon btn-hover-transparent-white d-flex align-items-center btn-lg px-md-2 w-md-auto"
          id="kt_quick_user_toggle"
          style={{textAlign: 'right'}}
        >
          <p>
            <span className="text-white opacity-70 font-size-base d-none d-md-inline mr-1" style={{fontSize: '12px', margin: 0, position: 'relative', top: '6px'}}>Welcome</span>
            <br />
            <span className="text-white opacity-90 font-weight-bolder font-size-base d-none d-md-inline mr-1">{name}</span>
          </p>
            <span className="symbol symbol-35">
            <span className="symbol-label text-white font-size-h5 font-weight-bold bg-white-o-30">{abbvr}</span>
          </span>
        </div>
      </div>
    </>
  );
}
