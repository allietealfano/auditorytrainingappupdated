import { React, useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { updateDoc, getDoc, doc } from "firebase/firestore";

import { db } from "../../firebase-config";
import AuthContext from "../store/auth-context";
import useFetch from "../custHooks/useFetch";

import classes from "./act.module.css";

/*Actual Activity being called in Activities.js/ActivityPage.js */
function Activity(props) {

  //fetching user's latest activities from db - check db schema
  const [[userData], isPending, err] = useFetch("latestActivities");

  //user = current fb user logged in
  const user = useContext(AuthContext).fbUser;

  //key = dot annotation to access correct info within user info
  const key = `${props.link}`.replaceAll("/", "");

  //method to set the latest activity performed by the user.
  const setLatest = () => {
    const UId = doc(db, user);

    //if activity was already the latest activity, only update its lastVisited time
    if (userData[0] && props.link === userData[0].link) {
      updateDoc(UId, {
        [`allActivitiesObj.${key}.lastVisited`]: new Date().toISOString(),
      });
      return;
    }

    //New latest activity
    const newUserData = userData.filter((data, i) => {
      if (props.link !== data.link) return data;
      return null;
    });

    //Update db with latest activity
    updateDoc(UId, {
      [`allActivitiesObj.${key}.lastVisited`]: new Date().toISOString(),
      latestActivities: [
        { title: props.title, link: props.link },
        newUserData[0] || "",
        newUserData[1] || "",
      ],
    });
  };

  //Display - the actual information within the cards of Activities.js
  return (
    <>
      {/* Link to the appropriate activity. */}
      <Link to={props.link}>
      <div className={classes.col_3}>
            <span className={classes.col_3_1}>Level {props.level}</span>
            </div>
        <div className={classes.activity__container} onClick={setLatest}>
          <figure className={classes.col_1}>
            {/* Img within the card */}
            <img
              className={classes.col_1_img}
              src={require(`../../assets/icons/${props.src}.png`)}
              alt=""
            />

            {/* Card title */}
            <figcaption className={classes.info}>
              <span className={classes.main__info}>
                {" "}
                {props.title}
                <br></br>
              </span>

              {/* Description */}
              <span className={classes.sub__info}>
                {props.desc}
              </span>
            </figcaption>
          </figure>         
          </div>
      </Link>
    </>
  );
}

export default Activity;
