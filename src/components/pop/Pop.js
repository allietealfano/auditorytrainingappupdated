import React from "react";

import classes from "./pop.module.css";


export function Pop(props) = () => {

  return (
    <>
      <div className={classes.container}>
        <div className={classes.pop__up}>
          <div className={classes.prompt}>
            <h3 className={classes.prompt__big}>{props.headerBig}</h3>
            {props.headerSmall && (
              <p className={classes.prompt__small}> {props.headerSmall}</p>
            )}
          </div>

          {props.mid ?? ""}

          <div className={classes.choice__container}>
            {props.sub && <p className={classes.prompt__small}> {props.sub}</p>}
            <div className={classes.choices}>
              <button
                onClick={function (event) {
                  props.option1Func();
                }}
                className="btn btn__blue"
              >
                {props.option1}
              </button>
              {props.option2 && (
                <button
                  onClick={function (event) {
                    props.option2Func();
                  }}
                  className="btn btn__blue"
                >
                  {props.option2}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Pop;
