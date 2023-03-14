import { React, useContext } from "react";
import { Link } from "react-router-dom";

import NavProfile from "./NavProfile";
import classes from "./nav.module.css";

import AuthContext from "../store/auth-context";

//Purpose: Navigation bar
function Nav() {

  //Check if user is signed in
  const authContext = useContext(AuthContext);
  const isLoggedIn = authContext.isLoggedIn;

  return (
    <nav>
      {/* Nav Bar if the user is not logged in */}
      {!isLoggedIn ? (
        <ul className={classes.nav__ul}>

          {/* Link to home page */}
          <Link to="/">
            <li className={classes.active}>
              <p>Auditory Training App!</p>
            </li>
          </Link>

          {/* Sign in */}
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
        // User signed in option
      ) : ( 
        <ul className={classes.nav__ul}>
          {/* Homepage link to */}
          <Link to="/">
            <li className={classes.active}>
              <p>Auditory Training App!</p>
            </li>
          </Link>
          {/* Instead of sign in, go to dashboard */}
          <Link to="/dashboard">
            <li className={classes.not__active}>
              <p>Dashboard</p>
            </li>
          </Link>
          {/* Go to profile */}
          <NavProfile />
        </ul>
      )}
    </nav>
  );
}

export default Nav;
