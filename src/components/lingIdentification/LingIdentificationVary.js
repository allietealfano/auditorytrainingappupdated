import { React, useState, useRef, useEffect } from "react";


import useFetch from "../custHooks/useFetch";
import Progress from "../progressBar/Progress";
import PlayButton from "../playButton/PlayButton";
import Completed from "../Completed/Completed";


import classes from "./lingIdentification.module.css";


function LingIdentificationVary(props) {
  const [choice, setChoice] = useState(null);
  const [currentScores, setCurrentScores] = useState([]);
  const [pop, setPop] = useState(false);
  const [soundS, setSound] = useState(true);
  const [[allActivitiesObj], isPending, err] = useFetch("allActivitiesObj");
   
useEffect(() => {
    setCurrentScores(
      allActivitiesObj?.lingActivityidentification?.completions.map((comp) => comp)
    );
  }, [allActivitiesObj]);

  const cardTrueRef = useRef(null);
  const cardFalseRef = useRef(null);
  let progressFGRef;
  const refSetter = (ref) => (progressFGRef = ref);

  let score = props.score;
  let lingSound = null;
  var sound ="https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2Fling%2Fshort_a.mp3?alt=media&token=e6ca1560-0398-44f1-9867-a35772609224;"
  var value1 = 0;
  var value2 =0;
  var correctvalue = 0;
  var rightsound = "https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2Fchoicesound%2Frightanswer-95219.mp3?alt=media&token=d9168b1b-904c-4af8-8a87-89e0bcbdc582;"
  var wrongsound = "https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2Fchoicesound%2Fwronganswer-37702.mp3?alt=media&token=ade043bd-c027-4fd6-94ce-3c4c4133182b;"


  //randomly set one of the ling sounds from the database passed as an array from the parent component
  
   
  
 function isSoundEqual(a, b) {
  if (a === b) return true;
  return false;
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

		 window.value1=Math.floor(Math.random() * 3) + 1;
		 window.value2=Math.floor(Math.random() * 3) + 1;
		 while(window.value1===window.value2)
	     {
			 window.value2=Math.floor(Math.random() * 3) + 1;
		 }
		 window.num=Math.random()<0.5?0:1
		  if(window.num===0)
	 {
		 window.correctvalue=window.value1;
		
	 }
	 else{
	 if(window.num===1)
	 {
		 window.correctvalue=window.value2;
	 }
	 }
		
	  setSound(false);
  }
	if(!soundS) return;
 }
 

  const checkHandler = async () => {
    const card = choice ? cardTrueRef : cardFalseRef;
	

	
    //No card was selected before the check

    if (choice === null) return;
	

		
	

  if ((choice && window.value1===window.correctvalue)  || (choice === false && window.value2===window.correctvalue)) {
      score += 1;
      card.current.style.border = "8px green solid";
	   playRightSound(rightsound);
    }
    if ((choice && window.value2===window.correctvalue) || (choice === false && window.value1===window.correctvalue)) {
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
const playSound = (sound) => {

  const audioContext = new AudioContext();   
  audioContext.resume();

  const audioClip = new Audio(sound);

  const audioClipDuration = 1000;
  audioClip.loop = true;
 setTimeout(() => audioClip.loop = false, (audioClipDuration * (window.correctvalue-1)));
  audioClip.play();
}


  
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
             <button className={classes.btn_push_blue}
			  
                onClick={() => playSound(sound)}
              >
			   🔊
              </button>            
              <div className={classes.select}>
                <div
                  className={classes.card}
                  ref={cardTrueRef}
                  onClick={() => choiceHandler(true)}
                >
                  <div className={classes.card__mid}>
                    <h1>🔊 </h1>
                    <p> {window.value1} 𝖆 Sound</p>
                  </div>
                </div>
                <div
                  className={classes.card}
                  ref={cardFalseRef}
                  onClick={() => choiceHandler(false)}
                >
                  <div className={classes.card__mid}>
                    <h1>🔊</h1>
                    <p>{window.value2} 𝖆 Sound</p>
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

export default LingIdentificationVary;