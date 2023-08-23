import { Outlet } from "react-router-dom";
import AdminNavigation from "../../components/admin/AdminNavigation";
import React from "react";

const AdminNav = () => {

    return <>
        <AdminNavigation />
        <main>
            <Outlet />
        </main>
    </>

}

export default React.memo(AdminNav);