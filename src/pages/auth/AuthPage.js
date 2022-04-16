import React from "react";
import { useLocation } from "react-router-dom";

import AuthForm from "../../components/auth/AuthForm";

function AuthPage() {
  const location = useLocation();

  return <AuthForm signIn={location?.state?.signIn ?? true} />;
}

export default AuthPage;
