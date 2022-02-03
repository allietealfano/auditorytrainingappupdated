import React from "react";

import "./pop.css";

import PlayButton from "../playButton/PlayButton";

function Pop() {
  return (
    <div className="container">
      <div className="pop-up">
        <div className="prompt">
          <h3 className="prompt__big">
            Before we start, let's perform a sound test!
          </h3>
          <p className="prompt__small">Press play when you are ready.</p>
        </div>

        <PlayButton />

        <div className="choice-container">
          <p className="prompt__small">Did you hear a sound?</p>
          <div className="choices">
            <button className="btn">Yes</button>
            <button className="btn">No</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pop;
