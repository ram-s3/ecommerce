import React, { Suspense } from "react";
import { Link, useLoaderData, json, defer, Await } from 'react-router-dom';
import classes from './homepage.module.css';
import bannerimg1 from '../images/1.png';
import bannerimg2 from '../images/2.png';
import bannerimg3 from '../images/3.png';

import { Button, CardContent, Card, Typography, CardActions, CardMedia } from "@mui/material";



const Homepage = () => {


    const { products } = useLoaderData();




    return <Suspense fallback={<p style={{ textAlign: "center" }}>Loading....</p>}> <Await resolve={products}>
        {(productsdata) =>
        (<>
            <div className={classes.discountbanner}>
                <div className={classes.bannertext}>
                    <h1>Grab Upto 15% Off On</h1>
                    <h1>Featured Mobile Phones</h1>
                    <Link to={`productcategory/Mobile Phones`} >Buy Now</Link>
                </div>
                <div className={classes.bannerimg}>
                    <img src={bannerimg1} alt="banner phone 1" />
                    <img src={bannerimg2} alt="banner phone 2" />
                    <img src={bannerimg3} alt="banner phone 3" />
                </div>

            </div>
            <div className={classes.productscontainer}>
                <h2 style={{ fontFamily: "sans-serif" }}>Today's Deals For you</h2>


                {/*  <Card key={product._id}>{product.color}</Card> */}

                <ul >
                    {productsdata.map((item) => (<li key={item._id} >


                        <Link to={`productdetails/${item._id}`}>
                            <Card sx={{ maxWidth: 280 }} style={{ boxShadow: "none" }}>

                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={`http://localhost:8080` + item.images}
                                    alt="product image"
                                />

                                <CardContent style={{ padding: "1px" }}>

                                    <Typography variant='body2' color="text.primary" style={{ display: "flex", justifyContent: "space-between", marginTop: "0.5rem" }}>
                                        <strong >
                                            {item.name.substring(0, 25)}
                                        </strong>
                                        <strong><span style={{ fontSize: "12px" }}>$</span>{item.price}<span style={{ fontSize: "12px" }}>.00</span></strong>
                                    </Typography>


                                    <Typography variant='body2' color="text.primary" style={{ marginTop: "0.5rem" }}>
                                        {item.description.substring(0, 50) + '.'}
                                    </Typography>

                                    <CardActions style={{ paddingLeft: "0", marginTop: "0.5rem" }} >
                                        <button className={classes.btn}
                                        // style={{
                                        //     backgroundColor: "white",
                                        //     color: "black",
                                        //     border: "1px solid black",
                                        //     borderRadius: "25px",
                                        //     padding: "0.2rem 1.2rem",
                                        //     textTransform: "none",
                                        //     '&:hover': { color: "white", backgroundColor: "rgb(56, 56, 56)" },

                                        // }}

                                        >
                                            Add to Cart
                                        </button>
                                    </CardActions>
                                </CardContent>



                            </Card>
                        </Link>

                    </li>))}
                </ul>


                {/* <p>go to <Link to='/productdetails'>product details page</Link></p> */}


            </div>

        </>)}
    </Await></Suspense >

}

export default React.memo(Homepage);

const getdata = async () => {
    const response = await fetch('http://localhost:8080/');


    if (!response.ok) {
        throw json({ message: "could not fetcch data from server!" }, { status: 500 });
    }
    else {
        const resData = await response.json();
        // console.log(resData)
        return resData;

    }

}


export function loader() {
    return defer({
        products: getdata()
    })
}