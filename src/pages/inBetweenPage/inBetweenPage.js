import { React, useState } from "react";

import Nav from "../../components/nav/Nav";
import { Link } from "react-router-dom";
import Options from "../../components/options/Options";
import { allBetweenOptions } from "../../helpers/allBetweenOptions";

import classes from "./inBetween.module.css";

/**Dashboard page */
function inBetweenPage() {
    return (
        <>
            <Nav />
            {
                <div>
                    <div
                        style={{ marginTop: "160px", maxHeight: "500px" }}
                        className={classes.main__container}
                    >
                        {/* Card options in the dashboard - do not req lvl colors so diff component created */}
                        <Options
                            optionsArr={allBetweenOptions.betweenOptions}
                        />
                    </div>
                    <div className={classes.buttonWrapper}>
                        {/* <Link to={"/activity/voiceSelector"}>
                            <button className={classes.voicebtn}>
                                Voice Selector
                            </button>
                        </Link> */}
                    </div>
                </div>
            }
        </>
    );
}

export default inBetweenPage;
