import { React } from "react";

import Activity from "../activity/Activity";

import classes from "./acts.module.css";

function Activities(props) {
  const lvlColorHandler = (lvl) => {
    if (lvl === 1) return `rgb(218, 247, 166)`;
    if (lvl === 2) return `rgb(133, 193, 233)`;
    if (lvl === 3) return `rgb(93, 173, 226)`;
    return `rgb(${(63, 137, 187)})`;
  };

  return (
    <div className={classes.acts__container}>
      <h3>All Activities</h3>
      <div className={classes.acts__title}>
        <h2>{props.title}</h2>
      </div>

      {props.activitiesArr.map((card, i) => (
        <Activity
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

export default Activities;
