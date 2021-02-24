import React, { useEffect, useState } from "react";
import './dashboard.css'
import axios from 'axios';
import {useGlobalState, useGlobalStateUpdate} from './../context/GlobalContext';

const url = 'http://localhost:5000';
function Dashboard() {

    const globalState = useGlobalState();
    const setGlobalState = useGlobalStateUpdate();

    const [data, setData] = useState();
    useEffect(() => {
        axios({
            method: 'get',
            url: url + "/profile",
            withCredentials: true,
        })
            .then((response) => {
                console.log(response.data.profile);
                setData(response.data.profile.name);
            })
            .catch(function (error) {
                console.log(error.message);
            });
    })

    return(
        <>
            <h1>Welcome, {data}</h1>

            <p>This is protected route</p>
            {JSON.stringify(globalState)}
        </>
    );
}

export default Dashboard;