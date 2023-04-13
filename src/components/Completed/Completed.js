import { React, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

import Pop from "../pop/Pop";
import { db } from "../../firebase-config";

import AuthContext from "../store/auth-context";
import classes from "./completed.module.css";
import useFetch from "../custHooks/useFetch";

//Purpose: Completed Modal when a user finishes an activity.
function Completed(props) {

  //Retrieve user associated

  const user = useContext(AuthContext).fbUser;
  const [data, setData] = useState([]);

  //Key to access db
  const key = `${props.objKey}`.replaceAll("/", "");

  //Retrieve user history
  const [[allActivitiesObj], isPending, err] = useFetch("allActivitiesObj");

  /*TODO: db is inconsistent when referring to objKey (lingactivitydetection vs activitydetection)*/
  //Retrieving user data from fb db.
  useEffect(() => {
    //Update db to contain most recent activity 
    const UId = doc(db, user);
    updateDoc(UId, {
      [`allActivitiesObj.${props.objKey}.completions`]: arrayUnion(
        { score: props.score, date: new Date().toLocaleString('en-GB',{timeZone: 'EST'})},
        // ...props.currentScores,
      ),
    });

    //Grab the data from the db
    //console.log("TEST",allActivitiesObj);
    setData(allActivitiesObj?.[key].completions); //Access the history...

  }, [allActivitiesObj]);

  return (
    <>
      {/* Popup Modal displaying text */}
      <Pop
        // Header
        headerBig={"You have completed your mission!"}
        headerSmall={"Would you like to try again?"}
        
        //Retry activity
        option1={"Retry"}
        option1Func={() => window.location.reload(false)}
        
        //Return to dashboard func
        option2={
          <Link to="/dashboard">
            <span>Activities</span>
          </Link>
        }
        option2Func={() => ""}
        
        //Middle of the popup
        mid={
          <div>
            <h1>🏆</h1>
            <h2 style={{ color: "rgb(93, 173, 226)" }}>{props.score}%</h2>
            <h5 style={{color: "rgb(93,173,226)"}}>Previous Scores</h5>
            <div className={classes.prevScore}>
              <ul className={classes.scoreul}>
                <li className={classes.scoreHeading}>Score</li>
                {data?.slice(-10).map((dataDisplay) => 
                  <li>{dataDisplay.score}</li>
              )}
              </ul>
              <ul className={classes.dateul}>
                <li className={classes.scoreHeading}>Date</li>
                {data?.slice(-10).map((dataDisplay) => 
                  <li>{dataDisplay.date.slice(0,dataDisplay.date.indexOf(","))}</li>
              )}
              </ul>
            </div>
          </div>
        }
      />
    </>
  );
}

export default Completed;