import { React, useState } from "react";

import Pop from "../../components/pop/Pop";
import PlayButton from "../../components/playButton/PlayButton";
import Nav from "../../components/nav/Nav";
import Cards from "../../components/cardsLatest/Cards";
import Activities from "../../components/activities/Activities";
import { allActivities } from "../../helpers/allActivities";

import classes from "./activityPage.module.css";

/*Page displayed when Activity is accessed. */
function ActivityPage() {

  //soundCheck in local storage prevents many sound checks during one session                     //Sign in Test Proceess *Mandatory everytime* Start
  const soundCheck = parseInt(localStorage.getItem("soundCheck"));
  const [pop, setPop] = useState(!soundCheck);

  //Sound check passed, stop showing the popup so it's not repeatedly done
  const soundOk = () => {
    localStorage.setItem("soundCheck", "1");
    setPop(false);
  };

  const soundNotOk = () => {
    setPop(true);
    //Keep The Popup, tell the user what to do
  };                                                                                                //Sign in Test Proceess *Mandatory everytime* End

  return (
    <>
      <Nav />
      {/* Pop refers to the sound popup, Pop as a component contains the modal */}
      {pop && (
        <Pop
          headerBig={"Before we start, let's perform a sound test!"}
          headerSmall={"Press play when you are ready."}
          mid={
            <PlayButton
              audUrl={
                "https://firebasestorage.googleapis.com/v0/b/mission-audition.appspot.com/o/utilities%2Ftest.wav?alt=media&token=9d0e5ccd-03ed-458d-9869-cc8fbac4299c"
              }
            />
          }
          option1={"Yes"}
          option1Func={soundOk}
          option2={"No"}
          option2Func={soundNotOk}
          pop={pop}
        />
      )}
      {/* Occurs when pop is turned off - show off the cards and activities */}
      {!pop && (
        <div>
          <div className={classes.main__container}>
            <Cards />
            <Activities
              title={"Ling Activities"}
              activitiesArr={allActivities.lingActs}
            />
          </div>
        </div>

        
      )}
    </>
  );
}

export default ActivityPage;
