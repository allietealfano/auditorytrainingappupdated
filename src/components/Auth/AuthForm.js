import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { setDoc, doc, getDoc } from "firebase/firestore";

import { getAuth, sendPasswordResetEmail } from "firebase/auth";

import AuthContext from "../store/auth-context";
import { db, apiKey } from "../../firebase-config";

import "./authForm.css";

function AuthForm(props) {
  const [isLogin, setIsLogin] = useState(props.signIn);
  const [isReset, setIsReset] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();

  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const switchHandler = (e) => {
    e.preventDefault();
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (isReset) {
      resetPassword();
      return;
    }

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredFname = isLogin ? "" : firstNameInputRef.current.value;
    const enteredLname = isLogin ? "" : lastNameInputRef.current.value;

    setIsLoading(true);
    let url;
    if (isLogin) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
    } else {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Whoops: ";
            if (data?.error.message) errorMessage += data.error.message;
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        setIsLoading(true);

        if (!isLogin) {
          const userData = {
            fName: enteredFname,
            lName: enteredLname,
            email: enteredEmail,
          };
          const UId = doc(db, `users/${data.localId}`);
          setDoc(UId, userData);
        } // localStorage.setItem("refToken", data.refreshToken.toString());
        localStorage.setItem("user", data.localId.toString());
        const expTime = new Date(new Date().getTime() + +data.expiresIn * 1000);
        authContext.login(data.idToken, expTime);
        navigate("/dashboard", { replace: true });
        setIsLoading(false);
      })
      .catch((err) => {
        alert(err.message.toLowerCase().replace("_", " ") + ".");
        // Errors should be handled by a state that displays them to the user instead of an alert
      });
  };

  const resetPassword = () => {
    const auth = getAuth();
    const getFName = async function () {
      const docRef = doc(db, "users", localStorage.getItem("user"));
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) setEmail(docSnap.data().email);
    };
    getFName();

    sendPasswordResetEmail(auth, email)
      .then(() => {
        // alert("Password reset sent");
        navigate("/reset", { replace: true });
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // Errors should be handled by a state that displays them to the user
      });
  };

  return (
    <div className="form__container">
      <form onSubmit={submitHandler} className="form">
        &nbsp;
        <h2 className="form__header">
          {isReset ? "Password Reset" : isLogin ? "Sign In" : "Sign Up"}
        </h2>
        &nbsp;
        {isReset && (
          <p className="reset__prompt">
            Please enter your email address below, and a link to reset your
            password will be sent your email.
          </p>
        )}
        {!isLogin && (
          <div className="form__group">
            <input
              className="form__input"
              id="first-name"
              type="text"
              placeholder="First Name"
              required
              ref={firstNameInputRef}
            />
            <label className="form__label" htmlFor="first-name"></label>
          </div>
        )}
        {!isLogin && (
          <div className="form__group">
            <input
              className="form__input"
              id="last-name"
              type="text"
              placeholder="Last Name"
              required
              ref={lastNameInputRef}
            />
          </div>
        )}
        <div className="form__group">
          <input
            className="form__input"
            id="email"
            type="email"
            placeholder="Email Address"
            required
            ref={emailInputRef}
          />
        </div>
        {!isReset && (
          <div className="form__group">
            <input
              className="form__input"
              id="password"
              type="password"
              placeholder="Password"
              minLength="6"
              required
              ref={passwordInputRef}
            />
          </div>
        )}
        {isLogin && (
          <div className="form__group">
            <span
              onClick={() => setIsReset(!isReset)}
              className="span_underline"
            >
              {isReset ? "Sign In?" : "Forgot Password"}
            </span>
          </div>
        )}
        <div className="form__group">
          {!isLoading ? (
            <button className="btn-yellow">
              {isReset ? "Reset Password" : isLogin ? "Sign In" : "Sign Up"}
              &rarr;
            </button>
          ) : (
            <img
              className="loading-img"
              src={require("../../assets/images/loading.gif")}
              alt="Loading"
            />
          )}
        </div>
      </form>

      <div className="form__switcher">
        &nbsp;
        <p onClick={switchHandler}>
          {isReset
            ? ""
            : isLogin && (
                <span>
                  Don't have an account?
                  <span className="span_underline">Sign Up</span>
                </span>
              )}
          {!isLogin && (
            <span>
              Already have an account?
              <span className="span_underline">Sign In</span>
            </span>
          )}
        </p>
        &nbsp;
      </div>
    </div>
  );
}

export default AuthForm;
