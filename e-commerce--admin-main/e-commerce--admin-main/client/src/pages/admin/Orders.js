import React from "react";
import { json, redirect, useLoaderData, useSubmit, Form } from "react-router-dom";
import { Table, Paper, TableHead, TableContainer, TableBody, TableRow, TableCell, Button } from "@mui/material";
import classes from "./styles/products.module.css";



const Orders = () => {
    const submit = useSubmit();
    const orders = useLoaderData();
    return <>
        <div className={classes.products}>
            <h2>Registered users</h2>
        </div>

        <TableContainer component={Paper} style={{ margin: "1rem auto", width: "85%" }}>
            <Table aria-label="Orders">
                <TableHead style={{ backgroundColor: "#383e47" }}>
                    <TableRow >

                        <TableCell style={{ color: "white", fontWeight: "bold", fontSize: "16px" }}>user id</TableCell>
                        <TableCell style={{ color: "white", fontWeight: "bold", fontSize: "16px" }}>products id</TableCell>
                        <TableCell style={{ color: "white", fontWeight: "bold", fontSize: "16px" }}>quantity</TableCell>
                        <TableCell style={{ color: "white", fontWeight: "bold", fontSize: "16px" }}>total amount</TableCell>
                        <TableCell style={{ color: "white", fontWeight: "bold", fontSize: "16px" }}>payment id</TableCell>
                        <TableCell style={{ color: "white", fontWeight: "bold", fontSize: "16px" }}>Created_at</TableCell>
                        <TableCell style={{ color: "white", fontWeight: "bold", fontSize: "16px" }}>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        orders.map((row) => (
                            <TableRow key={row._id} >
                                <TableCell>{row.user_id}</TableCell>
                                <TableCell><ul>
                                    {row.ordered_item.map(item => (<li key={row._id + Math.random()}>{item},</li>))}</ul></TableCell>


                                <TableCell>{row.quantity}</TableCell>
                                <TableCell>{row.totalamount}</TableCell>
                                <TableCell>{row.payment_id}</TableCell>

                                <TableCell>{row.created_at}</TableCell>
                                <TableCell>
                                    <Form onChange={(event) => {
                                        const e = event.target;
                                        const setstatus = e.options[e.selectedIndex].value
                                        let formdata = new FormData();
                                        formdata.append('status', setstatus);
                                        submit(formdata, { method: "PATCH", action: "setstatus/" + row._id })
                                    }}>

                                        <select name="status">
                                            {row.status && <option defaultValue={row.status}>{row.status}</option>}
                                            <option value="on hold">On hold</option>
                                            <option value="processing" >Processing</option>
                                            <option value="shipped">shipped</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>

                                    </Form>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>


        </TableContainer>


    </>
}

export default React.memo(Orders);

export async function loader() {

    const response = await fetch("http://localhost:8000/admin/getorders");

    // console.log(response);

    if (!response.ok) {
        throw json({ message: "could not load orders" }, { status: 500 })
    }

    const orders = await response.json();
    console.log(orders);
    return orders;

}

export async function action({ request, params }) {

    const id = params.id;

    const data = await request.formData();

    const editedorder = {
        status: data.get('status')
    }


    const response = await fetch("http://localhost:8000/admin/order/setstatus/" + id,
        {
            method: request.method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedorder)

        }
    )

    if (!response.ok) {
        throw json({ message: "could set order stauts" }, { status: 500 })
    }

    return redirect("/admin/dashboard/orders");

}

