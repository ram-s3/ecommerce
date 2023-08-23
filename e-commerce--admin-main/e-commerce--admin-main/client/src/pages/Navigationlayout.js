import { Outlet } from "react-router-dom";
import Mainnavigation from "../components/Mainnavigation";
import React from "react";

const Navigationlayout = () => {

    return <>
        <Mainnavigation />
        <main>
            <Outlet />
        </main>
    </>

}

export default Navigationlayout;