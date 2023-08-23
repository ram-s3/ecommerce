import React from "react";
import { Form, json, redirect, useNavigation } from "react-router-dom";
// import { gettoken } from "../../util/authtoken";
import { TextField, Card, FormLabel, Stack } from "@mui/material";




const Newproductform = (props) => {

    const Navigation = useNavigation();

    const closeform = Navigation.state === "loading";

    if (closeform) {
        props.clsoverly();
    }



    return <>
        <Card variant="outlined" style={{ width: "fit-content", padding: "1rem 2rem", height: "80vh", overflowY: "scroll" }}>
            <h2>New Product</h2>
            <Form method={props.method} encType="multipart/form-data" >
                {/* <label htmlFor="name">Product Name</label>
            <input id="name" name="name" type="text" /> */}
                <Stack direction="column" >




                    <FormLabel>Product Name</FormLabel>
                    <TextField
                        type="text"
                        variant="outlined"
                        color="secondary"
                        required
                        name="name"
                        size="small"
                    />



                    {/* <label htmlFor="img">image</label>
                <input id="img" required name="image" type="file" /> */}

                    <FormLabel>Image</FormLabel>
                    <TextField
                        type="file"
                        variant="outlined"
                        color="secondary"
                        required
                        name="image"
                        size="small"
                    />

                    {/* <label htmlFor="color">color</label>
                    <input id="color" name="color" type="text" /> */}


                    <FormLabel>Color</FormLabel>
                    <TextField
                        type="text"
                        variant="outlined"
                        color="secondary"
                        required
                        name="color"
                        size="small"
                    />
                    {/* <label htmlFor="price">price</label>
                    <input id="price" name="price" type="number" /> */}

                    <FormLabel>Price</FormLabel>
                    <TextField
                        type="number"
                        variant="outlined"
                        color="secondary"
                        required
                        name="price"
                        size="small"
                    />
                    {/* <label htmlFor="category" id="category">Category</label>
                    <input id="category" name="category" type="text" /> */}

                    <FormLabel>Category</FormLabel>
                    <TextField
                        type="text"
                        variant="outlined"
                        color="secondary"
                        required
                        name="category"
                        size="small"
                    />
                    {/* <label htmlFor="inventory">Inventory</label>
                    <input id="inventory" name="inventory" required type="number" /> */}



                    <FormLabel>Inventory</FormLabel>
                    <TextField
                        type="number"
                        variant="outlined"
                        color="secondary"
                        required
                        name="inventory"
                        size="small"
                    />
                    {/* <label htmlFor="description">description</label>
                    <textarea id="description" name="description" width={100} height={100} defaultValue="
Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae libero voluptatibus maiores sapiente unde ex animi possimus, eius suscipit consequuntur, nostrum placeat quibusdam vel fuga et accusamus inventore consectetur! Saepe. */}
                    {/* " /> */}

                    <FormLabel>Description</FormLabel>
                    <TextField
                        type="text"
                        multiline
                        variant="outlined"
                        color="secondary"
                        required
                        name="description"
                        size="small"
                        defaultValue="
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae libero voluptatibus maiores sapiente unde ex animi possimus, eius suscipit consequuntur, nostrum placeat quibusdam vel fuga et accusamus inventore consectetur! Saepe.
                        "
                    />
                    <button style={{ display: "block" }}>Add new product</button>
                </Stack>
            </Form>
        </Card>

    </>

}

export default React.memo(Newproductform);


export async function action({ request }) {


    const data = await request.formData();

    console.log(data);

    const newproductformdata = new FormData();

    newproductformdata.append('name', data.get('name'))
    newproductformdata.append('image', data.get('image'))
    newproductformdata.append('price', data.get('price'))
    newproductformdata.append('color', data.get('color'))
    newproductformdata.append('category', data.get('category'))
    newproductformdata.append('inventory', data.get('inventory'))
    newproductformdata.append('description', data.get('description'))





    // const token = gettoken();

    let url = "http://localhost:8080/admin/newproduct";

    const response = await fetch(url, {
        method: request.method,
        // headers: {
        //     'Authorization': 'Bearer ' + token
        // },
        body: newproductformdata
    });



    if (!response.ok) {
        throw json({ message: 'could not add new product' }, { status: 500 });
    }


    return redirect('/admin/dashboard/products');

}