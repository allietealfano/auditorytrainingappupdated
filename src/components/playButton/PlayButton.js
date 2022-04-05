import { useState, React, useRef } from "react";

import classes from "./playButton.module.css";

function PlayButton(props) {
  const [isPlay, setIsPlay] = useState(true);
  const audioPlayer = useRef(null);

  const playHandler = () => {
    const time = audioPlayer.current.duration;
    setIsPlay(false);
    if (isPlay) {
      audioPlayer.current.play();

      //changes play effect for the duration of the audio
      setTimeout(() => {
        setIsPlay((prevState) => !prevState);
      }, 1000 * parseFloat(time));
    }
  };

  return (
    <div className={classes.button__container} onClick={playHandler}>
      <audio className={classes.audio} ref={audioPlayer} src={props.audUrl} />
      {isPlay ? (
        <div className={`${classes.play__button}`}>&nbsp;</div>
      ) : (
        <div className={`${classes.circle}`}>&nbsp;</div>
      )}
    </div>
  );
}

export default PlayButton;
