import { React, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

import Pop from "../components/pop/Pop";
import PlayButton from "../components/playButton/PlayButton";
import Nav from "../components/nav/Nav";
import { db } from "../firebase-config";

import "./dashboardPage.css";
import Card from "../components/card/Card";
function DashboardPage() {
  const [pop, setPop] = useState(true);
  const [fName, setFname] = useState("");

  const getFName = async function () {
    const docRef = doc(db, "users", localStorage.getItem("user"));
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) setFname(docSnap.data().fName);
  };

  getFName();

  const sondOk = () => {
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
          option1Func={sondOk}
          option2={"No"}
          option2Func={soundNotOk}
          pop={pop}
        />
      )}
      {!pop && (
        <div className="main__container">
          <h1>Welcome, {fName}</h1>
          <Card />
        </div>
      )}
    </>
  );
}

export default DashboardPage;
