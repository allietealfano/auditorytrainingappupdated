import { React, useRef } from "react";
import { Link } from "react-router-dom";

import classes from "./progress.module.css";

function Progress({ refSetter }) {
  const progressRef = useRef(null);
  refSetter(progressRef);
  return (
    <>
      <div className={classes.progress__container}>
        <div>
          <div className={classes.activity__progress}>&nbsp;</div>
          <div className={classes.activity__progress_FG} ref={progressRef}>
            &nbsp;
          </div>
        </div>
        <Link to={"/dashboard"}>
          <div className={classes.exit}></div>
        </Link>
      </div>
    </>
  );
}

export default Progress;
