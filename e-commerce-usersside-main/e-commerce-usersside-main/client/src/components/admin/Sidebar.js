import React from "react";
import { NavLink, Form } from "react-router-dom";
import classes from "./styles/sidebar.module.css";
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import GroupIcon from '@mui/icons-material/Group';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';


const Sidebar = () => {

    return <>
        <ul className={classes.ul}>

            <h2>quickbuy</h2>

            <li>
                <NavLink to="products" className={({ isActive }) => isActive ? classes.linkactive : undefined} >
                    <PrecisionManufacturingIcon style={{ color: "white", paddingRight: '5px', width: "20px", height: "18px" }} className={classes.icon} />
                    Products</NavLink>

            </li>
            <li>
                <NavLink to="users" className={({ isActive }) => isActive ? classes.linkactive : undefined}>
                    <GroupIcon style={{ color: 'white', paddingRight: '5px' }} className={classes.icon} />
                    Users</NavLink>
            </li>
            <li>
                <NavLink to="orders" className={({ isActive }) => isActive ? classes.linkactive : undefined}>
                    <LocalShippingIcon style={{ color: 'white', paddingRight: '5px' }} className={classes.icon} />
                    Orders</NavLink>
            </li>


            <Form action="/admin/logout" method="post"><button>Logout</button></Form>

        </ul >
    </>
}

export default React.memo(Sidebar);