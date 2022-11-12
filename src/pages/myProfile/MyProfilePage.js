import { React, useEffect, useState, useContext, useRef } from "react";
import AuthContext from "../../components/store/auth-context";
import Nav from "../../components/nav/Nav";
import { db } from "../../firebase-config";
import { updateDoc, getDoc, doc } from "firebase/firestore";
import classes from "./myProfile.module.css";
import { storage } from "../../firebase-config";
import { initializeApp } from "firebase/app";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";

function MyProfilePage() {
  const aboutMeRef = useRef();
  const aboutHLRef = useRef();
  const birthDateRef = useRef();
  const genderRef1 = useRef();
  const genderRef2 = useRef();

  const [userData, setUserData] = useState(null);
  const [editProfile, setEditProfile] = useState(false);
  const [country, setCountry] = useState(null);
  const [region, setRegion] = useState(null);
  const [UId, setUId] = useState(null);
  const [file, setFile] = useState(null);
  const [uploadMsg, setUploadMsg] = useState("");
  const [oldPicURL, setOldPicURL] = useState(null);
  const [picURL, setPicURL] = useState(null);
  const [hideLocation, setHideLocation] = useState(null);
  const [hideAge, setHideAge] = useState(null);
  const [hidePronouns, setHidePronouns] = useState(null);
  const user = useContext(AuthContext).fbUser;

  useEffect(async () => {
    const getUserData = async function () {
      const myUId = doc(db, user);
      setUId(myUId);
      const result = await getDoc(myUId);
      setUserData(result.data());
      setHideLocation(result.data().privateLocation);
      setHideAge(result.data().privateAge);
      setHidePronouns(result.data().privatePronouns);
      setOldPicURL(result.data().profilePic);
      console.log(userData);
    };
    await getUserData();
  }, []);

  useEffect(async () => {
    const picDataForUpdate = {
      profilePic: picURL,
    };

    if (picURL != null) {
      await updateDoc(UId, picDataForUpdate);
      setUploadMsg("Image uploaded successfully!");
      setOldPicURL(picURL);
    }
  }, [picURL]);

  const handleUpload = () => {
    setUploadMsg("Initializing upload...");

    if (
      userData.profilePic !=
      "https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/profilePictures%2Fdefault%2Fdefault.jpg?alt=media&token=276e66bb-1827-403b-bb6a-839d6cb9916b"
    ) {
      console.log("deleting old photo");
      const oldImageReference = ref(storage, oldPicURL);
      deleteObject(oldImageReference);
    }

    const storageRef = ref(
      storage,
      "/profilePictures/" + UId.id + "/" + file.name
    );

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setUploadMsg("Uploading: " + percent + "%");
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setPicURL(url);
        });
      }
    );
  };

  const updateInfo = async () => {
    console.log(userData);
    const enteredAboutMe = aboutMeRef.current.value;
    const enteredAboutHL = aboutHLRef.current.value;
    const enteredBirthDate = birthDateRef.current.value;
    const enteredGender1 = genderRef1.current.value;
    const enteredGender2 = genderRef2.current.value;

    const userDataForUpdate = {
      aboutMe: enteredAboutMe,
      aboutHearingLoss: enteredAboutHL,
      birthDate: enteredBirthDate,
      genderPronoun1: enteredGender1,
      genderPronoun2: enteredGender2,
      privateLocation: hideLocation,
      privateAge: hideAge,
      privatePronouns: hidePronouns,
    };

    if (country != null) {
      userDataForUpdate.country = country;
    }

    if (region != null) {
      userDataForUpdate.region = region;
    }

    await updateDoc(UId, userDataForUpdate);

    window.location.reload();
  };

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
              {!hideLocation && (
                <p className={classes.user_subinfo}>
                  {userData.country}, {userData.region}
                </p>
              )}
              {!hideAge && (
                <p className={classes.user_subinfo}>
                  {Math.floor(
                    Math.abs(new Date() - Date.parse(userData.birthDate)) /
                      31536000000
                  )}{" "}
                  years old
                </p>
              )}
              {!hidePronouns && (
                <p className={classes.user_subinfo}>
                  {userData.genderPronoun1} / {userData.genderPronoun2}
                </p>
              )}
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
                    onChange={(val) => setFile(val.target.files[0])}
                  ></input>
                  {file && (
                    <button
                      onClick={handleUpload}
                      className={classes.upload_button}
                    >
                      Upload Image
                    </button>
                  )}
                  <p className={classes.upload_msg}>{uploadMsg}</p>
                  <h5>About Me:</h5>
                  <textarea className={classes.text_box} ref={aboutMeRef}>
                    {userData.aboutMe}
                  </textarea>
                  <h5>About My Hearing Loss:</h5>
                  <textarea className={classes.text_box} ref={aboutHLRef}>
                    {userData.aboutHearingLoss}
                  </textarea>
                  <h5>Change Birth Date:</h5>
                  <input
                    className={classes.date_select}
                    ref={birthDateRef}
                    defaultValue={userData.birthDate}
                    type="date"
                  ></input>
                  <h5>Change Country and Region:</h5>
                  <CountryDropdown
                    className={classes.drop_down}
                    value={country}
                    onChange={(val) => {
                      setCountry(val);
                    }}
                  />
                  <RegionDropdown
                    className={classes.drop_down}
                    country={country}
                    value={region}
                    onChange={(val) => {
                      setRegion(val);
                    }}
                  />
                  <h5>Change Pronouns:</h5>
                  <select className={classes.drop_down} ref={genderRef1}>
                    <option
                      value={userData.genderPronoun1}
                      selected
                      disabled
                      hidden
                    >
                      {userData.genderPronoun1}
                    </option>
                    <option value="She">She</option>
                    <option value="He">He</option>
                    <option value="They">They</option>
                    <option value="Zie">Zie</option>
                    <option value="Sie">Sie</option>
                    <option value="Ey">Ey</option>
                    <option value="Ve">Ve</option>
                    <option value="Tey">Tey</option>
                    <option value="E">E</option>
                  </select>
                  <select className={classes.drop_down} ref={genderRef2}>
                    <option
                      value={userData.genderPronoun2}
                      selected
                      disabled
                      hidden
                    >
                      {userData.genderPronoun2}
                    </option>
                    <option value="Her">Her</option>
                    <option value="Him">Him</option>
                    <option value="Them">Them</option>
                    <option value="Zim">Zim</option>
                    <option value="Sie">Sie</option>
                    <option value="Em">Em</option>
                    <option value="Ver">Ver</option>
                    <option value="Ter">Ter</option>
                    <option value="Em">Em</option>
                  </select>
                  <br></br>
                  <input
                    type="checkbox"
                    id="hideLocation"
                    defaultChecked={userData.privateLocation}
                    onChange={(e) => setHideLocation(e.target.checked)}
                  />
                  <label for="hideLocation" className={classes.checkbox_label}>
                    {" "}
                    Hide Location
                  </label>
                  <input
                    type="checkbox"
                    id="hideAge"
                    defaultChecked={userData.privateAge}
                    onChange={(e) => setHideAge(e.target.checked)}
                  />
                  <label for="hideAge" className={classes.checkbox_label}>
                    {" "}
                    Hide Age
                  </label>
                  <input
                    type="checkbox"
                    id="hidePronouns"
                    defaultChecked={userData.privatePronouns}
                    onChange={(e) => setHidePronouns(e.target.checked)}
                  />
                  <label for="hidePronouns" className={classes.checkbox_label}>
                    {" "}
                    Hide Pronouns
                  </label>
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
              onClick={() => updateInfo()}
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
