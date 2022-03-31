import React from "react";

import Card from "../card/Card";

import "./cards.css";

function Cards(props) {
  return (
    <div className={`cards cards__${props.bg ?? ""}`}>
      {props.cardsArr.map((card, i) => (
        <Card key={i} title={card.title} link={card.link} />
      ))}
    </div>
  );
}

export default Cards;
