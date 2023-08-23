import React from "react";
import { Form, json, redirect, useLoaderData } from "react-router-dom";
// import { gettoken } from "../../util/authtoken";
import { TextField, Stack, Card, FormLabel } from "@mui/material";

const Editform = (props) => {
    const productdetails = useLoaderData();

    return <>
        {/* <Form method={props.method} encType="multipart/form-data">
            <label htmlFor="name">Product name</label>
            <input id="name" name="name" type="text" defaultValue={productdetails ? productdetails.name : ''} />
            <label htmlFor="img">image</label>
            <input id="img" name="image" type="file" />
            <label htmlFor="color">color</label>
            <input id="color" defaultValue={productdetails ? productdetails.color : ''} name="color" />
            <label htmlFor="price">price</label>
            <input id="price" defaultValue={productdetails ? productdetails.price : ''} name="price" />
            <label htmlFor="category" id="category">Category</label>
            <input id="category" name="category" type="text" defaultValue={productdetails ? productdetails.category : ''} />
            <label htmlFor="inventory">Inventory</label>
            <input id="inventory" name="inventory" required type="number" defaultValue={productdetails ? productdetails.inventory : ""} />
            <label htmlFor="description">description</label>
            <textarea id="description" defaultValue={productdetails ? productdetails.description : ''} name="description" />
            <button> save</button>
        </Form> */}


        <div style={{ width: "100%", height: "100vh" }}>




            <Card variant="outlined" style={{ width: "fit-content", padding: "1rem 2rem", margin: "1rem auto", height: "80vh", overflowY: "scroll" }}>
                <h2>Edit Product</h2>
                <Form method={props.method} encType="multipart/form-data" >

                    <Stack direction="column" >

                        <FormLabel>Product Name</FormLabel>
                        <TextField
                            type="text"
                            variant="outlined"
                            color="secondary"

                            name="name"
                            size="small"
                            defaultValue={productdetails ? productdetails.name : ''}
                        />

                        <FormLabel>Image</FormLabel>
                        <TextField
                            type="file"
                            variant="outlined"
                            color="secondary"

                            name="image"
                            size="small"

                        />


                        <FormLabel>Color</FormLabel>
                        <TextField
                            type="text"
                            variant="outlined"
                            color="secondary"

                            name="color"
                            size="small"
                            defaultValue={productdetails ? productdetails.color : ''}
                        />

                        <FormLabel>Price</FormLabel>
                        <TextField
                            type="number"
                            variant="outlined"
                            color="secondary"

                            name="price"
                            size="small"
                            defaultValue={productdetails ? productdetails.price : ''}
                        />

                        <FormLabel>Category</FormLabel>
                        <TextField
                            type="text"
                            variant="outlined"
                            color="secondary"

                            name="category"
                            size="small"
                            defaultValue={productdetails ? productdetails.category : ''}
                        />

                        <FormLabel>Inventory</FormLabel>
                        <TextField
                            type="number"
                            variant="outlined"
                            color="secondary"

                            name="inventory"
                            size="small"
                            defaultValue={productdetails ? productdetails.inventory : ""}
                        />

                        <FormLabel>Description</FormLabel>
                        <TextField
                            type="text"
                            multiline
                            variant="outlined"
                            color="secondary"

                            name="description"
                            size="small"
                            defaultValue={productdetails ? productdetails.description : ''}
                        />
                        <button style={{ display: "block" }}>Add new product</button>
                    </Stack>
                </Form>
            </Card>
        </div>

    </>

}

export default React.memo(Editform);


export async function action({ request, params }) {

    const id = params.id;

    const data = await request.formData();

    const formdata = new FormData();

    formdata.append('name', data.get('name'))
    formdata.append('image', data.get('image'))
    formdata.append('price', data.get('price'))
    formdata.append('color', data.get('color'))
    formdata.append('category', data.get('category'))
    formdata.append('inventory', data.get('inventory'))
    formdata.append('description', data.get('description'))

    // const token = gettoken();

    let url = "";

    if (request.method === "PATCH") {
        url = "http://localhost:8080/admin/productdetails/edit/" + id;

        const response = await fetch(url, {
            method: request.method,
            body: formdata
        });

        if (!response.ok) {
            throw json({ message: 'could not edit product' }, { status: 500 });
        }
    }


    return redirect('/admin/dashboard/products');

}


export async function loader({ params }) {

    const id = params.id;
    const productdetails = await fetch("http://localhost:8080/productdetails/" + id);



    if (!productdetails.ok) {
        throw json({ message: "could not fetch product details" }, { status: 404 });
    }
    else {
        return productdetails;
    }

}