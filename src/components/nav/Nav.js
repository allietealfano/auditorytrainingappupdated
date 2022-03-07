import { React, useContext, useState } from "react";
import { Link } from "react-router-dom";

import "./nav.css";

import AuthContext from "../store/auth-context";

function Nav() {
  const [isLoading, setIsLoading] = useState();
  const authContext = useContext(AuthContext);
  const isLoggedIn = authContext.isLoggedIn;

  //Logout is very abrupt, a loading is set only for UX
  const logoutHandler = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      authContext.logout();
    }, 500);
  };

  return (
    <div>
      {!isLoading ? (
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
                <button className="btn-blue" onClick={logoutHandler}>
                  Log Out
                </button>
              </Link>
            </div>
          )}
        </nav>
      ) : (
        <div className="loading-img-container">
          <img
            className="loading-img"
            src={require("../../assets/images/loading.gif")}
            alt="Loading"
          />
        </div>
      )}
    </div>
  );
}

export default Nav;
