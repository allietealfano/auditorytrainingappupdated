import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <h2>
        HomePage Components
        <br />
        <Link to="/auth" state={{ signIn: true }}>
          Sign In
        </Link>
        <Link to="/auth" state={{ signIn: false }}>
          Sign Up
        </Link>
      </h2>
    </div>
  );
}

export default HomePage;
