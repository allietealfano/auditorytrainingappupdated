import { React, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import useFetch from "../custHooks/useFetch";
import AuthContext from "../store/auth-context";

import classes from "./cardDB.module.css";

function CardDB(props) {
  const [allScores, setAllScores] = useState();
  const [lastVisited, setLastVisited] = useState();

  const locale = useContext(AuthContext).locale;

  const [[allActivitiesObj], isPending, err] = useFetch("allActivitiesObj");

  const key = `${props.link}`.replaceAll("/", "");

  useEffect(() => {
    setAllScores(allActivitiesObj?.[key].completions.map((comp) => comp.score));
    setLastVisited(
      new Date(allActivitiesObj?.[key].lastVisited).toLocaleDateString(locale)
    );
  }, [allActivitiesObj]);

  const imgSetter = () => {
    if (props.link === "/lingActivity/detection") return "volume";
    if (props.link === "/lingActivity/identification") return "arrows";
    if (props.link === "/lingActivity/discrimination") return "ear";
    return "notes";
  };

  let lastVisit = lastVisited;

  return (
    <>
      {allScores && (
        <Link to={props.link} params={{ testvalue: "hello" }}>
          <div style={{ backgroundColor: props.col }} className={classes.card}>
            <img
              alt=""
              src={require(`../../assets/icons/${imgSetter()}.png`)}
              className={classes.card__img}
            />
            <div className={classes.card__upper}>
              <span>{props.title}</span>
              <span>{`Visited: ${lastVisited}`}</span>
            </div>
            <div className={classes.card__lower}>
              <span>High Score:</span>
              <span>{allScores[0] ? `${Math.max(...allScores)}%` : "0%"}</span>
            </div>
          </div>
        </Link>
      )}
    </>
  );
}

export default CardDB;
