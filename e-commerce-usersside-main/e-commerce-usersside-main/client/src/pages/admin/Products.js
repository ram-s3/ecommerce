import React, { useState, Suspense } from "react";
import { useLoaderData, json, defer, Await, useSubmit, redirect } from "react-router-dom";
import classes from './styles/products.module.css';
import Newcategoryform from "../../components/admin/Newcategoryform";
import ProductList from "../../components/ProductList";
import Newproductform from "../../components/admin/Newproductform";
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Button } from "@mui/material";
import { gettoken } from "../../util/authtoken";


const Products = () => {

    const { catandproddata } = useLoaderData();
    const submit = useSubmit();

    // console.log(catandproddata.resData)

    const [overlay, setOverlay] = useState('none');
    const [prooverlay, Setprooverlay] = useState('none');

    function newcatOverlayHandler() {
        setOverlay('block')
    }
    function closeOverlayHandler() {
        setOverlay("none");
    }
    function proOverlayHandler() {
        Setprooverlay('block')
    }
    function closeproOverlayHandler() {
        Setprooverlay("none");
    }

    // return <>
    //     {/* for new category overlay */}
    //     <div style={{ display: `${overlay}`, position: "fixed", width: "100%", height: "100%", zIndex: "0", backgroundColor: "rgba(0, 0, 0, 0.445)", }} onClick={closeOverlayHandler}>

    //     </div>
    //     <div style={{ display: `${overlay}`, position: "fixed", width: '100%', margin: "10% 30%" }} >
    //         <Newcategoryform clsoverly={closeOverlayHandler} />
    //     </div>



    //     {/* for newproductform overlay */}
    //     <div style={{ display: `${prooverlay}`, position: "fixed", width: "100%", height: "100%", zIndex: "0", backgroundColor: "rgba(0, 0, 0, 0.445)", }} onClick={closeproOverlayHandler}>

    //     </div>
    //     <div style={{ display: `${prooverlay}`, position: "fixed", width: '100%', margin: "10% 30%" }} >
    //         <Newproductform clsoverly={closeproOverlayHandler} method='POST' />
    //     </div>

    //     <div className={classes.categories}>
    //         <h2 >Product categorie</h2>
    //         <button onClick={newcatOverlayHandler}>+ New Category</button>
    //         <ul>
    //             {resData.map((cat) => (<li key={cat._id} title={cat.desc}>{cat.name}</li>))}
    //         </ul>
    //     </div>
    //     <div className={classes.products}>
    //         <h2>Prouducts</h2>
    //         <button onClick={proOverlayHandler}>+ New Product</button>
    //         <ProductList product={prodata} />
    //     </div>
    // </>


    return <Suspense fallback={<div className={classes.loading}><h2>Loading.... Please wait</h2></div>}> <Await resolve={catandproddata}>
        {(data) => <>
            {/* for new category overlay */}
            <div style={{ display: `${overlay}`, position: "fixed", width: "100%", height: "100%", zIndex: "1", backgroundColor: "rgba(0, 0, 0, 0.445)", }} onClick={closeOverlayHandler}>

            </div>
            <div style={{ display: `${overlay}`, position: "fixed", width: '100%', margin: "10% 30%", zIndex: "100" }} >
                <Newcategoryform clsoverly={closeOverlayHandler} />
            </div>



            {/* for newproductform overlay */}
            <div style={{ display: `${prooverlay}`, position: "fixed", width: "100%", height: "100%", zIndex: "1", backgroundColor: "rgba(0, 0, 0, 0.445)", }} onClick={closeproOverlayHandler}>

            </div>
            <div style={{ display: `${prooverlay}`, position: "fixed", width: 'fit-content', margin: "1rem 30%", zIndex: "100", backgroundColor: "red" }} >
                <Newproductform clsoverly={closeproOverlayHandler} method='POST' />
            </div>

            {/* category table view */}


            {/* 
            <div className={classes.categories}>
                <h2 >Product categorie</h2>
                <button onClick={newcatOverlayHandler}>+ New Category</button>
                <ul>
                {data.resData.map((cat) => (<li key={cat._id} title={cat.desc}>{cat.name}</li>))}
                </ul>
            </div> */}

            <div className={classes.categorycontainer}>

                <div className={classes.categories}>
                    <h2 >Product categories</h2>
                    <button onClick={newcatOverlayHandler}>+ New Category</button>
                </div>

                <TableContainer component={Paper} style={{ margin: "1rem auto", width: "85%" }}>
                    <Table aria-label="Product Categories">
                        <TableHead style={{ backgroundColor: "#383e47" }}>
                            <TableRow >

                                <TableCell style={{ color: "white", fontWeight: "bold", fontSize: "16px" }}>Category Name</TableCell>
                                <TableCell style={{ color: "white", fontWeight: "bold", fontSize: "16px" }}>Description</TableCell>
                                <TableCell style={{ color: "white", fontWeight: "bold", fontSize: "16px" }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                data.resData.map((row) => (
                                    <TableRow key={row._id} >
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.desc}</TableCell>
                                        <TableCell>
                                            <Button onClick={() => {
                                                submit(null, { method: "DELETE", action: "delete/category/" + row._id })
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



            </div>



            <div className={classes.productcontainer}>

                {/* product data card view */}

                <div className={classes.products}>
                    <h2>Products</h2>
                    <button onClick={proOverlayHandler}>+ New Product</button>
                </div>
                <ProductList product={data.prodata} />

            </div>

        </>}

    </Await></Suspense>
}

export default React.memo(Products);

// export async function loader() {
//     const response = await fetch('http://localhost:8080/admin/productcategories');
//     const productresponse = await fetch('http://localhost:8080/admin/products');


//     if (!productresponse.ok) {
//         throw json({ message: "could not fetcch data from server!" }, { status: 500 });
//     }
//     if (!response.ok) {
//         throw json({ message: "could not fetcch data from server!" }, { status: 500 });
//     }
//     else {
//         const resData = await response.json();
//         const prodata = await productresponse.json();
//         // return response;
//         return { resData, prodata };

//     }

// }



const getcatprod = async () => {
    const response = await fetch('http://localhost:8080/admin/productcategories');
    const productresponse = await fetch('http://localhost:8080/admin/products');


    if (!productresponse.ok) {
        throw json({ message: "could not fetcch data from server!" }, { status: 500 });
    }
    if (!response.ok) {
        throw json({ message: "could not fetcch data from server!" }, { status: 500 });
    }
    else {
        const resData = await response.json();
        const prodata = await productresponse.json();
        // return response;
        return { resData, prodata };

    }
}

export async function loader() {

    return defer({
        catandproddata: getcatprod()
    })
}


export async function action({ request, params }) {

    const id = params.id;

    const token = gettoken();
    const response = await fetch("http://localhost:8080/admin/category/delete/" + id,
        {
            method: request.method,
            headers: {
                'Authorization': "Bearer " + token
            }
        }
    )

    if (!response.ok) {
        throw json({ message: "could not delete category" }, { status: 500 })

    }

    return redirect('/admin/dashboard/products');

}