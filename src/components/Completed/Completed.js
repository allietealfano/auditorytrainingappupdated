import { React, useContext, useEffect,useState } from "react";
import { Link } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";

import Pop from "../pop/Pop";
import { db } from "../../firebase-config";

import classes from "./comp.module.css";
import AuthContext from "../store/auth-context";
 
function Completed(props) {
  const user = useContext(AuthContext).fbUser;
  const [value, setValue] = useState(false);
  const refresh = ()=>{
        // re-renders the component
        setValue({});
    }
  useEffect(() => {
    const UId = doc(db, user);
    updateDoc(UId, {
      [`allActivitiesObj.${props.objKey}.completions`]: [
        { score: props.score, date: new Date().toISOString() },
        ...props.currentScores,
      ],
    });
  }, []);

  return (
    <>
      <Pop
       <div className={classes.bg__container}>
        headerBig={"You have completed your mission!"}
        headerSmall={"Would you like to try again?"}
        option1={"Retry"}
        option1Func={<div>
                          <button onClick={ refresh }>Restart activity</button>
                      </div>}
        option2={
          <Link to=".../dashboard">
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
       </div>
      />
    </>
  );
}

export default Completed;
