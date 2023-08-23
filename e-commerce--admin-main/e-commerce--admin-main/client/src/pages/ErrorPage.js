import React from "react";
import Mainnavigation from "../components/Mainnavigation";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError();
    let title = "An error occurred";
    let message = "could not find page 404!";
    console.log(error);

    if (error.status === 500) {
        message = error.data.message;
    }
    if (error.status === 401) {
        message = error.data.message;
    }



    return <>
        <Mainnavigation />
        <h2>{title}</h2>
        <p>{message}</p>
    </>
}

export default ErrorPage;