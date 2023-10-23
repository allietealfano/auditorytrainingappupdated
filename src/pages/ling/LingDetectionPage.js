import { React, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

import { db } from "../../firebase-config";
import LingDetection from "../../components/lingDetection/LingDetection";

//Page for Detection Game
function LingDetectionPage() {
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

            console.log(docSnap);

            //Checking to make sure docs were correctly grabbed
            if (docSnap.exists()) {
                //Set array of sounds with associated key value
                setSoundsArr(
                    Object.keys(docSnap.data()).map((key) => [
                        key,
                        docSnap.data()[key],
                    ])
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
            <LingDetection
                objKey={"activitydetection"}
                score={score}
                prog={progress}
                progressHandler={progressHandler}
                sound={Math.floor(Math.random() * 3)} //default was 2, increase the number less chance of no sound
                arr={soundsArr}
            />
        </>
    );
}

export default LingDetectionPage;
