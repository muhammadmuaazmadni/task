import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useGlobalState } from '../../context/GlobalContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Form, Container, Row } from "react-bootstrap";
import Fallback from './../../images/default.jpg';
import './AdminDashboard.css'

let url = 'http://localhost:5000'
function AdminDashboard() {

    const globalState = useGlobalState();
    const [data, setData] = useState([]);
    const [images, setImages] = useState([Fallback, Fallback, Fallback]);
    const [imageURL, setImageURL] = useState([]);

    const productName = useRef();
    const productPrice = useRef();
    const productDescription = useRef();
    const productQuantity = useRef();
    const activeStatus = useRef();

    function handleSubmit(event) {
        event.preventDefault();

        axios({
            method: 'post',
            url: url + '/auth/updateproducts',
            data: {
                productName: productName.current.value,
                productPrice: productPrice.current.value,
                productImage: imageURL,
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
                    });
                } else {
                    alert(response.data.message);
                }
            }).catch((error) => {
                console.log(error);
            });
    }

    function Upload(e, index) {

        var fileInput = document.getElementById("fileInput");
        const file = e.target.files[0];
        const reader = new FileReader();

        console.log("fileInput: ", fileInput);
        console.log("fileInput: ", fileInput.files[0]);

        let formData = new FormData();

        formData.append("myFile", fileInput.files[0]); // file input is for browser only, use fs to read file in nodejs client
        formData.append("myName", "sameer"); // this is how you add some text data along with file
        formData.append("myDetails",
            JSON.stringify({
                "subject": "Science",   // this is how you send a json object along with file, you need to stringify (ofcourse you need to parse it back to JSON on server) your json Object since append method only allows either USVString or Blob(File is subclass of blob so File is also allowed)
                "year": "2021"
            })
        );

        axios({
            method: 'post',
            url: url + "/upload",
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' },
            withCredentials: true
        })
            .then(response => {
                console.log(response.data.message);
                alert(response.data.message);
                setImageURL(prev => {
                    return prev.concat(response.data.url);
                })

                reader.addEventListener("load", function () {
                    setImages(prev => {
                        prev[index] = reader.result;
                        return [].concat(prev)
                    });
                }, false)

                if (file) {
                    reader.readAsDataURL(file);
                }

            })
            .catch(err => {
                console.log(err);
            })

        return false; // dont get confused with return false, it is there to prevent html page to reload/default behaviour, and this have nothing to do with actual file upload process but if you remove it page will reload on submit -->

    }
    function check(event) {
        event.preventDefault();
    }

    return (
        <>
            {globalState.user ?
                <div>
                    <h1>Welcome , {globalState.user.name} (Admin Dashboard)</h1>
                </div> : null}
            {JSON.stringify(globalState)}
            <h1>Add Product</h1>
            <div>
                <Container fluid="md">
                    <Row className="justify-content-md-center">
                        <Form onSubmit={handleSubmit}>

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
                                <div className="row justify-content d-flex" style={{ border: '1px solid black' }}>
                                    {images.map((eachImage, index) => (
                                        <div className='col-4'>
                                            <form onSubmit={check}>
                                                <div className="file-upload" key={index}>
                                                    <img src={eachImage} alt="FallBack" id="show_pic" />
                                                    <input type="file" onChange={(e) => { Upload(e, index) }} id="fileInput" required />
                                                </div>
                                            </form>
                                        </div>
                                    ))}
                                </div>
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
                                                <img src={eachItem.productImage[0]}
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