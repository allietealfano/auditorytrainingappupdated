import { React, useState, useEffect } from "react";

import { getDoc, doc } from "firebase/firestore";

import { db } from "../../firebase-config";
import CardDB from "../card_2/CardDB";

import classes from "./cards.module.css";

function Cards(props) {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const getLatestActivities = async function () {
      const docRef = doc(db, "users", localStorage.getItem("user"));
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) setUserData(docSnap.data().latestActivities);
    };

    getLatestActivities();
  }, []);

  const lvlColorHandler = (col) => {
    if (col === 0) return `rgb(192, 165, 255)`;
    if (col === 1) return `rgb(133, 193, 233)`;
    if (col === 2) return `rgb(218, 247, 166)`;
    return `rgb(${(63, 137, 187)})`;
  };

  return (
    <div className={`${classes.cards} ${classes.props?.bg}`}>
      {userData.map((data, i) => (
        <CardDB
          key={i}
          title={data.title}
          link={data.link}
          date={data.date}
          col={lvlColorHandler(i)}
        />
      ))}
    </div>
  );
}

export default Cards;
