import { React, useState, useEffect, useContext } from "react";

import { getDoc, doc } from "firebase/firestore";

import { db } from "../../firebase-config";
import AuthContext from "../store/auth-context";
import CardDB from "../cardDB/CardDB";

import classes from "./cards.module.css";

//Purpose: Cards displayed in Activity Page
function Cards() {

  //Set up state variables
  const [userData, setUserData] = useState([]);

  //get associated user
  const user = useContext(AuthContext).fbUser;

  //Fetch latestactivity and set it to userData var...
  //TODO: Discover why useFetch is not used in this context?
  useEffect(() => {
    const getLatestActivities = async function () {
      const docRef = doc(db, user);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) setUserData(docSnap.data().latestActivities);
    };

    getLatestActivities();
  }, [user]);

  //Decides color based on col...index?
  const colorHandler = (col) => {
    if (col === 0) return `rgb(192, 165, 255)`;
    if (col === 1) return `rgb(133, 193, 233)`;
    if (col === 2) return `rgb(218, 247, 166)`;
    return `rgb(${(63, 137, 187)})`;
  };

  return (
    <>
      {/* Confirm user data exists, first row of user data */}
      {userData[0] && (
        <div>
          {/* Display user's recent activities */}
          <h3 className={classes.header__title}>Recent Activities</h3>
          <div className={classes.cards}>
            {/* If data exists, place it in a CardDB component and display that */}
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
              // Otherwise, return null
              return null;
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default Cards;
