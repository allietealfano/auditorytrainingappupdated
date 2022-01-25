import React from "react";
import { Link } from "react-router-dom";

function LoginForm() {
  return (
    <div>
      <form className="form">
        <div className="form__group">
          <input
            className="form__input"
            id="email"
            type="email"
            placeholder="Email Address"
            required
          ></input>
          <label htmlFor="email">Email</label>
        </div>

        <div className="form__group">
          <input
            className="form__input"
            id="password"
            type="password"
            placeholder="Password"
            minLength="6"
            required
          ></input>
          <label htmlFor="password">Password</label>
        </div>

        <div className="form__group">
          <button className="btn">Next step &rarr;</button>
        </div>
      </form>

      <p>
        Don't Have An account?
        <Link to="/signUp">
          <button className="btn">Sign Up</button>
        </Link>
      </p>
    </div>
  );
}

export default LoginForm;
