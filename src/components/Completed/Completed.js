import { React, useContext, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { doc, updateDoc, getDoc } from "firebase/firestore";

import Pop from "../pop/Pop";
import { db } from "../../firebase-config";

import AuthContext from "../store/auth-context";

function Completed(props) {
  const user = useContext(AuthContext).fbUser;
  const [data, setData] = useState([]);

  useEffect(() => {
    const UId = doc(db, user);
    updateDoc(UId, {
      [`allActivitiesObj.${props.objKey}.completions`]: [
        { score: props.score, date: new Date().toISOString() },
        ...props.currentScores,
      ],
    });

    const getHistory = async () => {
      const UId = doc(db, user);
      const prevHistory = await getDoc(UId);
      setData(prevHistory.data().allActivitiesObj.activitydetection.completions);
    }

    getHistory();

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
          </div>
        }
      />
    </>
  );
}

export default Completed;
