import { redirect } from "react-router-dom";

export function gettoken() {
    const token = localStorage.getItem('token');
    return token;
}

export function getuserid() {
    const userid = localStorage.getItem("userid");
    return userid;
}

export function loader() {
    return gettoken();
}

export function authrouteloader() {
    const token = gettoken();
    if (!token) {
        return redirect('/auth');
    }
    return null;
}