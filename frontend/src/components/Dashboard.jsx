import React, { useEffect, useState } from "react";
import './dashboard.css'
import axios from 'axios';
import { useGlobalState, useGlobalStateUpdate } from './../context/GlobalContext';
import { useHistory } from 'react-router-dom';
import LogoutButton from './LogoutButton';

const url = 'http://localhost:5000';
function Dashboard() {

    const globalState = useGlobalState();
    const setGlobalState = useGlobalStateUpdate();

    let history = useHistory();

    const [data, setData] = useState();

    return (
        <>
            <LogoutButton />

            <p>This is protected route</p>
             {globalState.user ?
                <div>
                    <h2>Welcome , {globalState.user.name}</h2>
                </div> : null}
            


            {'===>' + JSON.stringify(globalState)}
        </>
    );
}

export default Dashboard;