import { React, useContext } from "react";
import { Link } from "react-router-dom";

import classes from "./nav.module.css";

import AuthContext from "../store/auth-context";

function Nav() {
  const authContext = useContext(AuthContext);
  const isLoggedIn = authContext.isLoggedIn;

  return (
    <nav>
      {!isLoggedIn ? (
        <ul className={classes.nav__ul}>
          <Link to="/">
            <li className={classes.active}>
              <p>Mission Audition!</p>
            </li>
          </Link>
          <Link to="/auth" state={{ signIn: true }}>
            <li className={classes.not__active}>
              <p>Sign In</p>
            </li>
          </Link>
          <Link to="/auth" state={{ signIn: false }}>
            <li className={classes.not__active}>
              <p>Sign Up</p>
            </li>
          </Link>
        </ul>
      ) : (
        <ul className={classes.nav__ul}>
          <Link to="/">
            <li className={classes.active}>
              <p>Mission Audition!</p>
            </li>
          </Link>
          <Link to="/dashboard">
            <li className={classes.not__active}>
              <p>Dashboard</p>
            </li>
          </Link>
          <Link to="/">
            <li className={classes.not__active} onClick={authContext.logout}>
              <p>Logout</p>
            </li>
          </Link>
        </ul>
      )}
    </nav>
  );
}

export default Nav;
