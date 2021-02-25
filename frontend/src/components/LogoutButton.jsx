import axios from 'axios';
import { useGlobalStateUpdate } from './../context/GlobalContext';

function LogoutButton() {

    let url = 'http://localhost:5000'
    const setGlobalState = useGlobalStateUpdate();

    function logout() {
        axios({
            method: "POST",
            url: url + "/auth/logout",
            withCredentials: true
        })
            .then(function (response) {
                if (response.data.status === 200) {
                    // alert(response.data.message);
                    setGlobalState((prev) => ({ ...prev, loginStatus: false, role: null, user: null }))
                }
            }, (error) => {
                console.log(error.message);
            })
    }
    return (<button onClick={logout}>Logout</button>)
}

export default LogoutButton;