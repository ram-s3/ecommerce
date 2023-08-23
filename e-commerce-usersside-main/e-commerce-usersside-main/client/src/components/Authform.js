import React from "react";
import { Form, useSearchParams, Link, redirect, json } from "react-router-dom";
import { FormLabel, Stack, TextField, Card, } from "@mui/material";
// import classes from './authform.module.css';

const Authform = () => {
    const [searchParams] = useSearchParams();
    const isLogin = searchParams.get('mode') === 'login';

    return <>

        <div style={{ marginTop: "8rem" }}>


            <Card variant="outlined" style={{ width: "25rem", height: "fit-content", padding: "1rem 2rem", margin: "5rem auto" }}>
                <Form method="POST" >

                    <h2 style={{ fontFamily: "sans-serif", textAlign: "center" }}>{isLogin ? "Login" : "Signup"}</h2>
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

                        <button>{isLogin ? "Login" : "Create Account"}</button>

                        <p style={{ textAlign: "center" }}>or</p>

                        <Link to={`?mode=${isLogin ? "signup" : "login"}`} style={{ textAlign: "center", margin: "0", padding: "0", color: "blue", textTransform: "capitalize" }}>{isLogin ? "create new account" : "login"}</Link>
                    </Stack>
                </Form>
            </Card>




        </div>

    </>
}

export default React.memo(Authform);

export async function action({ request }) {


    const searchParams = new URL(request.url).searchParams;
    const mode = searchParams.get('mode');
    const data = await request.formData();

    const user = {
        email: data.get('email'),
        password: data.get('password')
    }


    const response = await fetch("http://localhost:8080/" + mode, {
        method: request.method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })

    if (response.status === 401) {
        throw json({ message: `could not ${mode} ` }, { status: 401 });
    }

    const resData = await response.json();
    console.log(resData);
    const token = resData.token;

    localStorage.setItem('token', token);
    localStorage.setItem('userid', resData.userid);


    return redirect('/useraccount');


}