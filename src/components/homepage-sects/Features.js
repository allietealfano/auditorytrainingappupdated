import React from "react";

import classes from "./features.module.css";
import styles from "./sections.module.css";

function Features() {
  //This array will likely be handled by a database in the future

  const featuresArr = [
    {
      title: "Detection",
      detail:
        " In this mission, you will either be presented with a sound or silence. Although you may not hear anything, it’s not a trick! Try your best to choose the best option of what you’re presented with.",
      pic: "test-sound",
      picAlt: "description of the image for SEO",
    },
    {
      title: "Discrimination",
      detail:
        "In this mission, you will be presented with two sounds and will be asked to select whether the sounds are the same or different.",
      pic: "test-choice",
      picAlt: "description of the image for SEO",
    },
    {
      title: "Identification",
      detail:
        "In this mission, you will hear sounds of varying lengths and loudness levels. You will also hear words of varying lengths and voices and asked to identify the correct option.",
      pic: "test-identify",
      picAlt: "description of the image for SEO",
    },
  ];

  return (
    <section className={styles.section} id="section--1">
      <div className={styles.section__title}>
        <h2 className={styles.section__description}>Features</h2>
      </div>

      <div className={classes.feature__cards}>
        {featuresArr.map((feat, i) => {
          return (
            <div className={classes.feature__card} key={i}>
              <h5 className={classes.card__header}>{feat.title}</h5>
              <p className={classes.card__text}>{feat.detail}</p>
              <img
                src={require(`../../assets/images/${feat.pic}.jpg`)}
                alt={feat.picAlt}
                className={classes.card__img}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Features;
