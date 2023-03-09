import React from "react";

import Nav from "../../components/nav/Nav";
import Features from "../../components/homepage-sects/Features";
import Mission from "../../components/homepage-sects/Mission";
import UserMission from "../../components/homepage-sects/UserMission";
import Header from "../../components/homepage-sects/Header";

import classes from "./homepage.module.css";

//Home page 
function HomePage() {
  return (
    <main className={classes.main}>
      {/* Navigation Bar and Header */}
      <Nav />
      <Header />

      {/* Sections here refer to different parts of the home page */}
      {/* If you'd like to edit home page components, please refer to homepage-sects */}
      <Features />
      <UserMission />
      <Mission />
    </main>
  );
}

export default HomePage;
