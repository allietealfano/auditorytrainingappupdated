import { React, useState } from "react";

import Nav from "../../components/nav/Nav";
import GameOptions from "../../components/Game Options/GameOptions";
import classes from "./gamePageDetection.module.css";

import { allMatchingGames } from "../../helpers/allMatchingGames";

//Game page for detection games specifically
function GamePageMatching() {

  //Actual display
  return (
    <>
    {/* Nav bar */}
    <Nav />
    {(
      <div>
        {/* Title and instructions */}
        <div className = {classes.header}>
          <h1>Matching Games</h1>
          <p>Please select your game!</p>
        </div>
        {/* List of buttons for activities  */}
        {/* If you'd like to edit activities, please refer to -GameOptions.js- or -allDetectionGames- */}
       {/* <button type="button" class={classes.section_dropdown}>Activity Section 1</button>*/}
          <div class={classes.buttonlayout}>
            <div className={classes.allMatchingGames}>
              <GameOptions
                optionsArr={allMatchingGames.matchingGames}
              />
            </div>
          </div>
      </div>
    )}
  </>
  );
}


export default GamePageMatching;