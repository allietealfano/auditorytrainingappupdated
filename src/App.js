import { React, useContext } from "react";
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
import LingDiscriminationPage from "./pages/ling/LingDiscriminationPage";
import LingIdentificationPage from "./pages/ling/LingIdentificationPage";
import LingIdentificationPage2 from "./pages/ling/LingIdentificationPage2";
import ActivityPage from "./pages/activityPage/ActivityPage";
import GamePageDetection from "./pages/gamePage/GamePageDetection";
import DetectionForum from "./pages/forum/DetectionForum";
import DiscriminationForum from "./pages/forum/DiscriminationForum";
import IdentificationForum from "./pages/forum/IdentificationForum";
import MyProfilePage from "./pages/myProfile/MyProfilePage";
import ReportsPage2 from "./pages/reportsPage/reportsPage2";

function App() {
  const authContext = useContext(AuthContext);

  return (
    <Router>
      <IdleTimerContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/reset" element={<ResetPage />} />
        <Route
          path="/dashboard"
          element={
            authContext.isLoggedIn ? <DashboardPage /> : <Navigate to="/auth" />
          }
        />
        <Route
          path="/activity"
          element={
            authContext.isLoggedIn ? <ActivityPage /> : <Navigate to="/auth" />
          }
        />
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
            authContext.isLoggedIn ? <ReportsPage2 /> : <Navigate to="/auth" />
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
        <Route path="/DetectionForum" element={<DetectionForum />} />
        <Route path="*" element={<HomePage />} />
        <Route path="/DiscriminationForum" element={<DiscriminationForum />} />
        <Route path="*" element={<HomePage />} />
        <Route path="/IdentificationForum" element={<IdentificationForum />} />
        <Route
          path="/myprofile"
          element={
            authContext.isLoggedIn ? <MyProfilePage /> : <Navigate to="/auth" />
          }
        />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
