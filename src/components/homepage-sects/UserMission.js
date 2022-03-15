import React from "react";

import "./userMission.css";

function UserMission() {
  //This array will likely be handled by a database
  //It's a placeholder that should probably be deleted

  const missionssArr = [
    {
      title: "Master",
      detail:
        "Your mission is to travel through and master each level of auditory training.",
      pic: "https://images.unsplash.com/40/OSASuBX1SGu4kb3ozvne_IMG_1088.jpg?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      title: "Discern",
      detail:
        " You will be asked to listen, detect, discriminate, identify, and comprehend different sounds, words, phrases, and sentences. ",
      pic: "https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      title: "Fun",
      detail: "Above all, your main mission is to have fun!",
      pic: "https://images.unsplash.com/photo-1489367874814-f5d040621dd8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1146&q=80",
    },
  ];

  return (
    <section className="section" id="section--1">
      <div className="section__title">
        <h2 className="section__description">Your Mission</h2>
      </div>

      <div className="mission__cards">
        {missionssArr.map((miss, i) => {
          return (
            <div
              className={`mission__card  ${i % 2 === 0 ? "row-reverse" : ""}`}
              key={i}
            >
              <div className="mission__card__info">
                <h5 className="mission__card__header">{miss.title}</h5>
                <p className="mission__card__text">{miss.detail}</p>
              </div>
              <img
                src={miss.pic}
                alt="Mission"
                className="mission__card__img"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default UserMission;
