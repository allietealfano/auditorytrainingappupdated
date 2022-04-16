import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

import { db } from "../../firebase-config";
import classes from "./cardDB.module.css";

function CardDB(props) {
  const [lastVisit, setLastVisit] = useState();
  const [completions, setCompletions] = useState([]);

  const allScores = completions.map((comp) => comp.score);

  let lastVisitMDY = `${new Date(lastVisit).getUTCMonth() + 1}-${new Date(
    lastVisit
  ).getUTCDate()}-${new Date(lastVisit).getUTCFullYear()}`;
  const key = `${props.link}`.replaceAll("/", "");

  useEffect(() => {
    const getLastVisit = async function () {
      const docRef = doc(db, "users", localStorage.getItem("user"));
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setLastVisit(docSnap.data().allActivitiesObj[key].lastVisited);
        setCompletions(docSnap.data().allActivitiesObj[key].completions);
      }
    };

    getLastVisit();
  }, [props.link, key]);

  const imgSetter = () => {
    if (props.link === "/lingActivity/detection") return "volume";
    if (props.link === "/lingActivity/identification") return "arrows";
    if (props.link === "/lingActivity/discrimination") return "ear";
    return "notes";
  };

  return (
    <>
      <Link to={props.link}>
        <div style={{ backgroundColor: props.col }} className={classes.card}>
          <img
            alt=""
            src={require(`../../assets/icons/${imgSetter()}.png`)}
            className={classes.card__img}
          />
          <div className={classes.card__upper}>
            <span>{props.title}</span>
            <span>{`Visited: ${lastVisitMDY}`}</span>
          </div>
          <div className={classes.card__lower}>
            <span>High Score:</span>
            <span>
              {allScores[0] ? `${Math.max(...allScores) * 100}%` : "0%"}
            </span>
          </div>
        </div>
      </Link>
    </>
  );
}

export default CardDB;
