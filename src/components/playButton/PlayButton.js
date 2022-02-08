import { useState, React } from "react";

import "./playButton.css";

function PlayButton() {
  const [isPlay, setIsPlay] = useState(true);

  const playHandler = (time) => {
    if (isPlay) {
      setTimeout(() => {
        setIsPlay((prevState) => !prevState);
      }, 1000 * time);
    }
    setIsPlay((prevState) => !prevState);
  };
  return (
    //playHandler(5) mimicks an audio that runs for 5 seconds
    <div className="button-container" onClick={() => playHandler(5)}>
      {isPlay ? (
        <div className="play-button"></div>
      ) : (
        <div className="pause-button">
          <div className="pause-half">&nbsp;</div>
          <div className="pause-half">&nbsp;</div>
        </div>
      )}
    </div>
  );
}

export default PlayButton;
