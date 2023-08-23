import React from "react";
import { json, useRouteLoaderData, Link, useSubmit, redirect } from "react-router-dom";
import { gettoken } from "../util/authtoken";

const Productdetails = () => {
    const submit = useSubmit();

    const productdetails = useRouteLoaderData('productdetails');
    const token = useRouteLoaderData('root');
    // console.log(productdetails.images);

    const productdeleteHandler = () => {
        const proceed = window.confirm("are your sure to delete the product?");

        if (proceed) {
            submit(null, { method: 'DELETE' });
        }
    }

    return <>
        <Link to="..">-back</Link>
        <img src={'http://localhost:8080' + productdetails.images} alt="beds img" width={200} height={200} />

        {token &&
            <>
                <Link to="edit">edit</Link>
                <button onClick={productdeleteHandler}>delete</button>
            </>
        }

    </>
}

export default Productdetails;

export async function loader({ request, params }) {

    const id = params.id;
    const productdetails = await fetch("http://localhost:8080/productdetails/" + id);



    if (!productdetails.ok) {
        throw json({ message: "could not fetch product details" }, { status: 404 });
    }
    else {
        return productdetails;
    }

}

export async function action({ request, params }) {

    const id = params.id;

    const token = gettoken();

    const resonse = await fetch("http://localhost:8080/productdetails/" + id, {
        method: request.method,
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })

    if (!resonse.ok) {
        throw json({ message: 'could not delete' }, { status: 500 })
    }

    return redirect('/');

}