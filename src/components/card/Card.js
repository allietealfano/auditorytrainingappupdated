import { React, useEffect, useCallback, useState } from "react";
import { Link } from "react-router-dom";

import "./card.css";

function Card(props) {
  return (
    <>
      <Link to={props.link}>
        <div className="card">
          <div className="card__upper"></div>
          <div className="card__lower">
            <h3 className="card__title">{props.title}</h3>
            {/* <h6 className="card__subH">Levels: </h6>
              <div className="card__levels">
                <span className="card__level">1</span>
                <span className="card__level">2</span>
                <span className="card__level">3</span>
                <span className="card__level">4</span>
              </div> */}
          </div>
        </div>
      </Link>
    </>
  );
}

export default Card;
