import React from "react";

import "./sections.css";
import "./features.css";

function Features() {
  //This array will likely be handled by a database
  //It's a placeholder that should be deleted

  const featuresArr = [
    {
      title: "Key Feature 1",
      detail:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde alias sint quos? Accusantium a fugiat porro reiciendis saepe quibusdam debitis ducimus.",
      pic: "../assets/images/test-pc.jpg",
    },
    {
      title: "Key Feature 2",
      detail:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde alias sint quos? Accusantium a fugiat porro reiciendis saepe quibusdam debitis ducimus.",
      pic: "../assets/images/test-pc.jpg",
    },
    {
      title: "Key Feature 3",
      detail:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde alias sint quos? Accusantium a fugiat porro reiciendis saepe quibusdam debitis ducimus.",
      pic: "../assets/images/test-pc.jpg",
    },
  ];

  return (
    <>
      <section className="section" id="section--1">
        <div className="section__title">
          <h2 className="section__description">Features</h2>
          <h3 className="section__header">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde alias
          </h3>
        </div>

        <div className="feature__cards">
          <div className="feature__card">
            <h5 className="card__header">{featuresArr[0].title}</h5>
            <p>{featuresArr[0].detail}</p>
            <img
              src={require("../../assets/images/test-pc.jpg")}
              alt="Computer"
              className="card__img"
            />
          </div>
          <div className="feature__card">
            <h5 className="card__header">{featuresArr[1].title}</h5>
            <p>{featuresArr[1].detail}</p>
            <img
              src={require("../../assets/images/test-pc.jpg")}
              alt="Computer"
              className="card__img"
            />
          </div>
          <div className="feature__card">
            <h5 className="card__header">{featuresArr[2].title}</h5>
            <p>{featuresArr[2].detail}</p>
            <img
              src={require("../../assets/images/test-pc.jpg")}
              alt="Computer"
              className="card__img"
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default Features;
