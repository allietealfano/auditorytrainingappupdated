import React from "react";
import { Link } from "react-router-dom";
import { React, useState } from "react";
import Pop from "../components/pop/Pop";
import PlayButton from "../components/playButton/PlayButton";
import Nav from "../components/nav/Nav";

function DashboardPage() {
  const [pop, setPop] = useState(true);

  const sondOk = () => {
    setPop(false);
  };

  const soundNotOk = () => {
    setPop(true);
    //Keep The PopPup, tell the user what to do
  };

  return (
    <div>
      <Pop />
      <nav>
        <ul>
          <Link to="/">
            <li className="active">Mission Audition!</li>
          </Link>
          <Link to="/auth" state={{ signIn: true }}>
            <li>Sign In</li>
          </Link>
          <Link to="/auth" state={{ signIn: false }}>
            <li>Sign Up</li>
          </Link>
          <Link to="/dashboard">
            <li>Dashboard</li>
          </Link>
        </ul>
      </nav>
      <Nav />
      {pop && (
        <Pop
          headerBig={"Before we start, let's perform a sound test!"}
          headerSmall={"Press play when you are ready."}
          mid={<PlayButton />}
          option1={"Yes"}
          option1Func={sondOk}
          option2={"No"}
          option2Func={soundNotOk}
          pop={pop}
        />
      )}
    </div>
  );
}

export default DashboardPage;
