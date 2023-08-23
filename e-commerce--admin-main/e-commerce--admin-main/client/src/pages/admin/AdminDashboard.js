import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import classes from './styles/Dashboard.module.css';
const AdminDashboard = () => {


    return <>
        <div className={classes.container}>
            <nav className={classes.nav}>
                <Sidebar />
            </nav>
            <main>
                <Outlet />
            </main>

        </div>

    </>
}

export default React.memo(AdminDashboard);