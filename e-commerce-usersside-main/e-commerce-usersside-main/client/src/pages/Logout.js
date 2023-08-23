import { redirect } from "react-router-dom";

export function action() {

    localStorage.removeItem('token');
    localStorage.removeItem('userid');
    localStorage.clear();

    return redirect('/')

}