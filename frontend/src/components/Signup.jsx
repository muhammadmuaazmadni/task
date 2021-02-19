import React, { useEffect, useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import 'mdbreact/dist/css/mdb.css';
import './signup.css';
import axios from 'axios';

const url = 'http://localhost:5000';
function Signup() {

    const [email, setEmail] = useState('');
    const [errmessage, setErrmessage] = useState('');

    useEffect(() => {
        axios({
            method: 'post',
            url: url + '/validemail',
            data: {
                email: email
            }, withCredentials: true
        }).then((response) => {
            if (response.data.status === 200) {
                if (response.data.isFound) {
                    setErrmessage("Email Already exit");
                }
                else {
                    setErrmessage("Email is Available");
                }
            } else {
                alert(response.data.message);
            }
        }).catch((error) => {
            console.log(error);
        });
    }, [email]);

    function handleSubmit(event) {
        event.preventDefault();
        axios({
            method: 'post',
            url: url + '/signup',
            data: {
                name: document.getElementById('name').value,
                email: email,
                phone: document.getElementById('phone').value,
                password: document.getElementById('password').value
            }, withCredentials: true
        })
            .then((response) => {
                if (response.data.status === 200) {
                    alert(response.data.message);
                } else {
                    // alert(response.data.message);
                    alert(response.data.message);
                }
            }).catch((error) => {
                console.log(error);
            });
    }

    function alreadyAccount() {
        window.location.href = "./Login";
    }

    return (
        <MDBContainer>
            <MDBRow>
                <MDBCol md="6">
                    <form className="singupCenter" onSubmit={handleSubmit}>
                        <p className="h4 text-center mb-4">Sign up</p>
                        <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
                            Your name
                        </label>
                        <input type="text" id="name" className="form-control" required />
                        <br />
                        <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
                            Your email
                        </label>
                        <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} required />
                        <span>{errmessage}</span>
                        <br />
                        <label htmlFor="defaultFormRegisterConfirmEx" className="grey-text">
                            Phone
                        </label>
                        <input type="text" id="phone" className="form-control" required />
                        <br />
                        <label htmlFor="defaultFormRegisterPasswordEx" className="grey-text">
                            Your password
                        </label>
                        <input type="password" id="password" className="form-control" required />
                        <div className="text-center mt-4">
                            <MDBBtn color="unique" type="submit">
                                Register
                            </MDBBtn>
                        </div>
                        <br />
                    <center><span className="alreadyAccount" onClick={alreadyAccount}>I Already have an account</span></center>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default Signup;