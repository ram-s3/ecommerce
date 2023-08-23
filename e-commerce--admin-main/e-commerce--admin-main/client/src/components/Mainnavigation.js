import { NavLink, Form, useRouteLoaderData } from 'react-router-dom';
import React from 'react';
import classes from './Mainnav.module.css';

const Mainnavigation = () => {
    const token = useRouteLoaderData('root');



    return <>
        <header>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/" className={({ isActive }) => isActive ? classes.active : undefined}>Home</NavLink>
                    </li>

                    {!token &&
                        <li>
                            <NavLink to="/auth?mode=login" end className={({ isActive }) => isActive ? classes.active : undefined}>Login</NavLink>
                        </li>

                    }

                    {token &&
                        <li>
                            <NavLink to="/newproduct" className={({ isActive }) => isActive ? classes.active : undefined}>add new product</NavLink>
                        </li>
                    }
                    {token &&
                        <li>
                            <NavLink to="/useraccount" className={({ isActive }) => isActive ? classes.active : undefined}>Account</NavLink>
                        </li>
                    }


                    {token &&
                        <li>
                            <Form action='/logout' method='post'>
                                <button>Logout</button>
                            </Form>
                        </li>

                    }
                </ul>
            </nav>
        </header>
    </>


}

export default React.memo(Mainnavigation);