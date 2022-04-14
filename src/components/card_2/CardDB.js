import React from "react";
import { Link } from "react-router-dom";

import classes from "./card2.module.css";

function CardDB(props) {
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
            <span>Visited:</span>
          </div>
          <div className={classes.card__lower}>
            <span>High Score</span>
            <span>00</span>
          </div>
        </div>
      </Link>
    </>
  );
}

export default CardDB;
