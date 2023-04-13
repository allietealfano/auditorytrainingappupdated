import {useContext, useEffect, useState, useMemo} from "react";
import Nav from "../../components/nav/Nav";
import {doc, getDoc} from "firebase/firestore";
import AuthContext from "../../components/store/auth-context";

import { useTable } from "react-table";
import { db } from "../../firebase-config";
import classes from "./reportsPage.module.css";
//import { getHistory } from "Complete";


const date = new Date().toLocaleString('en-GB',{timeZone: 'EST'});


function ReportsPage() {

  const user = useContext(AuthContext).fbUser;
  const [dataFromDB, setDataFromDB] = useState([]);

  useEffect(() => {
    const getHistory = async () => {
      const UId = doc(db, user);
      const prevHistory = await getDoc(UId);
      setDataFromDB(prevHistory.dataFromDB().allActivitiesObj.activitydetection.completions);
    }

    getHistory();
  })

  const data = useMemo(() => db, []);
  const columns = useMemo(
    () => [
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Time",
        accessor: "time",
      },
      {
        Header: "Activity Name",
        accessor: "latestActivities/title",
      },
      {
        Header: "Score",
        accessor: "score",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
  useTable({ columns, data });

  return (
    <>
    <Nav />
    {(
      <div>
        <div class = {classes.header}>
          <h1>Reports</h1>
          <p>Look below for your Game scores</p>
        </div>

        
        <div> 
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>

      </div>
    )}
  </>
  );
}


export default ReportsPage;

{/* <ol>
  {data.map(data => (
    <li key={data.date}>Score: {data.score}     Date:{data.date}</li>
  ))}
</ol> */}