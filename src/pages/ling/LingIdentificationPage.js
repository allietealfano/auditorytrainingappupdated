import { React, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

import { db } from "../../firebase-config";
import LingIdentificationAvsAAA from "../../components/lingIdentification/LingIdentificationAvsAAA";

//Page for Identification Page
function LingIdentificationPage() {
  
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
      const docRef = doc(db, "audio", "ling"); // choose audio from database
      const docSnap = await getDoc(docRef);

      //Confirm docs correctly grabbed
      if (docSnap.exists()) {
        //Sets sounds to sound arr for use
        setSoundsArr(
          Object.keys(docSnap.data()).map((key) => [key, docSnap.data()[key]])
        );
      }
    };

    //Call declared method
    getLingSounds();
  }, []);
  return (
    <>
    {/* Calls LingDetection and passes required params. 
      If you'd like to edit Detection Game, please refer to -LingIdentificationAvsAAA.js- */}
      <LingIdentificationAvsAAA
        objKey={"lingActivityidentification"}
        score={score}
        prog={progress}
        progressHandler={progressHandler}
        sound1={Math.floor(Math.random() * 2)}
		sound2={Math.floor(Math.random() * 2)}
        arr={soundsArr}
      />
    </>
  );
}

export default LingIdentificationPage;