import React from "react";

import Card from "../card/Card";

import classes from "./cards.module.css";

function Cards(props) {
  return (
    <div className={`${classes.cards} ${classes.props?.bg}`}>
      {props.cardsArr.map((card, i) => (
        <Card key={i} title={card.title} link={card.link} />
      ))}
    </div>
  );
}

export default Cards;
