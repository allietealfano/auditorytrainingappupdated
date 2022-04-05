import { React, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

import Pop from "../../components/pop/Pop";
import PlayButton from "../../components/playButton/PlayButton";
import Nav from "../../components/nav/Nav";
import { db } from "../../firebase-config";
import Cards from "../../components/cards/Cards";

import classes from "./dashboardPage.module.css";

function DashboardPage() {
  //soundCheck in local storage prevents many sound checks during one session
  const soundCheck = parseInt(localStorage.getItem("soundCheck"));
  const [pop, setPop] = useState(!soundCheck);
  const [fName, setFname] = useState("");

  //Activities grouped in different arrays
  const lingActs = [
    { title: "Detection", link: "/lingActivity/detection" },
    { title: "Discrimination", link: "/lingActivity/discrimination" },
    { title: "Identification", link: "/lingActivity/identification" },
  ];

  //To be used later, gets the logged in user's first name
  const getFName = async function () {
    const docRef = doc(db, "users", localStorage.getItem("user"));
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) setFname(docSnap.data().fName);
  };

  getFName();

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
      {!pop && (
        <div>
          <div className={classes.main__container}>
            <h1>{`Hi ${fName}!`}</h1>
            {/* bg can receice "cards__yellow or "cards__blue" */}
            <Cards title={"Ling Activities"} bg={""} cardsArr={lingActs} />
            {/* <Cards title={"Activity 2"} bg={""} cardsArr={lingActs} /> */}
          </div>
        </div>
      )}
    </>
  );
}

export default DashboardPage;
