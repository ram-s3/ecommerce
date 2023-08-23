import { NavLink, Form, useRouteLoaderData } from 'react-router-dom';
import React from 'react';
import classes from '../Mainnav.module.css';

const AdminNavigation = () => {
    const token = useRouteLoaderData('adminroot');



    return <>
        <header>
            <nav>
                <ul>
                    {/* <li>
                        <NavLink to="/" className={({ isActive }) => isActive ? classes.active : undefined}>Home</NavLink>
                    </li> */}

                    {!token &&
                        <li>
                            <NavLink to="/admin" end className={({ isActive }) => isActive ? classes.active : undefined}>Login</NavLink>
                        </li>

                    }

                    {token &&
                        <li>
                            <NavLink to="/admin/newproduct" className={({ isActive }) => isActive ? classes.active : undefined}>add new product</NavLink>
                        </li>
                    }
                    {/* {token &&
                        <li>
                            <NavLink to="/admin" className={({ isActive }) => isActive ? classes.active : undefined}>admin</NavLink>
                        </li>
                    } */}


                    {token &&
                        <li>
                            <Form action='/admin/logout' method='post'>
                                <button>Logout</button>
                            </Form>
                        </li>

                    }
                </ul>
            </nav>
        </header>
    </>


}

export default React.memo(AdminNavigation);