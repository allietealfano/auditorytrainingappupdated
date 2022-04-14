import { React, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

import AuthContext from "../store/auth-context";
import { db } from "../../firebase-config";

import classes from "./nav.module.css";

function NavProfile() {
  const [fName, setFName] = useState("");
  const authContext = useContext(AuthContext);

  //To be used later, gets the logged in user's first name
  const getFName = async function () {
    const docRef = doc(db, "users", localStorage.getItem("user"));
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) setFName(docSnap.data().fName);
  };

  getFName();

  return (
    <div className={classes.nav__right}>
      <div className={classes.profile__items}>
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
        <ul className={classes.list__container}>
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
