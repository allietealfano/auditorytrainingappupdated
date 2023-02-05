import { React, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

import { db } from "../../firebase-config";
import LingDetection from "../../components/lingDetection/LingDetection";

function LingDetectionPage() {
  const [progress, setProgress] = useState(0);
  const [score, setScore] = useState(0);
  const [soundsArr, setSoundsArr] = useState([[0, 0]]);

  const progressHandler = (newProgress, newScore) => {
    setProgress(newProgress);
    setScore(newScore);
  };

  useEffect(() => {
    const getLingSounds = async function () {
      const docRef = doc(db, "audio", "ling");
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
      <LingDetection
        objKey={"activitydetection"}
        score={score}
        prog={progress}
        progressHandler={progressHandler}
        sound={Math.floor(Math.random() * 2)}
        arr={soundsArr}
      />
    </>
  );
}

export default LingDetectionPage;
