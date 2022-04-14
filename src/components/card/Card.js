import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { updateDoc, getDoc, doc } from "firebase/firestore";

import { db } from "../../firebase-config";

import classes from "./card.module.css";

function Card(props) {
  return (
    <>
      <Link to={props.link}>
        <div className={classes.card}>
          <div className={classes.card__upper}></div>
          <div className={classes.card__lower}>
            <h3 className={classes.card__title}>{props.title}</h3>
          </div>
        </div>
      </Link>
    </>
  );
}

export default Card;
