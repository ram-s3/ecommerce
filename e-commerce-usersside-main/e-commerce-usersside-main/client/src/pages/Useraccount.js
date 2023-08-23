import React, { Suspense } from "react";
import { getuserid } from "../util/authtoken";
import { defer, json, useLoaderData, Await, redirect, Link } from "react-router-dom";
import { Card, Stack, TextField, FormLabel, CardContent, Grid } from "@mui/material";
import { Form } from "react-router-dom";
import classes from './useraccount.module.css';


const Userpanel = () => {
    const { userdata, orderdetails } = useLoaderData();


    return <Suspense fallback={<p style={{ textAlign: "center" }}>Loading....</p>}>
        <div className={classes.maincontainer}>

            <Await resolve={orderdetails}>




                {(orderdata) => (

                    <div className={classes.ordercontainer}>


                        <h3><strong>
                            My Orders
                        </strong>
                        </h3>

                        {orderdata.length === 0 && <p style={{ textAlign: "center" }}>"No orders found"</p>}

                        <ul>

                            {
                                orderdata.map(order => (
                                    <li key={order._id} style={{ border: "1px solid black" }}>
                                        <h4>
                                            Product Name: {order.product_name}
                                        </h4>
                                        <p>
                                            quantity: {order.quantity}
                                        </p>
                                        <p>
                                            Total Amount: ${order.totalamount}
                                        </p>

                                        Delivery status: <span style={{ color: `${order.status === "Delivered" && 'green'}` }}>
                                            {order.status}
                                        </span>
                                    </li>
                                ))
                            }




                        </ul>

                    </div>
                )}


            </Await>






            <Await resolve={userdata}>
                {(user) => (

                    <>

                        <div>
                            <h3><strong>
                                My Address
                            </strong>
                            </h3>

                            <Card variant="outlined" style={{ width: "25rem", height: "fit-content", padding: "1rem 2rem", margin: "auto" }}>
                                <Form method="POST" >

                                    <Stack direction="column">

                                        <FormLabel>Name</FormLabel>
                                        <TextField
                                            required
                                            size="small"
                                            type="text"
                                            name="name"
                                            variant="outlined"
                                            color="secondary"
                                            defaultValue={user.name ? user.name : ''}
                                        />
                                        <FormLabel>Email</FormLabel>
                                        <TextField
                                            required
                                            size="small"
                                            type="text"
                                            name="email"
                                            variant="outlined"
                                            color="secondary"
                                            defaultValue={user.email}
                                        />
                                        <FormLabel>Phone</FormLabel>
                                        <TextField
                                            required
                                            size="small"
                                            type="text"
                                            name="phone"
                                            variant="outlined"
                                            color="secondary"
                                            defaultValue={user.address ? user.address.phone : ''}
                                        />
                                        <FormLabel>Address Line 1</FormLabel>
                                        <TextField
                                            required
                                            size="small"
                                            type="text"
                                            name="address"
                                            variant="outlined"
                                            color="secondary"
                                            defaultValue={user.address ? user.address.address_line : ''}
                                        />
                                        <FormLabel>city</FormLabel>
                                        <TextField
                                            required
                                            size="small"
                                            type="text"
                                            name="city"
                                            variant="outlined"
                                            color="secondary"
                                            defaultValue={user.address ? user.address.city : ''}
                                        />
                                        <FormLabel>Postal code</FormLabel>
                                        <TextField
                                            required
                                            size="small"
                                            type="text"
                                            name="postal_code"
                                            variant="outlined"
                                            color="secondary"
                                            defaultValue={user.address ? user.address.postal_code : ''}
                                        />

                                        <button>Save</button>
                                    </Stack>
                                </Form>
                            </Card>

                        </div>

                    </>







                )



                }
            </Await>
        </div>
    </Suspense>

}

export default React.memo(Userpanel);

async function getuserdata() {

    const userid = getuserid();

    if (!userid) {
        return redirect('/auth');
    }
    const userdata = await fetch('http://localhost:8080/account/user/' + userid);


    if (!userdata.ok) {
        throw json({ message: "could not fetcch data from server!" }, { status: 500 });
    }
    const userd = await userdata.json();
    console.log(userd);
    return userd;
}


async function getorderdetials() {
    const userid = getuserid()
    const orderdetails = await fetch("http://localhost:8080/ordersby/" + userid);



    if (!orderdetails.ok) {
        throw json({ message: "could not fetch order details" }, { status: 404 });
    }

    const orderdetailsdata = await orderdetails.json();
    return orderdetailsdata;

}


export function loader() {

    return defer({
        userdata: getuserdata(),
        orderdetails: getorderdetials(),
    })

}



export async function action({ request }) {

    const userid = getuserid();
    const data = await request.formData();

    const user = {
        userid: userid,
        name: data.get('name'),
        email: data.get('email'),
        address: {
            address_line: data.get('address'),
            city: data.get("city"),
            postal_code: data.get("postal_code"),
            phone: data.get('phone'),

        }



    }


    const response = await fetch("http://localhost:8080/updateuser", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })

    if (response.status === 401) {
        throw json({ message: `could not update user ` }, { status: 401 });
    }

    const resData = await response.json();
    console.log(resData);


    return redirect('/useraccount');


}
