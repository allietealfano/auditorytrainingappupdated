import { React, useEffect, useState, useContext } from "react";
import AuthContext from "../../components/store/auth-context";
import Nav from "../../components/nav/Nav";
import { db } from "../../firebase-config";
import { updateDoc, getDoc, doc } from "firebase/firestore";
import classes from "./myProfile.module.css";

function MyProfilePage() {
  const [userData, setUserData] = useState(null);
  const [editProfile, setEditProfile] = useState(false);
  const user = useContext(AuthContext).fbUser;
  useEffect(() => {
    const getUserData = async function () {
      const UId = doc(db, user);
      const result = await getDoc(UId);
      setUserData(result.data());
    };
    getUserData();
  }, []);
  console.log(userData);
  return (
    <>
      <Nav />
      <div className={classes.main_container}>
        {userData && (
          <>
            <div className={classes.profile_container}>
              <img
                className={classes.img_container}
                src={userData.profilePic}
              />
              <h1>{userData.fName + " " + userData.lName}</h1>
              <p className={classes.user_subinfo}>
                {userData.country}, {userData.region} • 0 friends
              </p>
            </div>
            <div className={classes.aboutMe_container}>
              {!editProfile && (
                <div>
                  <h5>About Me:</h5>
                  <p className={classes.user_subinfo}>{userData.aboutMe}</p>
                  <h5> </h5>
                  <h5>About My Hearing Loss:</h5>
                  <p className={classes.user_subinfo}>
                    {userData.aboutHearingLoss}
                  </p>
                </div>
              )}
              {editProfile && (
                <div>
                  <h5>Upload Profile Picture:</h5>
                  <input
                    type="file"
                    accept="image/png, image/gif, image/jpeg"
                    className={classes.choose_file}
                  ></input>
                  <h5>About Me:</h5>
                  <textarea className={classes.text_box}></textarea>
                  <h5>About My Hearing Loss:</h5>
                  <textarea className={classes.text_box}></textarea>
                </div>
              )}
            </div>
          </>
        )}
        {!editProfile && (
          <button
            onClick={() => setEditProfile(true)}
            className={classes.profile_buttons}
          >
            Edit Profile
          </button>
        )}
        {editProfile && (
          <div>
            <button
              onClick={() => setEditProfile(false)}
              className={classes.save_button}
            >
              Save
            </button>
            <button
              onClick={() => setEditProfile(false)}
              className={classes.cancel_button}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default MyProfilePage;
