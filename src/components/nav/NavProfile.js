import { React, useContext } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../store/auth-context";
import useFetch from "../custHooks/useFetch";
import classes from "./nav.module.css";

function NavProfile() {
  const [[fName], isPending, err] = useFetch("fName", "lName");

  const authContext = useContext(AuthContext);

  return (
    <div className={classes.nav__right}>
      <div className={classes.profile__items}>
        {err ? (
          "Firebase Document Not FOund!"
        ) : (
          <div className={classes.profile__pic_name}>
            <span className={classes.profile__text}>{fName}</span>
            <div className={classes.img__container}>
              <img
                className={classes.profile__img}
                src={require("../../assets/images/test-founder.jpg")}
                alt="profile"
              />
            </div>
          </div>
        )}
        <ul className={classes.list__container}>
          <Link to="/myprofile">
            <li className={classes.list__item}>
              <span>My Profile</span>
              <img
                className={classes.ul__img}
                src={require("../../assets/icons/profile.png")}
                alt="settings"
              />
            </li>
          </Link>
          <Link to="/dashboard">
            <li className={classes.list__item}>
              <span>Settings</span>
              <img
                className={classes.ul__img}
                src={require("../../assets/icons/settings.png")}
                alt="settings"
              />
            </li>
          </Link>
          <Link to="/dashboard">
            <li className={classes.list__item} onClick={authContext.logout}>
              <span>Logout</span>
              <img
                className={classes.ul__img}
                src={require("../../assets/icons/logout.png")}
                alt="logout"
              />
            </li>
          </Link>
        </ul>
      </div>
      <img
        className={classes.notification__img}
        src={require("../../assets/icons/notification.png")}
        alt="profile"
      />
    </div>
  );
}

export default NavProfile;
