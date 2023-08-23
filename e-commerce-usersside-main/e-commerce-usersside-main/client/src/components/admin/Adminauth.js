import React from "react";
import { Form, redirect, json } from "react-router-dom";
import { Card, Stack, TextField, FormLabel, } from "@mui/material";
const Adminauth = () => {



    return <>


        <Card variant="outlined" style={{ width: "25rem", height: "fit-content", padding: "1rem 2rem", margin: "5rem auto" }}>
            <Form method="POST" >
                <h2 style={{ fontFamily: "sans-serif", textAlign: "center" }}>Admin Login</h2>
                <Stack direction="column">
                    <FormLabel>Email</FormLabel>
                    <TextField
                        required
                        size="small"
                        type="text"
                        name="email"
                        variant="outlined"
                        color="secondary"
                    />
                    <FormLabel>Password</FormLabel>
                    <TextField
                        required
                        size="small"
                        type="password"
                        name="password"
                        variant="outlined"
                        color="secondary"
                    />
                    {/* <label htmlFor="email">email:</label>
                <input id="email" name="email"></input>
                <label htmlFor="password" >password: </label>
                <input id="password" name="password" /> */}
                    <button>Login</button>

                </Stack>
            </Form>
        </Card>
    </>
}

export default Adminauth;

export async function action({ request }) {

    const data = await request.formData();

    const user = {
        email: data.get('email'),
        password: data.get('password')
    }


    const response = await fetch("http://localhost:8080/admin/login", {
        method: request.method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })

    if (response.status === 401) {
        throw json({ message: `could not login ` }, { status: 401 });
    }

    const resData = await response.json();
    console.log(resData);
    const token = resData.token;

    localStorage.setItem('token', token);


    return redirect('/admin/dashboard/products');


}