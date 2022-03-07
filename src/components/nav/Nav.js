import { React, useContext, useState } from "react";
import { Link } from "react-router-dom";

import "./nav.css";

import AuthContext from "../store/auth-context";

function Nav() {
  const authContext = useContext(AuthContext);
  const isLoggedIn = authContext.isLoggedIn;

  return (
    <>
      <nav>
        {!isLoggedIn ? (
          <div>
            <Link to="/auth" state={{ signIn: true }}>
              <button className="btn-blue"> Sign In</button>
            </Link>
            <Link to="/auth" state={{ signIn: false }}>
              <button className="btn-blue"> Sign Up</button>
            </Link>
          </div>
        ) : (
          <div>
            <Link to="/">
              <button className="btn-blue" onClick={authContext.logout}>
                Log Out
              </button>
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}

export default Nav;
