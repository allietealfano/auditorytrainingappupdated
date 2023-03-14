import { React, useRef } from "react";
import { Link } from "react-router-dom";

import classes from "./progress.module.css";

//Progress bar for activities
function Progress({ refSetter }) {
  //Initialize variables
  const progressRef = useRef(null);
  refSetter(progressRef);

  return (
    <>
      <div className={classes.progress__container}>
        <div>
          {/* Activity progression */}
          <div className={classes.activity__progress}>&nbsp;</div>
          <div className={classes.activity__progress_FG} ref={progressRef}>
            &nbsp;
          </div>
        </div>
        {/* Go to dashboard */}
        <Link to={"/dashboard"}>
          <div className={classes.exit}></div>
        </Link>
      </div>
    </>
  );
}

export default Progress;
