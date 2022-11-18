import { React, useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { updateDoc, getDoc, doc } from "firebase/firestore";

import { db } from "../../firebase-config";
import AuthContext from "../store/auth-context";
import useFetch from "../custHooks/useFetch";

import classes from "./act.module.css";

function Activity(props) {
  const [[userData], isPending, err] = useFetch("latestActivities");

  const user = useContext(AuthContext).fbUser;

  const key = `${props.link}`.replaceAll("/", "");

  const setLatest = () => {
    const UId = doc(db, user);

    //if activity was already the latest activity, only update its lastVisited time
    if (userData[0] && props.link === userData[0].link) {
      updateDoc(UId, {
        [`allActivitiesObj.${key}.lastVisited`]: new Date().toISOString(),
      });
      return;
    }

    const newUserData = userData.filter((data, i) => {
      if (props.link !== data.link) return data;
      return null;
    });

    updateDoc(UId, {
      [`allActivitiesObj.${key}.lastVisited`]: new Date().toISOString(),
      latestActivities: [
        { title: props.title, link: props.link },
        newUserData[0] || "",
        newUserData[1] || "",
      ],
    });
  };

  return (
    <>
      <Link to={props.link}>
        <div className={classes.activity__container} onClick={setLatest}>
          <figure className={classes.col_1}>
            <img
              className={classes.col_1_img}
              src={require(`../../assets/icons/${props.src}.png`)}
              alt=""
            />
            <figcaption className={classes.info}>
              <span className={classes.main__info}>
                {" "}
                {props.title}
                <br></br>
              </span>
              <span className={classes.sub__info}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </span>
            </figcaption>
          </figure>
          <div className={classes.col_2}>
            <img
              className={classes.col_2_1}
              src={require("../../assets/icons/notes.png")}
              alt="notes"
            />
            <img
              className={classes.col_2_1}
              src={require("../../assets/icons/pie-chart.png")}
              alt="pie chart"
            />
          </div>
          <div className={classes.col_3}>
            <span className={classes.col_3_1}>Level</span>
            <div
              style={{ backgroundColor: props.level }}
              className={classes.col_3_2}
            ></div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default Activity;
