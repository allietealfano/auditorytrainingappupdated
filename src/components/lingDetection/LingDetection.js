import { React, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import { doc, getDoc, updateDoc } from "firebase/firestore";

import { db } from "../../firebase-config";

import Progress from "../progressBar/Progress";
import Pop from "../pop/Pop";
import PlayButton from "../playButton/PlayButton";

import classes from "./lingDetection.module.css";
import styles from "../card/card.module.css";

function LingDetection(props) {
  const [choice, setChoice] = useState(null);
  const [pop, setPop] = useState(false);
  const [currentScores, setCurrentScores] = useState([]);

  const user = `users/${localStorage.getItem("user")}`;

  const cardTrueRef = useRef(null);
  const cardFalseRef = useRef(null);
  let progressFGRef;
  const refSetter = (ref) => (progressFGRef = ref);

  let score = props.score;
  let sound = props.sound;
  let lingSound = null;

  useEffect(() => {
    const getCompletions = async function () {
      const docRef = doc(db, "users", localStorage.getItem("user"));
      const docSnap = await getDoc(docRef);

      if (docSnap.exists())
        setCurrentScores(
          docSnap.data().allActivitiesObj[props.objKey].completions
        );
    };

    getCompletions();
  }, [props.objKey]);

  //randomly set one of the ling sounds from the databased passed an array from the parent component
  if (props.arr[0][1]) lingSound = props.arr[Math.floor(Math.random() * 2)][1];

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
      const UId = doc(db, user);
      updateDoc(UId, {
        [`allActivitiesObj.${props.objKey}.completions`]: [
          { score: score / 10, date: new Date().toISOString() },
          ...currentScores,
        ],
      });

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
        <Pop
          headerBig={"You have completed your mission!"}
          headerSmall={"Would you like to try again?"}
          option1={"Retry"}
          option1Func={() => window.location.reload(false)}
          option2={
            <Link to="/dashboard">
              <p>Activities</p>
            </Link>
          }
          mid={
            <div>
              <h1>🏆</h1>
              <h2 style={{ color: "rgb(93, 173, 226)" }}>{score}/10</h2>
            </div>
          }
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
                    : "https://firebasestorage.googleapis.com/v0/b/mission-audition.appspot.com/o/audio%2Fno_sound%2Fno_sound.mp3?alt=media&token=450bfb7d-f051-4633-8093-8fb5d8921596"
                }
              />

              <div className={classes.select}>
                <div
                  className={styles.card}
                  ref={cardTrueRef}
                  onClick={() => choiceHandler(true)}
                >
                  <div className={styles.card__mid}>
                    <h1>🔊</h1>
                    <p>Sound</p>
                  </div>
                </div>
                <div
                  className={styles.card}
                  ref={cardFalseRef}
                  onClick={() => choiceHandler(false)}
                >
                  <div className={styles.card__mid}>
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
