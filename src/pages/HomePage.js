import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <h2>
        HomePage Components
        <br />
        <Link to="/auth">Login</Link>
        <Link to="/auth">Sign Up</Link>
      </h2>
    </div>
  );
}

export default HomePage;
