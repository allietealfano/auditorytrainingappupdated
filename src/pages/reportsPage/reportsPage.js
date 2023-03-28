
import "./reportsPage2.module.css";
import AuthContext from "../../components/store/auth-context";
import mock from "./MOCK_DATA.json";

import { useContext, useEffect, useState } from "react";
import React, { useMemo } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import useFetch from "../../components/custHooks/useFetch";

import MaterialReactTable from 'material-react-table';
import Nav from "../../components/nav/Nav";
import classes from "./reportsPage2.module.css"

// import Button from 'react-bootstrap/Button';
//<script src="https://unpkg.com/bootstrap-table@1.21.3/dist/extensions/export/bootstrap-table-export.min.js"></script>


const date = new Date().toLocaleString('en-GB',{timeZone: 'EST'});
 //Retrieve user history

function ReportsPage2() {

    const [data, setData] = useState([mock]);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefetching, setIsRefetching] = useState(false);
    const user = useContext(AuthContext).fbUser;

    const [[activityData], isPending, err] = useFetch("allActivitiesObj");

    useEffect(() => {
        const getData = async function () {
            if(isPending){ 
                setIsLoading(true);
            }
            else{
                setIsRefetching(true);
            }
            
            setData(activityData); 
            
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
        
            setIsLoading(false);
            setIsRefetching(false);
        };

        getData();
        console.log("DATA", data);
    }, [activityData]);


    const columns = useMemo( 
        () => [
        {
            //deeply nested?
            accessorKey: `allActivitiesObj.activitydetection`, 
            header: 'ACTIVITY NAME',
        }, 
        {
            accessorKey: 'activitycomprehension.lastVisited',
            header: 'DATE',
        },
        { 
            accessorKey: 'id',
            header: 'TIME',
        },
        ],
        [],
    );   

        return (
            <>
            <div>
                <Nav />
            </div>
            <div className = {classes.header}>
                <h1>Reports Page</h1>
                <p>Welcome to the Reports Page, where you can view your activity history.</p>
            </div>
            {/* <div>
                <Button as="input" type="button" value="Export" />{' '}
                <Button as="input" type="submit" value="Share" />{' '}
            </div> */}

            <div>
                <MaterialReactTable columns={columns} 
                                    data={data ?? mock} 
                                    state={{ isLoading, showProgressBars: isRefetching,}}/>
            </div>
            </>
        );
        
        // return (
        //         <MaterialReactTable columns={columns} 
        //                             data={data ?? mock} 
        //                             state={{ isLoading, showProgressBars: isRefetching,}}/>
        // );
    }; 

export default ReportsPage2;