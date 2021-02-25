import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useGlobalState, useGlobalStateUpdate } from './../context/GlobalContext';
import LogoutButton from './LogoutButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Form, Container, Row } from "react-bootstrap";

function AdminDashboard() {

    let url = 'http://localhost:5000'
    const globalState = useGlobalState();
    const setGlobalState = useGlobalStateUpdate();
    const productName = useRef();
    const productPrice = useRef();
    const productImage = useRef();
    const productDescription = useRef();
    const productQuantity = useRef();
    const activeStatus = useRef();


    const [data, setData] = useState([]);

    function post(event) {
        event.preventDefault();

        axios({
            method: 'post',
            url: url + '/auth/updateproducts',
            data: {
                productName: productName.current.value,
                productPrice: productPrice.current.value,
                productImage: productImage.current.value,
                productDescription: productDescription.current.value,
                productQuantity: productQuantity.current.value,
                activeStatus: activeStatus.current.value
            }, withCredentials: true
        })
            .then((response) => {
                if (response.data.status === 200) {
                    alert(response.data.message);
                    setData((previousValue) => {
                        return previousValue.concat([response.data.data]);
                    })
                } else {
                    alert(response.data.message);
                }
            }).catch((error) => {
                console.log(error);
            });
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
                                    <Form.Control type="name" placeholder="Product Name" ref={productName} required />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control type="text" placeholder="Price" ref={productPrice} required />
                                </Form.Group>
                            </Form.Row>

                            <Form.Group controlId="formGridAddress1">
                                <Form.Label>Choose Product Image</Form.Label>
                                <Form.Control type="url" placeholder="Product URL" ref={productImage} required />
                            </Form.Group>

                            <Form.Group controlId="formGridAddress2">
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" placeholder="Description" ref={productDescription} required />
                            </Form.Group>

                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Quantity</Form.Label>
                                    <Form.Control type="text" placeholder="Quantity" ref={productQuantity} required />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Active Status</Form.Label>
                                    <Form.Control type="name" placeholder="Active Status" ref={activeStatus} required />
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
                                    <div className="col-md-5 card" style={{ padding: "20px" }}>
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