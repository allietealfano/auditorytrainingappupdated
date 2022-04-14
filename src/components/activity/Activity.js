import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { updateDoc, getDoc, doc } from "firebase/firestore";

import { db } from "../../firebase-config";

import classes from "./act.module.css";

function Activity(props) {
  const user = `users/${localStorage.getItem("user")}`;
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const getLatestActivities = async function () {
      const docRef = doc(db, "users", localStorage.getItem("user"));
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) setUserData(docSnap.data().latestActivities);
    };

    getLatestActivities();
  }, []);

  const setLatest = () => {
    if (props.link === userData[0].link) return;

    const newUserData = userData.filter((data, i) => {
      if (props.link !== data.link) return data;
      return null;
    });

    console.log(newUserData);

    const UId = doc(db, user);
    updateDoc(UId, {
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
              <span className={classes.main__info}> {props.title}</span>
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
