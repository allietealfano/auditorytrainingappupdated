import React from "react";

import "./sections.css";
import "./features.css";

function Features() {
  //This array will likely be handled by a database
  //It's a placeholder that should probably be deleted

  const featuresArr = [
    {
      title: "Detection",
      detail:
        " In this mission, you will either be presented with a sound or silence. Although you may not hear anything, it’s not a trick! Try your best to choose the best option of what you’re presented with.",
      pic: "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
    },
    {
      title: "Discrimination",
      detail:
        "In this mission, you will be presented with two sounds and will be asked to select whether the sounds are the same or different.",
      pic: "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
    },
    {
      title: "Identification",
      detail:
        "In this mission, you will hear sounds of varying lengths and loudness levels. You will also hear words of varying lengths and voices and asked to identify the correct option.",
      pic: "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
    },
  ];

  return (
    <section className="section" id="section--1">
      <div className="section__title">
        <h2 className="section__description">Features</h2>
        <h3 className="section__header"></h3>
      </div>

      <div className="feature__cards">
        {featuresArr.map((feat, i) => {
          return (
            <div className="feature__card" key={i}>
              <h5 className="card__header">{feat.title}</h5>
              <p className="card__text">{feat.detail}</p>
              <img src={feat.pic} alt="Feature" className="card__img" />
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Features;
