import React from "react";
import Editform from "../components/Editform";
import { Link } from "react-router-dom";

const Newproductpage = () => {

    return <>
        <Editform method={"POST"} />
        <Link to="..">back</Link>
    </>

}


export default Newproductpage;
