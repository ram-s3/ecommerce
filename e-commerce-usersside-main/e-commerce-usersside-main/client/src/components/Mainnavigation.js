import { NavLink, Form, useRouteLoaderData, useSubmit, Link } from 'react-router-dom';
import React from 'react';
import { useState } from 'react';
import classes from './Mainnavigation.module.css';
import { action } from './ProductList';
import { Button, Card, CardContent, Grid, Stack, SvgIcon, TextField } from '@mui/material';
import catimg from '../images/1.png';
import furniture from '../images/categories/furniture.png';
import shoes from '../images/categories/shoes.png';
import laptop from '../images/categories/laptop.png';
import groceries from '../images/categories/groceries.png';
import SearchIcon from '@mui/icons-material/Search';
// import CartIcon from '@mui/icons-material/Cart';




const Mainnavigation = () => {
    const [searchsug, setsearchsug] = useState('none');
    const [searchresults, setsearchresults] = useState([]);
    const token = useRouteLoaderData('root');
    const submit = useSubmit();


    const onChangeHandler = async (e) => {
        if (e.target.value !== "") {
            setsearchsug('block')
            const results = await fetch('http://localhost:8080/search/' + e.target.value);
            const res = await results.json()
            setsearchresults(res);
        } else {
            setsearchsug("none")
        }

    }


    const categories = [
        {
            title: "Mobile Phones",
            img: catimg
        },
        {
            title: "Laptops",
            img: laptop
        },
        {
            title: "furniture",
            img: furniture
        },
        {
            title: "Groceries",
            img: groceries
        },
        {
            title: "Shoes",
            img: shoes
        }
    ]



    return <>
        <div className={classes.container}>
            <div className={classes.rightmenu}>
                <Link to="/" style={{ margin: "0", padding: "0", color: "black" }}><h2>
                    Quickby
                </h2>
                </Link>
                {/* <h2>Quickbuy</h2> */}
                <ul>
                    <li>

                        <div className={classes.dropdown}>

                            <button>Categories</button>

                            <div className={classes.dropdownoptions}>
                                <h4 style={{ marginLeft: "1.5rem" }}>Product categories</h4>
                                <CardContent sx={{ zIndex: "99999" }}>
                                    <Grid container spacing={2} className={classes.grid}>
                                        {
                                            categories.map(category => (

                                                <Card key={category.title}>

                                                    <Link to={`productcategory/${category.title}`} style={{ width: "100%", height: "100%", margin: "0", padding: "0" }}>
                                                        <Grid container spacing={2} style={{ marginTop: "0rem", padding: "0px" }}>
                                                            <img src={category.img} alt="category" />
                                                            <span style={{ margin: "1rem 0.5rem", fontWeight: "bold", textTransform: "capitalize" }}>
                                                                {category.title}
                                                            </span>
                                                        </Grid>
                                                    </Link>
                                                </Card>
                                            ))
                                        }

                                    </Grid>
                                </CardContent>
                            </div>
                        </div>
                    </li>
                    <li>
                        <Link to="#">Deals</Link>
                    </li>
                    <li>

                        <Link to="#">What's New</Link>
                    </li>
                </ul>
            </div>



            <div className={classes.searchcontainer} >

                <div className={classes.search}>
                    <Form>
                        <input
                            type='search'
                            size='small'
                            name='search'
                            placeholder='Search Product'
                            autoComplete='off'
                            onChange={onChangeHandler}

                        />

                    </Form>
                    <SvgIcon>
                        <SearchIcon style={{ backgroundColor: "red", color: "rgb(42, 40, 40)", margin: "0.2rem 1rem 0rem 0rem", padding: "0" }} />
                    </SvgIcon>

                </div>

                <div style={{ display: `${searchsug}`, backgroundColor: "white", borderRadius: "6px", marginTop: "1.4rem", boxShadow: "0px 1px 1px grey" }} >
                    <ul className={classes.searchresultslist}>

                        {/* {searchresults.map(result => <li key={result._id}>{result.name} */}

                        <CardContent >
                            <Stack container spacing={2} className={classes.grid}>
                                {searchresults.length === 0 && <p style={{ textAlign: "center" }}>"No poducts found"</p>}
                                {
                                    searchresults.map(result => (
                                        <li key={result._id}>

                                            {/* <Link to={`/productdetails/${result._id}`}> */}

                                            <Card>

                                                <Link to={`/productdetails/${result._id}`} style={{ width: "100%", height: "100%", margin: "0", padding: "0" }}>
                                                    <Grid container spacing={2} style={{ marginTop: "0rem", padding: "0px", display: "flex", flexDirection: "row", flexWrap: "nowrap" }}>
                                                        <img src={`http://localhost:8080` + result.images} alt="category" width={60} height={50} />
                                                        <div style={{ margin: "0rem 0.5rem", fontSize: "16px", textTransform: "capitalize", display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                                                            <p>
                                                                {result.name}

                                                            </p>
                                                            <p>

                                                                ${result.price}
                                                            </p>




                                                        </div>

                                                    </Grid>
                                                </Link>
                                            </Card>
                                            {/* </Link> */}
                                        </li>
                                    ))
                                }

                            </Stack>
                        </CardContent>


                        {/* </li>)} */}
                    </ul>
                </div>
            </div>


            <ul className={classes.ul}>
                <li>


                </li>
                {/* <li>
                    <NavLink to="/" className={({ isActive }) => isActive ? classes.active : undefined}>Home</NavLink>
                </li> */}
                <li>

                </li>


                <li>
                    {
                        token &&
                        <NavLink to="/cart" className={({ isActive }) => isActive ? classes.active : undefined}>Cart</NavLink>
                    }
                </li>

                <li>
                    {!token &&

                        <NavLink to="auth?mode=login" end className={({ isActive }) => isActive ? classes.active : undefined}>Login</NavLink>
                    }
                </li>

                <li>
                    {token &&

                        <NavLink to="/useraccount" className={({ isActive }) => isActive ? classes.active : undefined}>Account</NavLink>
                    }
                </li>




                <li>
                    {token &&
                        <button
                            onClick={() => submit(null, { method: "POST", action: '/logout' })}
                        >Logout</button>
                    }


                </li>

            </ul>
        </div >
    </>


}

export default React.memo(Mainnavigation);





