import { React, useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
// import { updateDoc, getDoc, doc } from "firebase/firestore";

// import { db } from "../../firebase-config";
// import AuthContext from "../store/auth-context";
// import useFetch from "../custHooks/useFetch";

import classes from "./act.module.css";

//Purpose: Options
//TODO: Functionality

function Option(props) {
  // const [[userData], isPending, err] = useFetch("latestActivities");

  // const user = useContext(AuthContext).fbUser;

  // const key = `${props.link}`.replaceAll("/", "");

  // const setLatest = () => {
  //   const UId = doc(db, user);

  //   //if activity was already the latest activity, only update its lastVisited time
  //   if (userData[0] && props.link === userData[0].link) {
  //     updateDoc(UId, {
  //       [`allActivitiesObj.${key}.lastVisited`]: new Date().toISOString(),
  //     });
  //     return;
  //   }

  //   const newUserData = userData.filter((data, i) => {
  //     if (props.link !== data.link) return data;
  //     return null;
  //   });

  //   updateDoc(UId, {
  //     [`allActivitiesObj.${key}.lastVisited`]: new Date().toISOString(),
  //     latestActivities: [
  //       { title: props.title, link: props.link },
  //       newUserData[0] || "",
  //       newUserData[1] || "",
  //     ],
  //   });
  // };

  return (
    <>
      {/* Links to associated options link */}
      <Link to={props.link}>
        <div className={classes.activity__container}>
          <figure className={classes.col_1}>
            
            {/* Image */}
            <img
              className={classes.col_1_img}
              src={require(`../../assets/icons/${props.src}.png`)}
              alt="Error"
            />
            
            {/* Description and Title */}
            <figcaption className={classes.info}>
              <span className={classes.main__info}> {props.title}<br></br></span>
              <span className={classes.sub__info}>
                Lorem ipsum dolor sit amet
              </span>
            </figcaption>
          </figure>
        </div>
      </Link>
    </>
  );
}

export default Option;
