import { redirect } from "react-router-dom";

export function action() {

    localStorage.removeItem('token');
    localStorage.clear();

    return redirect('/')

}