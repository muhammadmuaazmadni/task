// import React from "react";
// import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import 'bootstrap-css-only/css/bootstrap.min.css';
// import 'mdbreact/dist/css/mdb.css';
// import 'mdbreact/dist/css/mdb.css';
// import './ForgotPassword.css';
// import axios from 'axios';
// import {useHistory} from 'react-router-dom';

// const url = 'http://localhost:5000';
// function ForgotPassword() {

//     const history = useHistory();

//     function handleLogin(event) {
//         event.preventDefault();
//         axios({
//             method: 'post',
//             url: url + "/auth/login",
//             data: {
//                 email: document.getElementById("email").value,
//                 password: document.getElementById("password").value
//             }, withCredentials: true
//         })
//             .then((response) => {
//                 if (response.data.status === 200) {
//                     // alert(response.data.message);
//                     window.location.href = "./dashboard"
//                 }
//                 else {
//                     alert(response.data.message);
//                 }
//             })
//             .catch(function (error) {
//                 console.log(error);
//             });
//     }

//     function goToLogin(){
//         history.push("./login");
//     }

//     return (
//         <MDBContainer>
//             <MDBRow>
//                 <MDBCol md="6">
//                     <form className="loginCenter" onSubmit={handleLogin}>
//                         <p className="h4 text-center mb-4">Reset Password</p>
//                         <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
//                             Your email
//                         </label>
//                         <input type="email" id="email" className="form-control" required />
//                         <br />
//                         <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
//                             New password
//                         </label>
//                         <input type="password" id="password" className="form-control" required />
//                         <div className="text-center mt-4">
//                             <MDBBtn color="indigo" type="submit">Update</MDBBtn>
//                         </div>
//                         <br />
//                     <center><span className="createAccount" onClick={goToLogin}>Go to Login</span></center>
//                     </form>
//                 </MDBCol>
//             </MDBRow>
//         </MDBContainer>
//     );
// };

// export default ForgotPassword;