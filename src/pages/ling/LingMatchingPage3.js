import { React, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

import { db } from "../../firebase-config";
import LingMatching3 from "../../components/lingMatching3/LingMatching3";

//Page for Detection Game
function LingMatchingPage3() {

  //Variables for progress, score, and sound states
  const [progress, setProgress] = useState(0);
  const [score, setScore] = useState(0);
  const [soundsArr, setSoundsArr] = useState([[0, 0]]);

  //Handler to update progression and score
  const progressHandler = (newProgress, newScore) => {
    setProgress(newProgress);
    setScore(newScore);
  };

  useEffect(() => {
    //Retrieve sounds from db
    const getLingSounds = async function () {
      const docRef = doc(db, "audio", "ling");
      const docSnap = await getDoc(docRef);

      //Checking to make sure docs were correctly grabbed
      if (docSnap.exists()) {
        //Set array of sounds with associated key value
        setSoundsArr(
          Object.keys(docSnap.data()).map((key) => [key, docSnap.data()[key]])
        );
      }
    };

    //Call func declared earlier
    getLingSounds();
  }, []);

  //Display
  return (
    <>
      {/* Calls LingDetection and passes required params. 
      If you'd like to edit Detection Game, please refer to -LingDetection.js- */}
      <LingMatching3
        objKey={"gamedetection"}
        score={score}
        prog={progress}
        progressHandler={progressHandler}
        sound={Math.floor(Math.random() * 2)}
        arr={soundsArr}
      />
    </>
  );
}

export default LingMatchingPage3;