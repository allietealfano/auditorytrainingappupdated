import React from "react";

import "./sections.css";
import "./mission.css";

function Mission() {
  return (
    <div>
      <section className="section" id="section--2">
        <div class="mission">
          <div className="section__title">
            <h2 className="section__description">Mission</h2>
            <h3 className="section__header">
          
            </h3>
          </div>
          <figure class="mission__shape">
            <img
              src={require("../../assets/images/test-founder.jpg")}
              alt="Computer"
              className="story__img"
            />
            <figcaption class="mission__caption">Dr. Alliete Alfano</figcaption>
          </figure>
          <div class="mission__text">
            <p>
            Mission: Audition! is an auditory training application designed to help people 
              who use cochlear implants train their hearing ability to identify and understand 
              sounds, words, phrases, and sentences functionally.
            </p>
            
            
          </div>
        </div>
      </section>
    </div>
  );
}

export default Mission;
