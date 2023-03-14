import React from "react";

import classes from "./mission.module.css";
import styles from "./sections.module.css";

//Purpose: Mission segment 
function Mission() {
  return (
    <>
      <section className={styles.section} id="section--2">
        <div className={classes.mission}>
          <div className={styles.section__title}>
            <h2 className={styles.section__description}>Our Mission</h2>\{" "}
          </div>
          <figure className={classes.mission__shape}>
            <img
              src={require("../../assets/images/test-founder.jpg")}
              alt="Founder"
              className={classes.story__img}
            />

            <figcaption className={classes.mission__caption}>
              Dr. Alliete Alfano
            </figcaption>
         </figure>
          
          <div className={classes.mission__text}>
            <p>
              Mission: Audition! is an auditory training application designed to
              help people who use cochlear implants train their hearing ability
              to identify and understand sounds, words, phrases, and sentences
              functionally.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Mission;
