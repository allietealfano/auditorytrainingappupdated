import { React, useEffect, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

import { db } from "../../firebase-config";
import Ling from "./Ling";

function LingPage() {
  const [progress, setProgress] = useState(0);
  const [score, setScore] = useState(0);
  const [arr, setArr] = useState([[0, 0]]);

  const progressHandler = (newProgress, newScore) => {
    setProgress(newProgress);
    setScore(newScore);
  };

  useEffect(() => {
    const getFName = async function () {
      const docRef = doc(db, "audio", "ling");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setArr(
          Object.keys(docSnap.data()).map((key) => [key, docSnap.data()[key]])
        );
      }
    };

    getFName();
  }, []);
  return (
    <div>
      <Ling
        score={score}
        prog={progress}
        progressHandler={progressHandler}
        sound={Math.floor(Math.random() * 2)}
        arr={arr}
      />
    </div>
  );
}

export default LingPage;
