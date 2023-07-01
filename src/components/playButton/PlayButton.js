import { useState, React, useRef } from "react";

import classes from "./playButton.module.css";

//Purpose: play button for activity page
function PlayButton(props) {

  //State variables
  const [isPlay, setIsPlay] = useState(true);
  const audioPlayer = useRef(null);

  //Play button - plays audio
  const playHandler = () => {
    const time = audioPlayer.current.duration;
    setIsPlay(false);
    
    //Play active - play audio
    if (isPlay) {
      audioPlayer.current.play();

      //changes play effect for the duration of the audio
      setTimeout(() => {
        setIsPlay((prevState) => !prevState);
      }, 1000 * parseFloat(time));
    }
  };


  return (
    //Play sound button
    <button className={classes.button} onClick={playHandler}>
      <audio className={classes.audio} ref={audioPlayer} src={props.audUrl} />
      
      {/* Change audio depending if play is true/false */}
      {isPlay ? (
        <div className={`${classes.play__button}`}>&nbsp;</div>
      ) : (
        <div className={`${classes.circle}`}>&nbsp;</div>
      )}
      
    </button>
  );
}

export default PlayButton;
