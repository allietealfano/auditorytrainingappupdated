import React from "react";
import { Link } from "react-router-dom";

import classes from "./header.module.css";

function Header() {
  return (
    <header className={classes.header}>
      <div className={classes.header__title}>
        <h1>
          Helping
          <span className={classes.highlight}>hearing</span>
          loss
          <br />
          with<span className={classes.highlight}>activities</span>
        </h1>
        <h4>A simpler way of practicing</h4>
        <Link to="/auth" state={{ signIn: false }}>
          <button className="btn btn__blue">Let's start</button>
        </Link>
        <img
          src={require("../../assets/images/test-img.jpg")}
          alt="hearing-aid"
          className={classes.header__img}
        />
      </div>
    </header>
  );
}

export default Header;
