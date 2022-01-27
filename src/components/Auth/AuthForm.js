import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function AuthForm() {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();

  const navigate = useNavigate();

  const switchHandler = (e) => {
    e.preventDefault();
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={API KEY}";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key={API KEY}";
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
            let errorMessage = "authentification Failed: ";
            if (data && data.error.message) errorMessage += data.error.message;
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        navigate("/dashboard", { replace: true });
      })
      .catch((err) => {
        alert(err.message.toLowerCase().replace("_", " ") + ".");
      });
  };
  return (
    <div className="body">
      <div className="form__container">
        <form onSubmit={submitHandler} className="form">
          <h1 className="form__header">{isLogin ? "Sign In" : "Sign Up"}</h1>
          {!isLogin ? (
            <div className="form__group">
              <input
                className="form__input"
                id="first-name"
                type="text"
                placeholder="First Name"
                required
                ref={firstNameInputRef}
              />
              <label className="form__label" htmlFor="first-name">
                First Name
              </label>
            </div>
          ) : (
            ""
          )}
          {!isLogin ? (
            <div className="form__group">
              <input
                className="form__input"
                id="last-name"
                type="text"
                placeholder="Last Name"
                required
                ref={lastNameInputRef}
              />
              <label className="form__label" htmlFor="last-name">
                Last Name
              </label>
            </div>
          ) : (
            ""
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
            <label className="form__label" htmlFor="email">
              Email
            </label>
          </div>

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
            <label className="form__label" htmlFor="password">
              Password
            </label>
          </div>

          <div className="form__group">
            {!isLoading ? (
              <button className="btn">
                {isLogin ? "Sign In" : "Sign Up"} &rarr;
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
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
          </p>
          <p onClick={switchHandler}>{isLogin ? "Sign Up" : "Sign In"}</p>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
