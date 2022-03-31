import { React, useContext, useEffect, useCallback } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import AuthContext from "./components/store/auth-context";
import IdleTimerContainer from "./components/store/IdleTimerContainer";
import ResetPage from "./pages/reset/ResetPage";
import LingDetectionPage from "./pages/ling/LingDetectionPage";
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
          path="auth"
          element={
            !authContext.isLoggedIn ? (
              <AuthPage />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
