import React from "react";

import classes from "./userMission.module.css";
import styles from "./sections.module.css";

//Purpose: Display user mission in the section
function UserMission() {
  //This array will likely be handled by a database

  const missionssArr = [
    {
      title: "Discern",
      detail:
        "You will be asked to listen, detect, discriminate, identify, and comprehend different sounds, words, phrases, and sentences. ",
      pic: "test-magnify",
      picAlt: "description of the image for SEO",
    },
    {
      title: "Master",
      detail:
        "Your mission is to travel through and master each level of auditory training.",
      pic: "test-step",
      picAlt: "description of the image for SEO",
    },
    {
      title: "Fun",
      detail: "Above all, your main mission is to have fun!",
      pic: "test-fun",
      picAlt: "description of the image for SEO",
    },
  ];

  return (
    <section className={styles.section} id="section--1">
      <div className={styles.section__title}>
        <h2 className={styles.section__description}>Your Mission</h2>
      </div>

      {/* Display the user missions in the home page */}
      <div className={classes.mission__cards}>
        {missionssArr.map((mission, i) => {
          return (
            <div
              className={`${classes.mission__card}  ${
                i % 2 === 0 ? classes.row__reverse : ""
              }`}
              key={i}
            >
              <div className={classes.mission__card__info}>
                <h5 className={classes.mission__card__header}>
                  {mission.title}
                </h5>
                <p className={classes.mission__card__text}>{mission.detail}</p>
              </div>
              <img
                src={require(`../../assets/images/${mission.pic}.jpg`)}
                alt={mission.picAlt}
                className={classes.mission__card__img}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default UserMission;
