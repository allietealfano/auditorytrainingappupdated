import { useContext, useEffect, useState, useRef } from "react";
import useFetch from "../../components/custHooks/useFetch";
import Nav from "../../components/nav/Nav";
import classes from "./reportsPage2.module.css";
import Button from "react-bootstrap/Button";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const date = new Date().toLocaleString("en-GB", { timeZone: "EST" });
//Retrieve user history

function ReportsPage2() {
  const [detectionData, setDetectionData] = useState([]);
  const [discriminationData, setDiscriminationData] = useState([]);
  const [identificationData, setIdentificationData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);

  const firstUpdate = useRef(true);

  const [[activityData], isPending, err] = useFetch("allActivitiesObj");

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      fontSize: 18,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 16,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

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

      setDetectionData(activityData?.activitydetection.completions);

      //TODO: UPDATE DB TO BE CONSISTENT IN REFERENCE (lingActivity vs activity)
      setDiscriminationData(
        activityData?.lingActivitydiscrimination.completions
      );
      setIdentificationData(
        activityData?.lingActivityidentification.completions
      );
    };

    await getData();
    console.log("DATA", detectionData);
    setIsLoading(false);
    setIsRefetching(false);
  }, [activityData, isPending]);

  const rowsDetection = detectionData?.map((item) => ({
    score: item.score,
    date: item.date,
  }));

  const rowsDiscrimination = discriminationData?.map((item) => ({
    score: item.score,
    date: item.date,
  }));

  const rowsIdentification = identificationData?.map((item) => ({
    score: item.score,
    date: item.date,
  }));

  return (
    <div>
      {detectionData && (
        <div>
          <div>
            <Nav />
          </div>
          <div className={classes.header}>
            <h1>Reports Page</h1>
          </div>
          <div className={classes.headertxt}>
            <p>
              Welcome to the Reports Page, where you can view your activity
              history.
            </p>
          </div>
          <div className={classes.btnparent}>
            <Button
              as="input"
              type="button"
              value="Export"
              className={classes.button}
            />{" "}
            <Button
              as="input"
              type="submit"
              value="Share"
              className={classes.button}
            />{" "}
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Activity Type</StyledTableCell>
                  <StyledTableCell>Date</StyledTableCell>
                  <StyledTableCell>Score</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rowsDetection.map((row) => (
                  <StyledTableRow>
                    <StyledTableCell size="small">Detection</StyledTableCell>
                    <StyledTableCell>{row.date}</StyledTableCell>
                    <StyledTableCell>{row.score}</StyledTableCell>
                  </StyledTableRow>
                ))}
                {rowsDiscrimination.map((row) => (
                  <StyledTableRow>
                    <StyledTableCell size="small">
                      Discrimination
                    </StyledTableCell>
                    <StyledTableCell>{row.date}</StyledTableCell>
                    <StyledTableCell>{row.score}</StyledTableCell>
                  </StyledTableRow>
                ))}
                {rowsIdentification.map((row) => (
                  <StyledTableRow>
                    <StyledTableCell size="small">
                      Identification
                    </StyledTableCell>
                    <StyledTableCell>{row.date}</StyledTableCell>
                    <StyledTableCell>{row.score}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
}

export default ReportsPage2;
