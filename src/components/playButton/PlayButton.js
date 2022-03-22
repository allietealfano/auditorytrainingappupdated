import { useState, React, useRef } from "react";

import "./playButton.css";

function PlayButton(props) {
  const [isPlay, setIsPlay] = useState(true);
  const [throb, setThrob] = useState(false);

  const audioPlayer = useRef();

  const playHandler = () => {
    const time = document.querySelector(".audio").duration;
    setIsPlay(false);
    if (isPlay) {
      audioPlayer.current.play();
      setTimeout(() => {
        setIsPlay((prevState) => !prevState);
      }, 1000 * parseFloat(time));

      setInterval(() => {
        setThrob((prevState) => !prevState);
      }, 75);
    }
  };
  return (
    //playHandler(5) mimicks an audio that runs for 5 seconds
    <div className="button-container" onClick={playHandler}>
      <audio className="audio" ref={audioPlayer} src={props.audUrl} />
      {isPlay ? (
        <div className={`play-button `}>&nbsp;</div>
      ) : (
        <div className={`circle ${throb ? "scale" : ""}`}>&nbsp;</div>
      )}
    </div>
  );
}

export default PlayButton;
