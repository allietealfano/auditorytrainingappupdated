import { React, useContext } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../store/auth-context";
import useFetch from "../custHooks/useFetch";
import classes from "./nav.module.css";

//Purpose: Profile corner of nav bar
function NavProfile() {
  //Retrieve name
  const [[fName], isPending, err] = useFetch("fName", "lName");

  const authContext = useContext(AuthContext);

  return (
    <div className={classes.nav__right}>
      <div className={classes.profile__items}>
        {/* Error catching */}
        {err ? (
          "Firebase Document Not Found!"
        ) : (
          // Otherwise, profile pic and name
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

        {/* Link to profile */}
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

          {/* Link to setting*/}
          {/* TODO: Change to setting page */}
          <Link to="/settings">
            <li className={classes.list__item}>
              <span>Settings</span>
              <img
                className={classes.ul__img}
                src={require("../../assets/icons/settings.png")}
                alt="settings"
              />
            </li>
          </Link>

          {/* Log out and end up at dashboard */}
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

      {/* Forum section of nav bar */}
      <div className={classes.forum__items}>
        <div className={classes.forum__pic_name}>
          <span className={classes.forum__text}>Forums</span>
          <div>
            <img
              className={classes.forum__img}
              src={require("../../assets/icons/forum.png")}
              alt="profile"
            />
          </div>
        </div>

        {/* Go to Detection Forum */}
        <ul className={classes.list__container}>
          <Link to="/DetectionForum">
            <li className={classes.list__item}>
              <span>Detection</span>
              <img
                className={classes.ul__img}
                src={require("../../assets/icons/volume.png")}
                alt="profile"
              />
            </li>
          </Link>

          {/* Discrimination Forum */}
          <Link to="/DiscriminationForum">
            <li className={classes.list__item}>
              <span>Discrimination</span>
              <img
                className={classes.ul__img}
                src={require("../../assets/icons/arrows.png")}
                alt="profile"
              />
            </li>
          </Link>

          {/* Identification Forum */}
          <Link to="/IdentificationForum">
            <li className={classes.list__item}>
              <span>Identification</span>
              <img
                className={classes.ul__img}
                src={require("../../assets/icons/ear.png")}
                alt="profile"
              />
            </li>
          </Link>
        </ul>
      </div>

      {/* Notification icon */}
      {/* TODO: FUNCTIONALITY */}
      <img
        className={classes.notification__img}
        src={require("../../assets/icons/notification.png")}
        alt="profile"
      />
    </div>
  );
}

export default NavProfile;
