import { React, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

import Pop from "../pop/Pop";
import { db } from "../../firebase-config";

import AuthContext from "../store/auth-context";
import useFetch from "../custHooks/useFetch";

function Completed(props) {
  const user = useContext(AuthContext).fbUser;
  const [data, setData] = useState([]);
  const key = `${props.objKey}`.replaceAll("/", "");
  const [[history], isPending, err] = useFetch("allActivitiesObj");


  /*TODO: db is inconsistent when referring to objKey (lingactivitydetection vs activitydetection)*/
  useEffect(() => {
    const UId = doc(db, user);
    updateDoc(UId, {
      [`allActivitiesObj.${props.objKey}.completions`]: arrayUnion(
        { score: props.score, date: new Date().toLocaleString('en-GB',{timeZone: 'EST'})},
        // ...props.currentScores,
      ),
    });

    setData(history?.[key].completions) //Access the history...


  }, []);


  return (
    <>
      <Pop
        headerBig={"You have completed your mission!"}
        headerSmall={"Would you like to try again?"}
        option1={"Retry"}
        option1Func={() => window.location.reload(false)}
        option2={
          <Link to="/dashboard">
            <span>Activities</span>
          </Link>
        }
        option2Func={() => ""}
        mid={
          <div>
            <h1>🏆</h1>
            <h2 style={{ color: "rgb(93, 173, 226)" }}>{props.score}%</h2>
            {/* Change styling for Scores */}
            <h5>Previous Scores</h5>
            <ol>
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
