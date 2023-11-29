import React from "react";
import { Link } from "react-router-dom";
import Nav from "../../components/nav/Nav";

function VoiceSelectorPage() {
    const handleVoiceSelection = (voiceNumber) => {
        // You can perform any action based on the selected voice here
        alert(`Voice ${voiceNumber} has been selected!`);
    };

    return (
        <>
            <Nav />
            <div
                style={{
                    marginTop: "120px",
                    textAlign: "center",
                    fontFamily: "Arial, sans-serif",
                }}
            >
                <h1>Select a Voice</h1>
                <div>
                    <button
                        style={{
                            padding: "10px 20px",
                            margin: "10px",
                            fontSize: "16px",
                            backgroundColor: "#007bff",
                            color: "#fff",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                        onClick={() => handleVoiceSelection(1)}
                    >
                        🔊 Voice 1
                    </button>
                    <button
                        style={{
                            padding: "10px 20px",
                            margin: "10px",
                            fontSize: "16px",
                            backgroundColor: "#007bff",
                            color: "#fff",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                        onClick={() => handleVoiceSelection(2)}
                    >
                        🔊 Voice 2
                    </button>
                    <button
                        style={{
                            padding: "10px 20px",
                            margin: "10px",
                            fontSize: "16px",
                            backgroundColor: "#007bff",
                            color: "#fff",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                        onClick={() => handleVoiceSelection(3)}
                    >
                        🔊 Voice 3
                    </button>
                    <button
                        style={{
                            padding: "10px 20px",
                            margin: "10px",
                            fontSize: "16px",
                            backgroundColor: "#007bff",
                            color: "#fff",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                        onClick={() => handleVoiceSelection(4)}
                    >
                        🔊 Voice 4
                    </button>
                </div>
                {/* Back button to return to the previous page */}
                <Link to="/activity/inBetweenPage">
                    <button
                        style={{
                            padding: "10px 20px",
                            margin: "10px",
                            fontSize: "16px",
                            backgroundColor: "gray",
                            color: "#fff",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                    >
                        Back
                    </button>
                </Link>
            </div>
        </>
    );
}

export default VoiceSelectorPage;
