import React from "react";
import { Outlet } from "react-router-dom";
import Mainnavigation from "../components/Mainnavigation";
import classes from './navhomelayout.module.css';
const NavHomeLayout = () => {


    return <>
        <div className={classes.container}>

            <nav className={classes.nav}>
                <Mainnavigation />
            </nav>
            <main className={classes.main}>
                <Outlet />
            </main>

        </div>

    </>
}

export default React.memo(NavHomeLayout);