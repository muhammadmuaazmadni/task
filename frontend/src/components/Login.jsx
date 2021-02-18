import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import 'mdbreact/dist/css/mdb.css';
import './login.css'
import axios from 'axios';

const url = 'http://localhost:5000';
function Login() {

    function handleLogin(event) {
        event.preventDefault();
        axios({
            method: 'post',
            url: url + "/login",
            data: {
                email: document.getElementById("email").value,
                password: document.getElementById("password").value
            }, withCredentials: true
        })
            .then((response) => {
                if (response.data.status === 200) {
                    alert(response.data.message);
                }
                else {
                    alert(response.data.message);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <MDBContainer>
            <MDBRow>
                <MDBCol md="6">
                    <form className="loginCenter" onSubmit={handleLogin}>
                        <p className="h4 text-center mb-4">Sign in</p>
                        <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                            Your email
        </label>
                        <input type="email" id="email" className="form-control" required />
                        <br />
                        <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
                            Your password
        </label>
                        <input type="password" id="password" className="form-control" required />
                        <div className="text-center mt-4">
                            <MDBBtn color="indigo" type="submit">Login</MDBBtn>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default Login;