import { React, useState } from "react";
import { Link } from "react-router-dom";

import Progress from "../progressBar/Progress";
import Pop from "../pop/Pop";
import PlayButton from "../playButton/PlayButton";

import "./lingDetection.css";

function LingDetection(props) {
  let score = props.score;
  let sound = props.sound;
  let lingSound = null;

  const [choice, setChoice] = useState(null);
  const [pop, setPop] = useState(false);

  if (props.arr[0][1]) lingSound = props.arr[Math.floor(Math.random() * 2)][1];

  const checkHandler = async () => {
    if (choice === null) return;

    if ((choice && sound) || (choice === false && !sound)) {
      score += 1;
      document.querySelector(`.card__${choice}`).style.border =
        "8px green solid";
    }

    if ((choice && !sound) || (choice === false && sound)) {
      document.querySelector(`.card__${choice}`).style.border = "8px red solid";
    }

    document.querySelector(".activity__progress-FG").style.width = `${
      props.prog + 10
    }%`;
    setTimeout(() => {
      document.querySelector(".card__true").style.border = "0";
      document.querySelector(".card__false").style.border = "0";
    }, 300);

    props.progressHandler(props.prog + 10, score, sound);

    setChoice(null);

    if (props.prog + 10 === 100) {
      setPop(true);
      return;
    }

    if (props.prog + 10 === 100) {
      setPop(true);
      return;
    }
  };

  const choiceHandler = (choice) => {
    setChoice(choice);
    document.querySelector(`.card__${choice}`).style.border =
      "4px  rgba(93, 173, 226, 0.5) solid";
    document.querySelector(`.card__${!choice}`).style.border = "0";
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
      <div className="bg-container">
        <section className="activity">
          <Progress />
          <div className="activity__items">
            <div className="opts">
              <PlayButton
                audUrl={
                  sound
                    ? lingSound
                    : "https://firebasestorage.googleapis.com/v0/b/mission-audition.appspot.com/o/audio%2Fno_sound%2Fno_sound.mp3?alt=media&token=450bfb7d-f051-4633-8093-8fb5d8921596"
                }
              />

              <div className="select">
                <div
                  className="card card__true"
                  onClick={() => choiceHandler(true)}
                >
                  <div className="card__mid">
                    <h1>🔊</h1>
                    <p>Sound</p>
                  </div>
                </div>
                <div
                  className="card card__false"
                  onClick={() => choiceHandler(false)}
                >
                  <div className="card__mid">
                    <h1>🔈</h1>
                    <p>No Sound</p>
                  </div>
                </div>
              </div>
              <button
                className={`${choice !== null ? "btn-blue" : "btn"}`}
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
