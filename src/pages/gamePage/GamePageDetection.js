import { React, useState } from "react";

import Nav from "../../components/nav/Nav";
import GameOptions from "../../components/Game Options/GameOptions";
import classes from "./gamePageDetection.module.css";

import { allDetectionGames } from "../../helpers/allDetectionGames";

//Game page for detection games specifically
function GamePageDetection() {
    //Actual display
    return (
        <>
            {/* Nav bar */}
            <Nav />
            {
                <div>
                    {/* Title and instructions */}
                    <div className={classes.header}>
                        <h1>Detection Games</h1>
                        <p>Please select your activity!</p>
                    </div>
                    {/* List of buttons for activities  */}
                    {/* If you'd like to edit activities, please refer to -GameOptions.js- or -allDetectionGames- */}
                    {/* <button type="button" class={classes.section_dropdown}>Activity Section 1</button>*/}
                    <div class={classes.buttonlayout}>
                        <div className={classes.allDetectionGames}>
                            <GameOptions
                                optionsArr={allDetectionGames.detectGames}
                            />
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default GamePageDetection;
