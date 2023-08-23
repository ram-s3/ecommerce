import React from "react";
import { json, redirect, useLoaderData, useSubmit } from "react-router-dom";
import { Table, Paper, TableHead, TableContainer, TableBody, TableRow, TableCell, Button } from "@mui/material";
import classes from "./styles/products.module.css";



const Users = () => {
    const submit = useSubmit();
    const users = useLoaderData();
    // console.log(users);
    return <>
        <div className={classes.products}>
            <h2>Registered users</h2>
        </div>

        <TableContainer component={Paper} style={{ margin: "1rem auto", width: "85%" }}>
            <Table aria-label="users">
                <TableHead style={{ backgroundColor: "#383e47" }}>
                    <TableRow >

                        <TableCell style={{ color: "white", fontWeight: "bold", fontSize: "16px" }}>Full Name</TableCell>
                        <TableCell style={{ color: "white", fontWeight: "bold", fontSize: "16px" }}>Email</TableCell>
                        <TableCell style={{ color: "white", fontWeight: "bold", fontSize: "16px" }}>Phone</TableCell>
                        <TableCell style={{ color: "white", fontWeight: "bold", fontSize: "16px" }}>Address</TableCell>
                        <TableCell style={{ color: "white", fontWeight: "bold", fontSize: "16px" }}>Created_at</TableCell>
                        <TableCell style={{ color: "white", fontWeight: "bold", fontSize: "16px" }}>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        users.map((row) => (
                            <TableRow key={row._id} >
                                <TableCell>{row.fullname}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.phone}</TableCell>
                                <TableCell>{row.address.address_line},{row.address.city},{row.address.postal_code},{row.address.phone}</TableCell>
                                <TableCell>{row.created_at}</TableCell>
                                <TableCell>
                                    <Button onClick={() => {
                                        submit(null, { method: "DELETE", action: "delete/" + row._id })
                                    }} style={{ backgroundColor: '#f03949', color: 'white' }}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>


        </TableContainer>


    </>
}

export default React.memo(Users);

export async function loader() {

    const response = await fetch("http://localhost:8080/admin/getusers");

    // console.log(response);

    if (!response.ok) {
        throw json({ message: "could not load users" }, { status: 500 })
    }

    const users = await response.json();
    console.log(users);
    return users;

}

export async function action({ request, params }) {

    const id = params.id;


    const response = await fetch("http://localhost:8080/admin/deleteuser/" + id,
        {
            method: request.method,
        }
    )

    if (!response.ok) {
        throw json({ message: "could not delete user" }, { status: 500 })
    }

    return redirect("/admin/dashboard/users");

}

