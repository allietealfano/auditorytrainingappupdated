import { React, useState, useRef, useEffect } from "react";

import _ from "lodash"

import useFetch from "../custHooks/useFetch";
import Progress from "../progressBar/Progress";
import PlayButton from "../playButton/PlayButton";
import Completed from "../Completed/Completed";


import classes from "./lingDiscrimation.module.css";

function LingDiscrimination(props) {
  const [choice, setChoice] = useState(null);
  const [currentScores, setCurrentScores] = useState([]);
  const [pop, setPop] = useState(false);
  const [soundS, setSound] = useState(false);
  const [[allActivitiesObj], isPending, err] = useFetch("allActivitiesObj");
   
  useEffect(() => {
    setCurrentScores(
      allActivitiesObj?.lingActivitydiscrimination?.completions.map((comp) => comp)
    );
  }, [allActivitiesObj]);

  const cardTrueRef = useRef(null);
  const cardFalseRef = useRef(null);
  let progressFGRef;
  const refSetter = (ref) => (progressFGRef = ref);

  let score = props.score;
  let sound = props.sound;
  let lingSound = null;
  var sound1;
  var sound2;
  var rightsound = "https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2Fchoicesound%2Frightanswer-95219.mp3?alt=media&token=d9168b1b-904c-4af8-8a87-89e0bcbdc582;"
  var wrongsound = "https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2Fchoicesound%2Fwronganswer-37702.mp3?alt=media&token=ade043bd-c027-4fd6-94ce-3c4c4133182b;"
 function isSoundEqual(a, b) {
  if (a === b) return true;
  return false;
}

  
  const playSound = (sound) => {

  const audioContext = new AudioContext();   
  audioContext.resume();

  const audioClip = new Audio(sound);

  const audioClipDuration = 1000;
  audioClip.loop = true;
 setTimeout(() => audioClip.loop = false, (audioClipDuration * (1-1)));
  audioClip.play();
}

  const playRightSound = (rightsound) => {

  const audioContext = new AudioContext();   
  audioContext.resume();

  const audioClip = new Audio(rightsound);

  const audioClipDuration = 1000;
  audioClip.loop = true;
 setTimeout(() => audioClip.loop = false, (audioClipDuration * (1-1)));
  audioClip.play();
}
 const playwrongSound = (wrongsound) => {

  const audioContext = new AudioContext();   
  audioContext.resume();

  const audioClip = new Audio(wrongsound);

  const audioClipDuration = 1000;
  audioClip.loop = true;
 setTimeout(() => audioClip.loop = false, (audioClipDuration * (1-1)));
  audioClip.play();
}
  function soundHandler () {

  if (soundS){
		if (props.arr[0][1])  sound1 = props.arr[Math.floor(Math.random() * 4)][1];
		window.sound1=sound1;
		if (props.arr[0][1])  sound2 = props.arr[Math.floor(Math.random() * 4)][1];
		window.sound2=sound2;
		setSound(false);
	}
	if(!soundS) return;
 }
 


  const checkHandler = async () => {
    const card = choice ? cardTrueRef : cardFalseRef;
	

	
    //No card was selected before the check

    if (choice === null) return;
	

		
		

    if ((choice && isSoundEqual(window.sound1,window.sound2))  || (choice === false && !isSoundEqual(window.sound1,window.sound2))) {
      score += 1;
      card.current.style.border = "8px green solid";
	   playRightSound(rightsound);
    }
    if ((choice && !isSoundEqual(window.sound1,window.sound2)) || (choice === false &&  isSoundEqual(window.sound1,window.sound2))) {
      card.current.style.border = "8px red solid";
	   playwrongSound(wrongsound);
    }

    progressFGRef.current.style.width = `${props.prog + 10}%`;
    setTimeout(() => {
      cardTrueRef.current.style.border = "0";
      cardFalseRef.current.style.border = "0";
    }, 300);

    props.progressHandler(props.prog + 10, score, sound);
    setSound(true);
    setChoice(null);
    //Finish at 10 tests
    if (props.prog + 10 === 100) {
      setPop(true);
	  
      return;
    }
  };

  const choiceHandler = (choice) => {
	  
    setChoice(choice);
    const card = choice ? cardTrueRef : cardFalseRef;
    const otherCard = choice ? cardFalseRef : cardTrueRef;

    card.current.style.border = "4px  rgba(93, 173, 226, 0.5) solid";
    otherCard.current.style.border = "0";
  };


  
  return (
  
  
    <>
	   {pop && (
        <Completed
          objKey={props.objKey}
          currentScores={currentScores}
          score={score * 10}
        />
      )}
	{soundS && (
	   soundHandler()
	   )
	}
	
	{!soundS &&(
	
      
      <div className={classes.bg__container}>
        <section className={classes.activity}>
          <Progress refSetter={refSetter} />
          <div className={classes.activity__items}>
            <div className={classes.opts}>	
		
			  <p>
			   <button className={classes.btn_push_blue}
			  
                onClick={() => playSound(window.sound1)}
              >
			   🔊
              </button>
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;				 
			   <button className={classes.btn_push_blue}
			  
                onClick={() => playSound(window.sound2)}
              >
			   🔊
              </button>  
			  </p>

              <div className={classes.select}>
                <div
                  className={classes.card}
                  ref={cardTrueRef}
                  onClick={() => choiceHandler(true)}
                >
                  <div className={classes.card__mid}>
                    <h1>🔊</h1>
                    <p> same Sound</p>
                  </div>
                </div>
                <div
                  className={classes.card}
                  ref={cardFalseRef}
                  onClick={() => choiceHandler(false)}
                >
                  <div className={classes.card__mid}>
                    <h1>🔊</h1>
                    <p>diff Sound</p>
                  </div>
                </div>
              </div>
              <button
                className={`${choice !== null ? "btn btn__blue" : "btn"}`}
                onClick={checkHandler}
              >
                Check
              </button>
            </div>
          </div>
        </section>
      </div>
	  )
	}
    </>
	
  );
}

export default LingDiscrimination;

