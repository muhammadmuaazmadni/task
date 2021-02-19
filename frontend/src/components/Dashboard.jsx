import React, { useEffect, useState } from "react";
import './dashboard.css'
import axios from 'axios';

const url = 'http://localhost:5000';
function Dashboard() {

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
        </>
    );
}

export default Dashboard;