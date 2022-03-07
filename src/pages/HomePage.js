import React from "react";
import { Link } from "react-router-dom";

import Nav from "../components/nav/Nav";
import "./homepage.css";

import Features from "../components/homepage-sects/Features";
import Mission from "../components/homepage-sects/Mission";

function HomePage() {
  return (
    <main>
      <header className="header">
        <Nav />
        <br />
        <br />

        <div className="header__title">
          <h1>
            Helping
            <span className="highlight">hearing</span>
            loss
            <br />
            with<span className="highlight">activities</span>
          </h1>
          <h4>A simpler way of practicing</h4>
          <Link to="/auth" state={{ signIn: false }}>
            <button className="btn-blue">Let's start</button>
          </Link>
          <img
            src={require("../assets/images/test-img.jpg")}
            alt="main"
            className="header__img"
          />
        </div>
      </header>

      <Features />
      <Mission />
    </main>
  );
}

export default HomePage;
