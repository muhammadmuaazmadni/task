import React, { useState } from 'react';
import axios from 'axios';
import { useGlobalState, useGlobalStateUpdate } from './../context/GlobalContext';
import { useHistory } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Form, Container, Row } from "react-bootstrap";

function AdminDashboard() {

    let url = 'http://localhost:5000'
    const globalState = useGlobalState();
    const setGlobalState = useGlobalStateUpdate();

    const [data, setData] = useState([]);

    function post(event) {
        event.preventDefault();

        let productName = document.getElementById("productName").value;
        let productPrice = document.getElementById("productPrice").value;
        let productImage = document.getElementById("productImage").value;
        let productDescription = document.getElementById("productDescription").value;
        let productQuantity = document.getElementById("productQuantity").value;
        let activeStatus = document.getElementById("activeStatus").value;
        let newData = {
            productName: productName,
            productPrice: productPrice,
            productImage: productImage,
            productDescription: productDescription,
            productQuantity: productQuantity,
            activeStatus: activeStatus
        }

        setData((previousValue) => {
            return previousValue.concat([newData]);
        })
    }

    return (
        <>
            <LogoutButton />
            {globalState.user ?
                <div>
                    <h1>Welcome , {globalState.user.name} (Admin Dashboard)</h1>
                </div> : null}
            {JSON.stringify(globalState)}

            <div>
                <Container fluid="md">
                    <Row className="justify-content-md-center">
                        <Form onSubmit={post}>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Product Name</Form.Label>
                                    <Form.Control type="name" placeholder="Product Name" id="productName" required />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control type="text" placeholder="Price" id="productPrice" required />
                                </Form.Group>
                            </Form.Row>

                            <Form.Group controlId="formGridAddress1">
                                <Form.Label>Choose Product Image</Form.Label>
                                <Form.Control type="url" placeholder="Product URL" id="productImage" required />
                            </Form.Group>

                            <Form.Group controlId="formGridAddress2">
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" placeholder="Description" id="productDescription" required />
                            </Form.Group>

                            <Form.Row>
                            <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Quantity</Form.Label>
                                    <Form.Control type="text" placeholder="Quantity" id="productQuantity" required />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Active Status</Form.Label>
                                    <Form.Control type="name" placeholder="Active Status" id="activeStatus" required />
                                </Form.Group>
                            </Form.Row>

                            <Button variant="primary" type="submit">Submit</Button>
                        </Form>
                    </Row>
                </Container>

                {console.log("Data from useState : ", data)}

                {data.map((eachItem, i) => {
                    return (
                        <div id="main-card">
                            <Container fluid="md">
                                <div className="row justify-content-md-center">
                                    <div className="col-md-5 card" style={{padding: "20px"}}>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <img src={eachItem.productImage}
                                                    alt="{Post Image}" style={{ width: "100%" }} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <p className="mt-2 mb-2">Product Name : {eachItem.productName}</p>
                                            </div>
                                            <div className="col-md-6">
                                                <p className="mt-2 mb-2">Price : {eachItem.productPrice}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="row">
                                            <div className="col-md-6">
                                                <p className="mt-2 mb-2">Quantity : {eachItem.productQuantity}</p>
                                            </div>
                                            <div className="col-md-6">
                                                <p className="mt-2 mb-2">Active Status : {eachItem.activeStatus}</p>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-12">
                                                <p className="mt-2 mb-2">Description : {eachItem.productDescription}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Container>
                        </div>
                    )
                })}


            </div>

        </>
    )
}

export default AdminDashboard;