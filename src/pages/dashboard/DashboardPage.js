import { React, useState } from "react";

import Nav from "../../components/nav/Nav";

import Options from "../../components/options/Options";
import { allDashboardOptions } from "../../helpers/allDashboardOptions";

import classes from "./dashboardPage.module.css";

/**Dashboard page */
function DashboardPage() {
  return (
    <>
      <Nav />
      {
        <div>
          <div className={classes.main__container}>
            {/* Card options in the dashboard - do not req lvl colors so diff component created */}
            <Options
              optionsArr={allDashboardOptions.dashPage}
            />
          </div>
        </div>
      }
    </>
  );
}

export default DashboardPage;
