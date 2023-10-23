import { React, useContext, createContext, useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import HomePage from "./pages/homePage/HomePage";
import AuthPage from "./pages/auth/AuthPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import AuthContext from "./components/store/auth-context";
import IdleTimerContainer from "./components/store/IdleTimerContainer";
import ResetPage from "./pages/reset/ResetPage";
import LingDetectionPage from "./pages/ling/LingDetectionPage";
import LingDetectionPageGame2 from "./pages/ling/LingDetectionPageGame2";
import LingDiscriminationPage from "./pages/ling/LingDiscriminationPage";
import LingDiscriminationPageGame2 from "./pages/ling/LingDiscriminationPageGame2";
import LingIdentificationPage from "./pages/ling/LingIdentificationPage";
import LingIdentificationPage2 from "./pages/ling/LingIdentificationPage2";
import ActivityPage from "./pages/activityPage/ActivityPage";
import GamePageDetection from "./pages/gamePage/GamePageDetection";
import GamePageDiscrimination from "./pages/gamePage/GamePageDiscrimination";
import GamePageIdentification from "./pages/gamePage/GamePageIdentification";
import DetectionForum from "./pages/forum/DetectionForum";
import MyProfilePage from "./pages/myProfile/MyProfilePage";
import ReportsPage2 from "./pages/reportsPage/reportsPage2";
import Settings from "./pages/settings/Settings";
import SupportPage from "./pages/supportPage/SupportPage";
import InBetweenPage from "./pages/inBetweenPage/inBetweenPage";
import VoiceSelectorPage from "./pages/voiceSelectorPage/voiceSelectorPage";

export const ThemeContext = createContext(null);

function App() {
    const authContext = useContext(AuthContext);

    // Themes
    const [theme, setTheme] = useState("light");

    const toggleTheme = () => {
        setTheme((curr) => (curr === "light" ? "dark" : "light"));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <div className="App" id={theme}>
                <Router>
                    <IdleTimerContainer />
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/reset" element={<ResetPage />} />
                        <Route
                            path="/dashboard"
                            element={
                                authContext.isLoggedIn ? (
                                    <DashboardPage />
                                ) : (
                                    <Navigate to="/auth" />
                                )
                            }
                        />
                        <Route
                            path="/activity"
                            element={
                                authContext.isLoggedIn ? (
                                    <ActivityPage />
                                ) : (
                                    <Navigate to="/auth" />
                                )
                            }
                        />
                        <Route
                            path="/activity/inBetweenPage"
                            element={
                                authContext.isLoggedIn ? (
                                    <InBetweenPage />
                                ) : (
                                    <Navigate to="/auth" />
                                )
                            }
                        />
                        <Route
                            path="/activity/voiceSelector"
                            element={
                                authContext.isLoggedIn ? (
                                    <VoiceSelectorPage />
                                ) : (
                                    <Navigate to="/auth" />
                                )
                            }
                        />
                        {/* Here would be in-between page*/}
                        <Route
                            path="/activity/detection"
                            element={
                                authContext.isLoggedIn ? (
                                    <GamePageDetection />
                                ) : (
                                    <Navigate to="/auth" />
                                )
                            }
                        />
                        <Route
                            path="/activity/discrimination"
                            element={
                                authContext.isLoggedIn ? (
                                    <GamePageDiscrimination />
                                ) : (
                                    <Navigate to="/auth" />
                                )
                            }
                        />
                        <Route
                            path="/activity/identification"
                            element={
                                authContext.isLoggedIn ? (
                                    <GamePageIdentification />
                                ) : (
                                    <Navigate to="/auth" />
                                )
                            }
                        />
                        <Route
                            path="/lingActivity/detection"
                            element={
                                authContext.isLoggedIn ? (
                                    <LingDetectionPage />
                                ) : (
                                    <Navigate to="/auth" />
                                )
                            }
                        />
                        <Route
                            path="/lingActivity/detectionGame2"
                            element={
                                authContext.isLoggedIn ? (
                                    <LingDetectionPageGame2 />
                                ) : (
                                    <Navigate to="/auth" />
                                )
                            }
                        />
                        <Route
                            path="/lingActivity/discrimination"
                            element={
                                authContext.isLoggedIn ? (
                                    <LingDiscriminationPage />
                                ) : (
                                    <Navigate to="/auth" />
                                )
                            }
                        />
                        <Route
                            path="/lingActivity/discriminationGame2"
                            element={
                                authContext.isLoggedIn ? (
                                    <LingDiscriminationPageGame2 />
                                ) : (
                                    <Navigate to="/auth" />
                                )
                            }
                        />
                        <Route
                            path="/lingActivity/identification"
                            element={
                                authContext.isLoggedIn ? (
                                    <LingIdentificationPage />
                                ) : (
                                    <Navigate to="/auth" />
                                )
                            }
                        />
                        <Route
                            path="/lingActivity/identification2"
                            element={
                                authContext.isLoggedIn ? (
                                    <LingIdentificationPage2 />
                                ) : (
                                    <Navigate to="/auth" />
                                )
                            }
                        />
                        <Route
                            path="/reportsPage2"
                            element={
                                authContext.isLoggedIn ? (
                                    <ReportsPage2 />
                                ) : (
                                    <Navigate to="/auth" />
                                )
                            }
                        />
                        <Route
                            path="/supportPage"
                            element={
                                authContext.isLoggedIn ? (
                                    <SupportPage />
                                ) : (
                                    <Navigate to="/auth" />
                                )
                            }
                        />
                        <Route
                            path="auth"
                            element={
                                !authContext.isLoggedIn ? (
                                    <AuthPage />
                                ) : (
                                    <Navigate to="/dashboard" />
                                )
                            }
                        />
                        <Route
                            path="/settings"
                            element={
                                authContext.isLoggedIn ? (
                                    <Settings />
                                ) : (
                                    <Navigate to="/auth" />
                                )
                            }
                        />
                        <Route
                            path="/DetectionForum"
                            element={
                                authContext.isLoggedIn ? (
                                    <DetectionForum />
                                ) : (
                                    <Navigate to="/auth" />
                                )
                            }
                        />
                        <Route
                            path="/myprofile"
                            element={
                                authContext.isLoggedIn ? (
                                    <MyProfilePage />
                                ) : (
                                    <Navigate to="/auth" />
                                )
                            }
                        />
                        <Route path="*" element={<HomePage />} />
                    </Routes>
                </Router>
            </div>
        </ThemeContext.Provider>
    );
}

export default App;
