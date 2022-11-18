import { React, useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";


import classes from "./act.module.css";

function GameOption(props) {

  return (
    <>
      <Link to={props.link}>
        <div className={classes.activity__container}>
          <figure className={classes.col_1}>
            <img
              className={classes.col_1_img}
              src={require(`../../assets/icons/${props.src}.png`)}
              alt="Error"
            />
            <figcaption className={classes.info}>
              <span className={classes.main__info}> {props.title}<br></br></span>
              <span className={classes.sub__info}>
                Game Description!
              </span>
            </figcaption>
          </figure>
        </div>
      </Link>
    </>
  );
}

export default GameOption;
