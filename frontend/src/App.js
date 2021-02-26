import React from "react";
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";
import './App.css';
import { Navbar, Form, Nav, Button, FormControl } from 'react-bootstrap';

import Home from './components/home/Home';
import Signup from './components/signup/Signup';
import Login from './components/login/Login';

import Dashboard from './components/userDashboard/Dashboard';
import AdminDashboard from './components/adminDashboard/AdminDashboard';
import LogoutButton from './components/logoutButton/LogoutButton'

import { useGlobalState } from './context/GlobalContext';

function App() {

  const globalState = useGlobalState();

  return (
    <>
      <Router>
        <nav>
          <Navbar bg="dark" variant="dark">
            {(globalState.loginStatus === false) ?
              <>
                <Nav className="mr-auto">
                  <Nav.Link><Link to="/">Home</Link></Nav.Link>
                  <Nav.Link><Link to="/login">Login</Link></Nav.Link>
                  <Nav.Link><Link to="/signup">Signup</Link></Nav.Link>
                </Nav>
              </>
              : null
            }

            {(globalState.loginStatus === true) ?
              <>
                <Nav className="mr-auto">
                  <Nav.Link><Link to="/">Dashboard</Link></Nav.Link>
                  <Nav.Link><Link to="/home">Home</Link></Nav.Link>
                </Nav>
                <Form inline>
                  <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                  <Button variant="outline-info">Search</Button>
                  <LogoutButton />
                </Form>
              </>
              : null
            }
          </Navbar>
        </nav>

        <Switch>
          {/* Protected Routes */}
          {(globalState.role === "user") ?
            <>
              <Route exact path="/">
                <Dashboard />
              </Route>
              <Route path="/home">
                <Home />
              </Route>
              <Route path="*">
                <Redirect to="/" />
              </Route>
            </>
            : null
          }

          {/* Public Routes */}
          {(globalState.role === null) ?
            <>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/signup">
                <Signup />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="*">
                <Redirect to="/" />
              </Route>
            </>
            : null
          }

          {(globalState.role === "admin") ?
            <>
              <Route exact path="/">
                <AdminDashboard />
              </Route>

              <Route path="*">
                <Redirect to="/" />
              </Route>
            </>
            : null}
        </Switch>
      </Router>

    </>
  )


}


export default App;

// import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBIcon } from "mdbreact";

// class App extends Component {
//   state = {
//     isOpen: false
//   };

//   toggleCollapse = () => {
//     this.setState({ isOpen: !this.state.isOpen });
//   }

//   render() {
//     return (
//       <>
//         <Router>
//           <MDBNavbar color="default-color" dark expand="md">
//             <MDBNavbarBrand>
//               <strong className="white-text">Navbar</strong>
//             </MDBNavbarBrand>
//             <MDBNavbarToggler onClick={this.toggleCollapse} />
//             <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
//               <MDBNavbarNav left>
//                 <MDBNavItem active>
//                   <MDBNavLink to="/">Home</MDBNavLink>
//                 </MDBNavItem>
//                 <MDBNavItem>
//                   <MDBNavLink to="#!">Features</MDBNavLink>
//                 </MDBNavItem>
//                 <MDBNavItem>
//                   <MDBNavLink to="#!">Pricing</MDBNavLink>
//                 </MDBNavItem>
//               </MDBNavbarNav>
//               <MDBNavbarNav right>
//                 <MDBNavItem>
//                   <MDBNavLink className="waves-effect waves-light" to="#!">
//                     <MDBIcon fab icon="twitter" />
//                   </MDBNavLink>
//                 </MDBNavItem>
//                 <MDBNavItem>
//                   <MDBNavLink className="waves-effect waves-light" to="#!">
//                     <MDBIcon fab icon="google-plus-g" />
//                   </MDBNavLink>
//                 </MDBNavItem>
//                 <MDBNavItem>
//                   <MDBNavLink to="/login">Login</MDBNavLink>
//                 </MDBNavItem>
//                 <MDBNavItem>
//                   <MDBNavLink to="/signup">Signup</MDBNavLink>
//                 </MDBNavItem>
//               </MDBNavbarNav>
//             </MDBCollapse>
//           </MDBNavbar>

//           <Switch>
//             <Route exact path="/">
//               <Home />
//             </Route>
//             <Route path="/login">
//               <Login />
//             </Route>
//             <Route path="/signup">
//               <Signup />
//             </Route>
//             <Route path="/dashboard">
//               <Dashboard />
//             </Route>
//           </Switch>

//         </Router>
//       </>
//     );
//   }
// }