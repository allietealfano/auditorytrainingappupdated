import React from "react";
import { Link } from "react-router-dom";

import "./progress.css";

function Progress() {
  return (
    <>
      <div className="progress__container">
        <div>
          <div className="activity__progress">&nbsp;</div>
          <div className="activity__progress-FG">&nbsp;</div>
        </div>
        <Link to={"/dashboard"}>
          <div className="exit"></div>
        </Link>
      </div>
    </>
  );
}

export default Progress;
