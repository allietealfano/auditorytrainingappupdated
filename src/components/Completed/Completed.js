import { React, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";

import Pop from "../pop/Pop";
import { db } from "../../firebase-config";

import AuthContext from "../store/auth-context";

import classes from "./completed.module.css";

//Purpose: Completed Modal when a user finishes an activity.
function Completed(props) {

  //Retrieve user associated
  const user = useContext(AuthContext).fbUser;

  //setState to store retrieved data
  const [data, setData] = useState([]);

  //Key to access db
  const key = `${props.objKey}`.replaceAll("/", "");

  //Retrieve user history
  const [[history], isPending, err] = useFetch("allActivitiesObj");


  /*TODO: db is inconsistent when referring to objKey (lingactivitydetection vs activitydetection)*/
  //Retrieving user data from fb db.
  useEffect(() => {
    //Update db to contain most recent activity 
    const UId = doc(db, user);
    updateDoc(UId, {
      [`allActivitiesObj.${props.objKey}.completions`]: [
        { score: props.score, date: new Date().toISOString()},
        // ...props.currentScores,
      ],
    });

    //Grab the data from the db
    setData(history?.[key].completions) //Access the history...

  }, []);

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
            {/* Change styling for Scores */}
            <h5 style={{color: "rgb(93,173,226)"}}>Previous Scores</h5>
            <ol className={classes.scoreList}>
              {data.map((data) => (
                <li key={data.date}>Score:{data.score}     Date:{data.date}</li>
              ))}
              {/* {data.map((data, index) => {
                if(index >= data.length-6)
                <li key={data.date}>Score:{data.score}     Date:{data.date}</li>
              })} */}
            </ol>
          </div>
        }
      />
    </>
  );
}

export default Completed;
