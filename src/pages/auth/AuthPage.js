import React from "react";
import { useLocation } from "react-router-dom";

import AuthForm from "../../components/auth/AuthForm";

function AuthPage() {
  const location = useLocation();

  return (
    <div
      style={{
        backgroundColor: "rgb(93, 173, 226)",
        height: "100vh",
        width: "100vw",
      }}
    >
      <AuthForm signIn={location?.state?.signIn ?? true} />
    </div>
  );
}

export default AuthPage;
