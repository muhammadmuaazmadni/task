import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useGlobalStateUpdate } from './../../context/GlobalContext';

export default function Basket(props) {

    const globalStateUpdate = useGlobalStateUpdate();
    const { cartItems, onAdd, onRemove } = props;
    const itemPrice = cartItems.reduce((accumulator, current) => accumulator + current.stock * current.productPrice, 0);
    const totalPrice = itemPrice;
    const history = useHistory();

    function checkOut() {
        globalStateUpdate(prev => ({
            ...prev,
            cartData: { cartItems: cartItems, totalPrice: totalPrice }
        }))
        console.log("Yaha is isko andr mil raha han ya  ", totalPrice)
        history.push('/checkout');

    }

    return (
        <section>

            <div class="row">

                <div class="col-lg-8">

                    <div class="mb-3">
                        <div class="pt-4 wish-list">

                            <h5 class="mb-4">Cart (<span>{cartItems.length}</span> items)</h5>
                            {/* ------------------------------------------------------------------------------------------------------ */}
                            {cartItems.map((e, index) => {
                                return (
                                    <div class="row mb-4">
                                        <div class="col-md-5 col-lg-3 col-xl-3">
                                            <div class="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
                                                <img class="img-fluid w-100" src={e.productImage[0]} alt="Sample" style={{ width: "100%", height: "170px" }} />
                                                <a href="#!">
                                                    <div class="mask">
                                                        <img class="img-fluid w-100" src={e.productImage[0]} />
                                                        <div class="mask rgba-black-slight"></div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="col-md-7 col-lg-9 col-xl-9">
                                            <div>
                                                <div class="d-flex justify-content-between" >
                                                    <div>
                                                        <h5>{e.productName}</h5> <br />
                                                        {/* <p class="mb-3 text-muted text-uppercase small">STOCK AVAILABLE :{e.productQuantity} - {e.stock}</p> */}
                                                        <p class="mb-2 text-muted text-uppercase small">DESCRIPTION : {e.productDescription}</p>
                                                        <p class="mb-3 text-muted text-uppercase small">AVALIBILITY : {e.activeStatus}</p>
                                                    </div>
                                                    <div>
                                                        <div class="def-number-input number-input safari_only mb-0 w-100">
                                                            <button onClick={() => onRemove(e, index)} class="minus">-</button>
                                                            <input class="quantity" min="0" name="quantity" value={e.stock} type="text" style={{ textAlign: "center", width: "50px" }} />
                                                            <button onClick={() => onAdd(e, index)} class="plus">+</button>

                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="d-flex justify-content-between align-items-center">
                                                    <p class="mb-0"><span><strong>${e.productPrice * e.stock}</strong></span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            {/* ------------------------------------------------------------------------------------------------------ */}
                            <p class="text-primary mb-0"><i class="fas fa-info-circle mr-1"></i> Do not delay the purchase, adding items to your cart does not mean booking them.</p>

                        </div>
                    </div>

                    {/* <div class="mb-3">
                        <div class="pt-4">

                            <h5 class="mb-4">Expected shipping delivery</h5>
                            <p class="mb-0"> Thu., 12.03. - Mon., 16.03.</p>
                        </div>
                    </div> */}

                    {/* <div class="mb-3">
                        <div class="pt-4">

                            <h5 class="mb-4">We accept</h5>

                            <img class="mr-2" width="45px"
                                src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                                alt="Visa" />
                            <img class="mr-2" width="45px"
                                src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                                alt="American Express" />
                            <img class="mr-2" width="45px"
                                src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                                alt="Mastercard" />
                            <img class="mr-2" width="45px"
                                src="https://mdbootstrap.com/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.png"
                                alt="PayPal acceptance mark" />
                        </div>
                    </div> */}

                </div>

                <div class="col-lg-4">

                    <div class="mb-3">
                        <div class="pt-4">

                            <h5 class="mb-3">The total amount of</h5>

                            <ul class="list-group list-group-flush">
                                <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0"><span>$25.98</span></li>
                                <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                                    Shipping
                                <span>Gratis</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                    <div>
                                        <strong>The total amount of</strong>
                                        <strong>
                                            <p class="mb-0">(including VAT)</p>
                                        </strong>
                                    </div>
                                    <span><strong>${totalPrice}</strong></span>
                                </li>
                            </ul>

                            <button type="button" class="btn btn-primary btn-block" onClick={checkOut}>go to checkout</button>

                        </div>
                    </div>

                </div>

            </div>

        </section>
    )
}
