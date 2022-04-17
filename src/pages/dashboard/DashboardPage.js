import { React, useState } from "react";

import Pop from "../../components/pop/Pop";
import PlayButton from "../../components/playButton/PlayButton";
import Nav from "../../components/nav/Nav";
import Cards from "../../components/cardsLatest/Cards";
import Activities from "../../components/activities/Activities";
import { allActivities } from "../../helpers/allActivities";

import classes from "./dashboardPage.module.css";

function DashboardPage() {
  //soundCheck in local storage prevents many sound checks during one session
  const soundCheck = parseInt(localStorage.getItem("soundCheck"));
  const [pop, setPop] = useState(!soundCheck);

  const soundOk = () => {
    localStorage.setItem("soundCheck", "1");
    setPop(false);
  };

  const soundNotOk = () => {
    setPop(true);
    //Keep The PopPup, tell the user what to do
  };

  return (
    <>
      <Nav />
      {pop && (
        <Pop
          headerBig={"Before we start, let's perform a sound test!"}
          headerSmall={"Press play when you are ready."}
          mid={
            <PlayButton
              audUrl={
                "https://firebasestorage.googleapis.com/v0/b/Auditory Trainning App.appspot.com/o/utilities%2Ftest.wav?alt=media&token=9d0e5ccd-03ed-458d-9869-cc8fbac4299c"
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

export default DashboardPage;
