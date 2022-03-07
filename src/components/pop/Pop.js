import React, { useState, useEffect } from "react";

import "./pop.css";

function Pop(props) {
  return (
    <>
      <div className="container">
        <div className="pop-up">
          <div className="prompt">
            <h3 className="prompt__big">{props.headerBig}</h3>
            {props.headerSmall && (
              <p className="prompt__small"> {props.headerSmall}</p>
            )}
          </div>

          {props.mid}

          <div className="choice-container">
            {props.sub && <p className="prompt__small"> {props.sub}</p>}
            <div className="choices">
              <button
                onClick={function (event) {
                  props.option1Func();
                }}
                className="btn-blue"
              >
                {props.option1}
              </button>
              {props.option2 && (
                <button
                  onClick={function (event) {
                    props.option2Func();
                  }}
                  className="btn-blue"
                >
                  {props.option2}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      ) : ( ""
    </>
  );
}

export default Pop;
