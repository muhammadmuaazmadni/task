import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from "mdbreact";
import { Table } from 'react-bootstrap';

const url = 'http://localhost:5000';
export default function GetOrders() {

    const [getOrders, setGetOrders] = useState([])
    useEffect(() => {
        axios({
            method: 'get',
            url: url + '/getOrders',
            withCredentials: true
        }).then((response) => {
            setGetOrders(response.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])
    console.log("Get Order ===> :", getOrders)


    return (
        <div>
            <Container>
                <h1>My Order Details</h1>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Phone Number</th>
                            <th>Status</th>
                            <th>Orders</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    {getOrders.map((e) => (
                        <tbody>
                            <tr>
                                <th scope="row">{e._id}</th>
                                <td>{e.name}</td>
                                <td>{e.email}</td>
                                <td>{e.address}</td>
                                <td>{e.phoneNumber}</td>
                                <td>{e.status}</td>
                                <td>{e.orders.length}</td>
                                <td>{e.totalPrice}</td>
                            </tr>
                        </tbody>
                    ))}

                </Table>
            </Container>
        </div>
    )
}
