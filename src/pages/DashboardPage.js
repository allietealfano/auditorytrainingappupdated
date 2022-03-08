import React from "react";
import { Link } from "react-router-dom";

import Pop from "../components/soundCheck/Pop";

function DashboardPage() {
  return (
    <div>
      <Pop />
      <nav>
        <ul>
          <Link to="/"><li className="active">Mission Audition!</li></Link>
          <Link to="/auth" state={{ signIn: true }}><li>Sign In</li></Link>
          <Link to="/auth" state={{ signIn: false }}><li>Sign Up</li></Link>
          <Link to="/dashboard"><li>Dashboard</li></Link>
       

      </ul>
</nav>
      <br />
      <p>Dashboard Page</p>
    </div>
  );
}

export default DashboardPage;
