import React from "react";
import { Link } from "react-router-dom";

import classes from "./card.module.css";

function Card(props) {
  return (
    <>
      <Link to={props.link}>
        <div className={classes.card}>
          <div className={classes.card__upper}></div>
          <div className={classes.card__lower}>
            <h3 className={classes.card__title}>{props.title}</h3>
            {/* Possible Implementation of levels
            <h6 className={classes.card__subH}>Levels: </h6>
              <div className={classes.card__levels}>
                <span className={classes.card__level}>1</span>
                <span className={classes.card__level}>2</span>
                <span className={classes.card__level}>3</span>
                <span className={classes.card__level}>4</span>
              </div> */}
          </div>
        </div>
      </Link>
    </>
  );
}

export default Card;
