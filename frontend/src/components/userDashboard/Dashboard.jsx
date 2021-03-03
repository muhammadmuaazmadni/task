import React, { useState, useEffect } from "react";
import './dashboard.css';
import { useGlobalState } from '../../context/GlobalContext';
import axios from 'axios';
import { Container } from "mdbreact";
import Basket from './../basket/Basket';

const url = 'http://localhost:5000';
function Dashboard() {

    // const globalState = useGlobalState();
    // console.log("Ye dekho : ", globalState);

    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [show, ShowHide] = useState(true);
    useEffect(() => {
        axios({
            method: 'get',
            url: url + '/getProducts',
            withCredentials: true
        })
            .then((response) => {
                setProducts(response.data.data)
            }).catch((error) => {
                console.log(error);
            });
    }, [])
    console.log("Show Products : ", products);

    function onAdd(e, index) {
        console.log('index', index);
        console.log("cart is ", cartItems);
        const exist = cartItems.find((x) => x._id === e._id)
        if (exist) {
            setCartItems(
                cartItems.map((x) =>
                    x._id === e._id ? { ...exist, stock: exist.stock + 1 } : x
                )
            )
        } else {
            setCartItems([...cartItems, { ...e, stock: 1 }])

        }
    }

    function onRemove(e, index) {
        const exist = cartItems.find((x) => x._id === e._id);
        if (exist.stock === 1) {
            setCartItems(cartItems.filter((x) => x._id !== e._id));
        }
        else {
            setCartItems(
                cartItems.map((x) =>
                    x._id === e._id ? { ...exist, stock: exist.stock - 1 } : x
                )
            )
        }

    }

    console.log("Cart Items : ", cartItems);

    function changeState() {
        ShowHide(Prev => !Prev)
    }

    return (
        <>
            {/* {globalState.user ?
                <div>
                    <h2>Welcome , {globalState.user.name}</h2>
                </div> : null}
            {'===>' + JSON.stringify(globalState)} */}
            <a className="btn btn-outline-success" onClick={changeState}
                style={{ float: 'right' }}><i class="fas fa-cart-plus mr-3" /><span>{cartItems.length}</span><span className="sr-only">(current)</span></a>

            <Container>
                {show === true ?
                    <>
                        <h1 className="text-center mt-1 ">Products</h1>
                        <div className="row justify-content-md-center d-flex">
                            {products.map((e, index) => (
                                <div className="col-3 mt-4 ml-4" style={{ border: "1px solid black" }} key={e.id}>
                                    <div>
                                        <center><img style={{ width: "70%", height: "200px" }} src={e.productImage[0]} />
                                            <h3>{e.productName}</h3>
                                            <p class="card-text">{e.productDescription} <br />
                                        Rs: {e.productPrice}/= Per kg
                                        </p>
                                            <div>
                                                <button className="btn btn-primary" onClick={() => onAdd(e, index)}>Add To Cart</button>
                                            </div></center>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                    :
                    <>
                        <Basket cartItems={cartItems} onAdd={onAdd} onRemove={onRemove} />
                    </>}
            </Container>

        </>
    );
}

export default Dashboard;