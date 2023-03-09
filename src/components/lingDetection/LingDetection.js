import { React, useState, useRef, useEffect } from "react";

import useFetch from "../custHooks/useFetch";
import Progress from "../progressBar/Progress";
import PlayButton from "../playButton/PlayButton";
import Completed from "../Completed/Completed";

import classes from "./lingDetection.module.css";

//Purpose: Game page for LingDetection
function LingDetection(props) {

  //Set up the states involved
  const [choice, setChoice] = useState(null);
  const [currentScores, setCurrentScores] = useState([]);
  const [pop, setPop] = useState(false);

  //Fetch activites from db
  const [[allActivitiesObj], isPending, err] = useFetch("allActivitiesObj");

  //Completions in the db is empty - not iterable because empty array.
  useEffect(() => {
    //Update current scores with most recent
    setCurrentScores(
      allActivitiesObj?.lingActivitydetection?.completions.map((comp) => comp)
    );
  }, [allActivitiesObj]);

  //Initialize cards used in activity
  const cardTrueRef = useRef(null);
  const cardFalseRef = useRef(null);
  let progressFGRef;
  const refSetter = (ref) => (progressFGRef = ref);

  //Set up score and sound from props
  let score = props.score;
  let sound = props.sound;
  let lingSound = null;

  //randomly set one of the ling sounds from the database passed as an array from the parent component
  if (props.arr[0][1]) lingSound = props.arr[Math.floor(Math.random() * 4)][1];

  //Checks if the user is correct
  const checkHandler = async () => {
    const card = choice ? cardTrueRef : cardFalseRef;

    //No card was selected before the check
    if (choice === null) return;

    //Correct answer
    if ((choice && sound) || (choice === false && !sound)) {
      score += 1;
      card.current.style.border = "8px green solid";
    }
    //False answer
    if ((choice && !sound) || (choice === false && sound)) {
      card.current.style.border = "8px red solid";
    }

    //Update progress bar visually
    progressFGRef.current.style.width = `${props.prog + 10}%`;
    
    //Apply time out between questions
    setTimeout(() => {
      cardTrueRef.current.style.border = "0";
      cardFalseRef.current.style.border = "0";
    }, 300);

    //progressHandler updating
    props.progressHandler(props.prog + 10, score, sound);

    //Reset choice
    setChoice(null);

    //Finish at 10 tests!!
    if (props.prog + 10 === 100) {
      setPop(true); //Show popup
      return;
    }
  };

  //Highlight user choice
  const choiceHandler = (choice) => {
    setChoice(choice);
    const card = choice ? cardTrueRef : cardFalseRef;
    const otherCard = choice ? cardFalseRef : cardTrueRef;

    card.current.style.border = "4px  rgba(93, 173, 226, 0.5) solid";
    otherCard.current.style.border = "0";
  };

  return (
    <>
      {/* User is complete - pop is true - show completed modal */}
      {pop && (
        <Completed
          objKey={props.objKey}
          currentScores={currentScores}
          score={score * 10}
        />
      )}

      {/* Otherwise, show game */}
      <div className={classes.bg__container}>
        <section className={classes.activity}>
          {/* Progress bar at the top */}
          <Progress refSetter={refSetter} />
          <div className={classes.activity__items}>
            <div className={classes.opts}>
              {/* Play audio button */}
              <PlayButton
                audUrl={
                  sound
                    ? lingSound
                    : "https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2Fno_sound%2Fno_sound.mp3?alt=media&token=480a3b00-a8f0-4277-8d47-751dbf96d3b6"
                }
              />

              {/* Display for whether there was sound or not */}
              <div className={classes.select}>
                <div
                  className={classes.card}
                  ref={cardTrueRef}
                  onClick={() => choiceHandler(true)}
                >
                  <div className={classes.card__mid}>
                    <h1>🔊</h1>
                    <p>Sound</p>
                  </div>
                </div>
                <div
                  className={classes.card}
                  ref={cardFalseRef}
                  onClick={() => choiceHandler(false)}
                >
                  <div className={classes.card__mid}>
                    <h1>🔈</h1>
                    <p>No Sound</p>
                  </div>
                </div>
              </div>

              {/* Check button */}
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
    </>
  );
}

export default LingDetection;
