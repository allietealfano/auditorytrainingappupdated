import React from "react";

import Nav from "../../components/nav/Nav";

import classes from "./resetPage.module.css";

//Page to reset password
function ResetPage() {
  return (
    <>
      {/* Nav bar */}
      <Nav />
      <div className={classes.reset__message}>
        <h1>Password Reset</h1>
        <p>
          A message has been sent to you by email with instructions on how to
          reset your password.
        </p>
      </div>
    </>
  );
}

export default ResetPage;
