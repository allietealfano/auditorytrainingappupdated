import "./reportsPage2.module.css";
import AuthContext from "../../components/store/auth-context";
import mock from "./MOCK_DATA.json";

import { useContext, useEffect, useState, useRef } from "react";
import React, { useMemo } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import useFetch from "../../components/custHooks/useFetch";
import Nav from "../../components/nav/Nav";

import MaterialReactTable from "material-react-table";

const date = new Date().toLocaleString("en-GB", { timeZone: "EST" });
//Retrieve user history

function ReportsPage2() {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const user = useContext(AuthContext).fbUser;

  const firstUpdate = useRef(true);

  const [[activityData], isPending, err] = useFetch("allActivitiesObj");

  useEffect(async () => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    const getData = async function () {
      if (isPending) {
        setIsLoading(true);
      } else {
        setIsRefetching(true);
      }

      setUserData(activityData?.activitydetection.completions);

      // if (!data.length) {
      //     setIsLoading(true);
      // } else {
      //     setIsRefetching(true);
      // }
      // const userData = doc(db, user);
      // const result = await getDoc(userData);
      // //TODO: Add loading screen while data is being retrieved
      // if(result.exists()){
      //     //setData(result?.data().allActivitiesObj);
      //     setData(result?.data());
      // }
      // else{
      //     console.log("ERROR: NO DATA RETRIEVED");
      // }
    };

    await getData();
    console.log("DATA", userData);
    setIsLoading(false);
    setIsRefetching(false);
  }, [activityData, isPending]);

  const columns = useMemo(
    () => [
      {
        accessorKey: `0.completions.score`,
        header: "ACTIVITY NAME",
      },
      {
        accessorKey: "0.completions.date",
        header: "LAST",
      },
      {
        accessorKey: "1.completions.score",
        header: "ACTIVITIES",
      },
    ],
    []
  );

  return (
    <div>
      {userData && (
        <div>
          <Nav />
          <MaterialReactTable
            columns={columns}
            data={userData}
            initialState={{ isLoading }}
            state={{ isLoading, showProgressBars: isRefetching }}
          />
        </div>
      )}
    </div>
  );
}

export default ReportsPage2;
