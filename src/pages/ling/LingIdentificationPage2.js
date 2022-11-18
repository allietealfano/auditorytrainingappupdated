import { React, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

import { db } from "../../firebase-config";
import LingIdentificationVary from "../../components/lingIdentification/LingIdentificationVary";

function LingIdentificationPage2() {
  const [progress, setProgress] = useState(0);
  const [score, setScore] = useState(0);
  const [soundsArr, setSoundsArr] = useState([[0, 0]]);

  const progressHandler = (newProgress, newScore) => {
    setProgress(newProgress);
    setScore(newScore);
  };

  useEffect(() => {
    const getLingSounds = async function () {
      const docRef = doc(db, "audio", "ling"); // choose audio from database
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setSoundsArr(
          Object.keys(docSnap.data()).map((key) => [key, docSnap.data()[key]])
        );
      }
    };

    getLingSounds();
  }, []);
  return (
    <>
      <LingIdentificationVary
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

export default LingIdentificationPage2;
