import { React, useState } from "react";

import Nav from "../../components/nav/Nav";
import GameOptions from "../../components/Game Options/GameOptions";
import classes from "./gamePageDetection.module.css";

import { allCrossWordsGames } from "../../helpers/allCrossWordsGames";

//Game page for detection games specifically

// IMPORTANT: CROSSWORD WAS USED BECAUSE I MIXED UP WORDSEARCH WITH CROSSWORD

function GamePageCrossWords() {

  //Actual display
  return (
    <>
    {/* Nav bar */}
    <Nav />
    {(
      <div>
        {/* Title and instructions */}
        <div className = {classes.header}>
          <h1>WordSearch Games</h1>
          <p>Please select your game!</p>
        </div>
        {/* List of buttons for activities  */}
        {/* If you'd like to edit activities, please refer to -GameOptions.js- or -allDetectionGames- */}
       {/* <button type="button" class={classes.section_dropdown}>Activity Section 1</button>*/}
          <div class={classes.buttonlayout}>
            <div className={classes.allCrossWordsGames}>
              <GameOptions
                optionsArr={allCrossWordsGames.crosswordsGames}
              />
            </div>
          </div>
      </div>
    )}
  </>
  );
}


export default GamePageCrossWords;