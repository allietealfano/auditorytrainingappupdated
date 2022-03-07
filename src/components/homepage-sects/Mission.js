import React from "react";

import "./sections.css";
import "./mission.css";

function Mission() {
  return (
    <>
      <section className="section" id="section--2">
        <div className="mission">
          <div className="section__title">
            <h2 className="section__description">Mission</h2>
            <h3 className="section__header">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
              alias
            </h3>
          </div>
          <figure className="mission__shape">
            <img
              src={require("../../assets/images/test-founder.jpg")}
              alt="Founder"
              className="story__img"
            />
            <figcaption className="mission__caption">
              Dr. Alliete Alfano
            </figcaption>
          </figure>
          <div className="mission__text">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam,
              ipsum sapiente aspernatur libero repellat quis consequatur ducimus
              quam nisi exercitationem omnis earum qui. Aperiam, ipsum sapiente
              aspernatur libero repellat quis consequatur ducimus quam nisi
              exercitationem omnis earum qui. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur
              libero repellat quis consequatur ducimus quam nisi exercitationem
              omnis earum qui. Aperiam, ipsum sapiente aspernatur libero
              repellat quis consequatur ducimus quam nisi exercitationem omnis
              earum qui.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Mission;
