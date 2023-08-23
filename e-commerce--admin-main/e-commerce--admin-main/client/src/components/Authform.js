import React from "react";
import { Form, useSearchParams, Link, redirect, json } from "react-router-dom";

const Authform = () => {
    const [searchParams] = useSearchParams();
    const isLogin = searchParams.get('mode') === 'login';

    return <Form method="POST">
        <h1>{isLogin ? "LOGIN" : "SIGNUP"}</h1>
        <label htmlFor="email">email:</label>
        <input id="email" name="email"></input>
        <label htmlFor="password" >password: </label>
        <input id="password" name="password" />
        <button>{isLogin ? "login" : "signup"}</button>
        <p>or</p>
        <Link to={`?mode=${isLogin ? "signup" : "login"}`}>{isLogin ? "create new account" : "login"}</Link>



    </Form>
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


    const response = await fetch("http://localhost:8000/admin/" + mode, {
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


    return redirect('/useraccount');


}