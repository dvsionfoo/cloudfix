import React from "react";
import { Link, useLocation} from "react-router-dom";

import {toAbsoluteUrl} from "./../helpers";

export function Logo() {
    const location = useLocation();
    return (
    <div className="header-logo">
        <Link to={location.pathname}>
        <img
            className="d-block"
            src={toAbsoluteUrl("/media/cloud_fix_logo.svg")}
            alt="Third slide"
            width="180"
        />
        </Link>
    </div>
    );
}
