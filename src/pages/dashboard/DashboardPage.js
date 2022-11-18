import { React, useState } from "react";

import Nav from "../../components/nav/Nav";
//import Cards from "../../components/cardsLatest/Cards";

import Options from "../../components/options/Options";
import { allDashboardOptions } from "../../helpers/allDashboardOptions";

import classes from "./dashboardPage.module.css";

function DashboardPage() {
  return (
    <>
      <Nav />
      {
        <div>
          <div className={classes.main__container}>
            <Options
              title={"Options"}
              optionsArr={allDashboardOptions.dashPage}
            />
          </div>
        </div>
      }
    </>
  );
}

export default DashboardPage;
