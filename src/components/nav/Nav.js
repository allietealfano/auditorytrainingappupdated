import { React, useContext, useState } from "react";
import { Link } from "react-router-dom";

import "./nav.css";

import AuthContext from "../store/auth-context";

function Nav() {
  const authContext = useContext(AuthContext);
  const isLoggedIn = authContext.isLoggedIn;

  return (
    <nav>
      {!isLoggedIn ? (
        <ul className="nav-ul">
          <Link to="/">
            <li className="active">
              <p>Mission Audition!</p>
            </li>
          </Link>
          <Link to="/auth" state={{ signIn: true }}>
            <li className="not-active">
              <p>Sign In</p>
            </li>
          </Link>
          <Link to="/auth" state={{ signIn: false }}>
            <li className="not-active">
              <p>Sign Up</p>
            </li>
          </Link>
        </ul>
      ) : (
        <ul className="nav-ul">
          <Link to="/">
            <li className="active">
              <p>Mission Audition!</p>
            </li>
          </Link>
          <Link to="/dashboard">
            <li className="not-active">
              <p>Dashboard</p>
            </li>
          </Link>
          <Link to="/">
            <li className="not-active" onClick={authContext.logout}>
              <p>Logout</p>
            </li>
          </Link>
        </ul>
      )}
    </nav>
  );
}

export default Nav;
