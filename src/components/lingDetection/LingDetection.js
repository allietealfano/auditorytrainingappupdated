import { React, useState, useRef, useEffect } from "react";

import useFetch from "../custHooks/useFetch";
import Progress from "../progressBar/Progress";
import PlayButton from "../playButton/PlayButton";
import Completed from "../Completed/Completed";

import classes from "./lingDetection.module.css";

function LingDetection(props) {
  const [choice, setChoice] = useState(null);
  const [currentScores, setCurrentScores] = useState([]);
  const [pop, setPop] = useState(false);

  const [[allActivitiesObj], isPending, err] = useFetch("allActivitiesObj");

  useEffect(() => {
    setCurrentScores(
      allActivitiesObj?.lingActivitydetection?.completions.map((comp) => comp)
    );
  }, [allActivitiesObj]);

  const cardTrueRef = useRef(null);
  const cardFalseRef = useRef(null);
  let progressFGRef;
  const refSetter = (ref) => (progressFGRef = ref);

  let score = props.score;
  let sound = props.sound;
  let lingSound = null;

  //randomly set one of the ling sounds from the database passed as an array from the parent component
  if (props.arr[0][1]) lingSound = props.arr[Math.floor(Math.random() * 4)][1];

  const checkHandler = async () => {
    const card = choice ? cardTrueRef : cardFalseRef;

    //No card was selected before the check
    if (choice === null) return;

    if ((choice && sound) || (choice === false && !sound)) {
      score += 1;
      card.current.style.border = "8px green solid";
    }
    if ((choice && !sound) || (choice === false && sound)) {
      card.current.style.border = "8px red solid";
    }

    progressFGRef.current.style.width = `${props.prog + 10}%`;
    setTimeout(() => {
      cardTrueRef.current.style.border = "0";
      cardFalseRef.current.style.border = "0";
    }, 300);

    props.progressHandler(props.prog + 10, score, sound);

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
         headerBig={"You have completed your mission!"}
        headerSmall={"Would you like to try again?"}
        option1={"Retry"}
        option1Func={<button type="button" onClick={() => ()} >
  <span>Reload</span>
</button>}
        option2={ "Back to Dashboard"
        }
        option2Func={() => ""}
        mid={
          <div>
            <h1>🏆</h1>
            <h2 style={{ color: "rgb(93, 173, 226)" }}>{props.score}%</h2>
          </div>
        }
          objKey={props.objKey}
          currentScores={currentScores}
          score={score * 10}
        />
      )}
      <div className={classes.bg__container}>
        <section className={classes.activity}>
          <Progress refSetter={refSetter} />
          <div className={classes.activity__items}>
            <div className={classes.opts}>
              <PlayButton
                audUrl={
                  sound
                    ? lingSound
                    : "https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2Fno_sound%2Fno_sound.mp3?alt=media&token=480a3b00-a8f0-4277-8d47-751dbf96d3b6"
                }
              />

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
