import React, { Suspense } from "react";
import { Link, useNavigate, useLoaderData, json, defer, Await, redirect } from 'react-router-dom';
import ProductList from "../components/ProductList";
import { gettoken } from "../util/authtoken";


const Homepage = () => {
    const navigate = useNavigate();
    // const productdata = useLoaderData(); old code
    const { products } = useLoaderData();



    const contactusbtnHandler = () => {
        navigate('/contactus');
    }
    return <Suspense fallback={<p>loading....</p>}> <Await resolve={products}>
        {(productsdata) => <> <h1>my home page</h1>
            <p>go to <Link to='/productdetails'>product details page</Link></p>
            {/* <Link to='/contactus'>contact us</Link> */}
            {/* {productdata.map((product) => (<div key={product._id}>{product.color}</div>))} */}
            <ProductList product={productsdata} />
            <button onClick={contactusbtnHandler}>contact us</button></>}
    </Await></Suspense>

}

const getdata = async () => {
    const response = await fetch('http://localhost:8080/');


    if (!response.ok) {
        throw json({ message: "could not fetcch data from server!" }, { status: 500 });
    }
    else {
        const resData = await response.json();
        // return response;
        return resData;

    }

}

export default Homepage;

export function loader() {
    const token = gettoken();
    if (!token) {
        return redirect('/admin');
    }
    return defer({
        products: getdata()
    })
}