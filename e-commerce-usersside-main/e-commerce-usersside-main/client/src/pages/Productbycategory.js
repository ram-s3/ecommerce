import React, { Suspense } from "react";
import { useParams, Link, useLoaderData, json, defer, Await } from "react-router-dom";
import { Button, CardContent, Card, Typography, CardActions, CardMedia } from "@mui/material";
import classes from './productbycat.module.css';



const Productbycategory = () => {
    const { products } = useLoaderData();

    const { category } = useParams();

    return <Suspense fallback={<p style={{ textAlign: "center" }}>Loading....</p>}> <Await resolve={products}>
        {(productsdata) =>
        (<>

            <h2 className={classes.heading}>
                {category}
            </h2>


            <div className={classes.productscontainer}>

                <ul >
                    {productsdata.map((item) => (<li key={item._id} >

                        <Link to={`/productdetails/${item._id}`}>

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
                                        >
                                            Add to Cart
                                        </button>
                                    </CardActions>
                                </CardContent>



                            </Card>

                        </Link>
                    </li>))}
                </ul>


            </div>

        </>)}


    </Await></Suspense >

}

export default React.memo(Productbycategory);






const getdata = async (params) => {
    const category = params.category;

    const response = await fetch('http://localhost:8080/categoryby/' + category);


    if (!response.ok) {
        throw json({ message: "could not fetcch data from server!" }, { status: 500 });
    }
    else {
        const resData = await response.json();
        // console.log(resData)
        return resData;

    }

}


export function loader({ params }) {
    return defer({
        products: getdata(params)
    })
}