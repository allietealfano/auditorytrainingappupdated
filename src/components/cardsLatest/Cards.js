import { React, useState, useEffect, useContext } from "react";

import { getDoc, doc } from "firebase/firestore";

import { db } from "../../firebase-config";
import AuthContext from "../store/auth-context";
import CardDB from "../cardDB/CardDB";

import classes from "./cards.module.css";

function Cards() {
  const [userData, setUserData] = useState([]);

  const user = useContext(AuthContext).fbUser;

  useEffect(() => {
    const getLatestActivities = async function () {
      const docRef = doc(db, user);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) setUserData(docSnap.data().latestActivities);
    };

    getLatestActivities();
  }, [user]);

  const colorHandler = (col) => {
    if (col === 0) return `rgb(192, 165, 255)`;
    if (col === 1) return `rgb(133, 193, 233)`;
    if (col === 2) return `rgb(218, 247, 166)`;
    return `rgb(${(63, 137, 187)})`;
  };

  return (
    <>
      {userData[0] && (
        <div>
          <h3 className={classes.header__title}>Recent Activities</h3>
          <div className={classes.cards}>
            {userData.map((data, i) => {
              if (data) {
                return (
                  <CardDB
                    key={i}
                    title={data.title}
                    link={data.link}
                    date={data.date}
                    col={colorHandler(i)}
                  />
                );
              }
              return null;
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default Cards;
