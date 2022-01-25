import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <h2>
        HomePage Components
        <br></br>
        <Link to="/auth">Login</Link>
      </h2>
    </div>
  );
}

export default HomePage;
