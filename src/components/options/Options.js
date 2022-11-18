import { React } from "react";

import Option from "../Option/Option";

import classes from "./acts.module.css";

function Options(props) {
  const lvlColorHandler = (lvl) => {
    if (lvl === 1) return `rgb(218, 247, 166)`;
    if (lvl === 2) return `rgb(133, 193, 233)`;
    if (lvl === 3) return `rgb(93, 173, 226)`;
    if (lvl === 4) return `rgb(102, 0, 204)`;
    return `rgb(${(63, 137, 187)})`;
  };

  return (
    <div className={classes.acts__container}>
      <h3>What would you like to do today?</h3>
      <div className={classes.acts__title}>
        <h2>{props.title}</h2>
      </div>

      {props.optionsArr.map((card, i) => (
        <Option
          key={i}
          title={card.title}
          src={card.src}
          link={card.link}                      
          level={lvlColorHandler(card.level)}
        />
      ))}
    </div>
  );
}

export default Options;
