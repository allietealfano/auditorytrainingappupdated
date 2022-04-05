import React from "react";

import Nav from "../../components/nav/Nav";
import Features from "../../components/homepage-sects/Features";
import Mission from "../../components/homepage-sects/Mission";
import UserMission from "../../components/homepage-sects/UserMission";
import Header from "../../components/homepage-sects/Header";

import classes from "./homepage.module.css";

function HomePage() {
  return (
    <main className={classes.main}>
      <Nav />
      <Header />
      <Features />
      <UserMission />
      <Mission />
    </main>
  );
}

export default HomePage;
