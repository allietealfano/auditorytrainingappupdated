import React from "react";

import "./sections.css";
import "./features.css";

function Features() {
  //This array will likely be handled by a database
  //It's a placeholder that should be deleted

  const featuresArr = [
    {
      title: "Detection",
      detail:
      " In this mission, you will either be presented with a sound or silence. Although you may not hear anything, it’s not a trick! Try your best to choose the best option of what you’re presented with.",
      pic: "../assets/images/test-pc.jpg",
    },
    {
      title: "Discrimination",
      detail:
"In this mission, you will be presented with two sounds and will be asked to select whether the sounds are the same or different.",
      pic: "../assets/images/test-pc.jpg",
    },
    {
      title: "Identification",
      detail:
      "In this mission, you will hear sounds of varying lengths and loudness levels. You will also hear words of varying lengths and voices and asked to identify the correct option.",
      pic: "../assets/images/test-pc.jpg",
    },  
  ];

  return (
    <div>
      <section className="section" id="section--1">
        <div className="section__title">
          <h2 className="section__description">Features</h2>
          <h3 className="section__header">
          Your mission is to travel through and master each level of auditory training.
           You will be asked to listen, detect, discriminate, identify, and comprehend
            different sounds, words, phrases, and sentences. Above all, your main mission 
            is to have fun!
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
    </div>
  );
}

export default Features;
