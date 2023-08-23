import React from 'react';
import classes from './Mainnav.module.css';
import { Link, useSubmit, json, redirect } from "react-router-dom";
import Card from "@mui/material/Card";
import { CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import { gettoken } from '../util/authtoken';


const ProductList = (props) => {
    const submit = useSubmit();
    const productdeleteHandler = () => {
        const proceed = window.confirm("are your sure to delete the product?");

        if (proceed) {
            submit(null, { method: 'DELETE' });
        }
    }


    return <>
        <div className={classes.products}>
            <ul style={{ margin: "0.5rem auto", width: "90%" }}>
                {props.product.map((item) => (<li key={item._id} >

                    <Card sx={{ maxWidth: 450 }}>

                        <CardMedia
                            component="img"
                            height="200"
                            image={`http://localhost:8000` + item.images}
                            alt="product image"
                        />

                        <CardContent>
                            <Typography gutterBottom variant='h5' component="div">
                                {item.name}
                            </Typography>

                            <Typography variant='body2' color="text.primary">
                                <strong>Price: {item.price}$</strong>
                            </Typography>
                            <Typography variant='body2' color="text.primary">
                                <strong>Color : </strong>{item.color}
                            </Typography>
                            <Typography variant='body2' color="text.primary">
                                <strong>category :</strong> {item.category}
                            </Typography>
                            <Typography variant='body2' color="text.primary">
                                <strong>Inventory :</strong> {item.inventory}
                            </Typography>
                            <Typography variant='body2' color="text.primary">
                                <strong>Description :</strong> {item.description}
                            </Typography>

                            <CardActions>
                                <Button>
                                    <Link to={"edit/" + item._id}>Edit</Link>
                                </Button>
                                <Button onClick={() => {
                                    const proceed = window.confirm("are your sure to delete the product?");

                                    if (proceed) {
                                        submit(null, { method: 'DELETE', action: "delete/" + item._id });
                                    }
                                }} style={{ backgroundColor: '#f03949', color: 'white' }}>
                                    Delete
                                </Button>
                            </CardActions>
                        </CardContent>



                    </Card>


                </li>))}
            </ul>
        </div>
    </>

}

export default React.memo(ProductList);

export async function action({ request, params }) {
    const id = params.id;
    const token = gettoken();

    let url = "";
    if (request.method === "DELETE") {
        url = "http://localhost:8000/admin/productdetails/delete/" + id;

        const result = await fetch(url, {
            method: request.method,
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })

        if (!result.ok) {
            throw json({ message: 'could not delete product' }, { status: 500 });
        }


    }

    return redirect('/admin/dashboard/products');

}