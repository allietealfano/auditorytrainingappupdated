import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import LingDiscrimination from "../../components/lingDiscrimination/lingDiscrimination";
import "./LingPage.css";

function LingDiscriminationPage() {
    const [progress, setProgress] = useState(0);
    const [soundsArr, setSoundsArr] = useState([[0, 0]]);
    const [voice, setVoice] = useState(localStorage.getItem("selectedVoice"));
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const progressHandler = (newProgress, newScore) => {
        setProgress(newProgress);
    };

    // Function to play audio sample for each voice
    const playAudioSample = async (voiceType) => {
        let docRef;

        if (voiceType == "female_a" || voiceType == "male_a") {
            docRef = doc(
                db,
                "audio_voices",
                voiceType,
                "ling_discrimination_game_1", // Adjusted to match your database screenshot
                "sounds"
            );
        } else {
            docRef = doc(
                db,
                "audio_voices",
                voiceType,
                "ling_detection_discrimination_game_1", // Adjusted to match your database screenshot
                "sounds"
            );
        }

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // Assuming 'a' is the field for the sample sound in your database
            const audioSampleUrl = docSnap.data()["a"]; // Use the correct field name based on your Firestore structure
            const audio = new Audio(audioSampleUrl);
            audio.play();
        } else {
            console.log("No audio URL found!");
        }
    };

    const handleSetVoice = (newVoice) => {
        const confirmChange = window.confirm(
            "Are you sure you want to select a new voice? This will restart the game."
        );
        if (confirmChange) {
            localStorage.setItem("selectedVoice", newVoice);
            window.location.reload();
        }
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    useEffect(() => {
        const getLingSounds = async function () {
            let docRef = null;
            if (voice === "female_a") {
                docRef = doc(
                    db,
                    "audio_voices",
                    "female_a",
                    "ling_detection_game_2",
                    "sounds"
                );
            } else if (voice === "female_b") {
                docRef = doc(
                    db,
                    "audio_voices",
                    "female_b",
                    "ling_detection_discrimination_game_2",
                    "sounds"
                );
            } else if (voice === "female_c") {
                docRef = doc(
                    db,
                    "audio_voices",
                    "female_c",
                    "ling_detection_discrimination_game_2",
                    "sounds"
                );
            } else if (voice === "male_a") {
                docRef = doc(
                    db,
                    "audio_voices",
                    "male_a",
                    "ling_discrimination_game_1",
                    "sounds"
                );
            } else {
                docRef = doc(
                    db,
                    "audio_voices",
                    "female_a",
                    "ling_detection_game_2",
                    "sounds"
                );
            }

            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setSoundsArr(
                    Object.keys(docSnap.data()).map((key) => [
                        key,
                        docSnap.data()[key],
                    ])
                );
            }
        };
        getLingSounds();
    }, [voice]);

    return (
        <>
            <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
                <div className="wrapper">
                    <div className="close-btn">
                        <button onClick={closeSidebar}>&times;</button>
                    </div>

                    {/* Voice selection buttons with preview buttons */}
                    <div className="voice-choice-wrapper">
                        <button
                            className="voice-btn"
                            onClick={() => handleSetVoice("female_a")}
                        >
                            Female A
                        </button>
                        <button
                            className="preview-btn"
                            onClick={() => playAudioSample("female_a")}
                        >
                            🔊
                        </button>
                    </div>
                    <div className="voice-choice-wrapper">
                        <button
                            className="voice-btn"
                            onClick={() => handleSetVoice("female_b")}
                        >
                            Female B
                        </button>
                        <button
                            className="preview-btn"
                            onClick={() => playAudioSample("female_b")}
                        >
                            🔊
                        </button>
                    </div>
                    <div className="voice-choice-wrapper">
                        <button
                            className="voice-btn"
                            onClick={() => handleSetVoice("female_c")}
                        >
                            Female C
                        </button>
                        <button
                            className="preview-btn"
                            onClick={() => playAudioSample("female_c")}
                        >
                            🔊
                        </button>
                    </div>
                    <div className="voice-choice-wrapper">
                        <button
                            className="voice-btn"
                            onClick={() => handleSetVoice("male_a")}
                        >
                            Male A
                        </button>
                        <button
                            className="preview-btn"
                            onClick={() => playAudioSample("male_a")}
                        >
                            🔊
                        </button>
                    </div>
                </div>
            </div>
            <button className="voice-select-btn" onClick={toggleSidebar}>
                Voice Selector
            </button>

            {/* LingDiscrimination component */}
            <LingDiscrimination
                objKey={"lingActivitydiscrimination"}
                prog={progress}
                progressHandler={progressHandler}
                arr={soundsArr}
            />
        </>
    );
}

export default LingDiscriminationPage;
