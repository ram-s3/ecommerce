import React, { Suspense, useState } from "react";
import { json, defer, useLoaderData, Await } from "react-router-dom";
import classes from "./productdetails.module.css";
// import StripeCheckout from 'react-stripe-checkout';
import { loadStripe } from '@stripe/stripe-js';
import { getuserid } from "../util/authtoken";


const Productdetails = () => {
    const [totalitems, setTotalitems] = useState(1);
    const [product, setProduct] = useState({});

    const { productdetails } = useLoaderData();

    // function tokenfn(token) {
    //     fetch('http://localhost:8080/payment', {
    //         method: "POST",
    //         body: JSON.stringify(token)
    //     }).then((res) => { res.json().then(data => console.log(data)) })
    // }

    async function makepayment() {
        const stripe = await loadStripe("pk_test_51Nht5eIzECVF8KrFFOuW2rKI2KVvz8ZN2n099bqssHfXnorZmpYEaJUlHVAgRFsehEgkeR3yuVfKPXr6jSjrAw3200CGMBkMr2");

        const headers = {
            "Content-Type": "application/json",
        };

        const response = await fetch('http://localhost:8080/payment', {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ product, totalitems,userid: getuserid() })
        });

        const session = await response.json();

        const result = stripe.redirectToCheckout({
            sessionId: session.id,
        });


    }

    return <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}><Await resolve={productdetails}>

        {(product) => (
            <>
                {setProduct(product)}

                <div className={classes.productdetailscontainer}>

                    <div className={classes.imageandquickdetailscontainer}>


                        <div className={classes.productimagescontainer}>

                            <div className={classes.mainimg}>
                                <img src={`http://localhost:8080` + product.images} alt="product" />

                            </div>


                            <div className={classes.imageslist}>
                                <img src={`http://localhost:8080` + product.images} alt="product" />
                            </div>

                        </div>

                        <div className={classes.quickdetails} >

                            <ul>
                                <li>
                                    <h2>{product.name}</h2>
                                    <p>{product.description.slice(0, 100)}</p>
                                </li>
                                <li>
                                    <h2><strong>${product.price}</strong></h2>
                                    <p>All types payments methods are available</p>
                                </li>
                                <li>
                                    <h3>Colors</h3>
                                    <div style={{ display: "flex", flexDirection: "row" }}>

                                        {product.color.split(",").map((color) =>


                                            <div style={{
                                                borderRadius: "50%", width: "2rem", height: "2rem",
                                                marginRight: "0.5rem",

                                                backgroundColor: color.toString(),

                                                border:
                                                    `${color.toString().trim() == 'white' ? '1px solid black' : `1.6px solid ${color.toString().trim()}`}`



                                            }}>

                                            </div>
                                        )


                                        }
                                    </div>
                                    {/* {product.color} */}
                                </li>
                                <li>
                                    <div style={{ display: "flex", flexDirection: "row" }}>
                                        <div style={{ width: "8rem", height: "2.12rem", backgroundColor: "white", margin: "0rem 0rem 0.5rem 0rem", padding: "0" }} >
                                            <button onClick={() => setTotalitems(totalitems - 1)} disabled={totalitems < 2 ? true : false}
                                                style={{ backgroundColor: "inherit", color: "black", fontSize: "18px", width: "0.1rem", height: "inherit", margin: "0 0.5rem", border: "1px solid black", paddingRight: "1.5rem" }}
                                            >
                                                -
                                            </button>
                                            <span>{totalitems}</span>
                                            <button
                                                onClick={() => setTotalitems(totalitems + 1)}

                                                style={{ backgroundColor: "inherit", color: "black", fontSize: "18px", width: "0.2rem", paddingRight: "1.5rem", height: "inherit", margin: "0 0.5rem", border: "1px solid black" }}
                                            >+</button>
                                        </div>
                                        <div>
                                            <p >Only <span style={{ color: "rgb(239, 77, 36)" }}>
                                                {product.inventory} items
                                            </span>
                                                &nbsp; Left!
                                            </p>
                                            <p>Don't miss it</p>
                                        </div>

                                    </div>
                                    <div style={{ display: "flex", flexDirection: "row", marginTop: "0.5rem" }}>
                                        <button className={classes.actionbtn} onClick={makepayment}>Buy Now</button>
                                        <button className={classes.actionbtncart}>Add to cart</button>
                                    </div>
                                </li>
                                <li>
                                    <div style={{ marginBottom: "1.6rem" }}>
                                        <h5>Free Delivery</h5>
                                        <p style={{ fontSize: "13px", textDecoration: "underline" }}>Enter your Postal code for Delivery Availability</p>
                                    </div>

                                    <div>
                                        <h5>Return Delivery</h5>
                                        <p style={{ fontSize: "13px" }}>
                                            Free 30 days Delivery Returns. <span style={{ textDecoration: "underline" }}>

                                                Details.
                                            </span>
                                        </p>
                                    </div>
                                </li>
                            </ul>


                        </div>



                    </div>



                </div>



            </>
        )

        }



    </Await>
    </Suspense >
}

export default Productdetails;


async function getproductdetials(params) {
    const id = params.id;
    const productdetails = await fetch("http://localhost:8080/productdetails/" + id);



    if (!productdetails.ok) {
        throw json({ message: "could not fetch product details" }, { status: 404 });
    }

    const proddetails = await productdetails.json();
    return proddetails;

}

export async function loader({ params }) {
    return defer({
        productdetails: getproductdetials(params)
    })


}



export async function action({ request, params }) {



}