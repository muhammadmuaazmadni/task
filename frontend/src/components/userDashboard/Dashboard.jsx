import React from "react";
import './dashboard.css'
import { useGlobalState } from '../../context/GlobalContext';

const url = 'http://localhost:5000';
function Dashboard() {

    const globalState = useGlobalState();

    return (
        <>
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