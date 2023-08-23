import React from "react";
import { Form, json, redirect } from 'react-router-dom';
import classes from './styles/form.module.css';
import { gettoken } from "../../util/authtoken";

const Newcategoryform = (props) => {

    return <Form className={classes.categoryform} method="PATCH" action="newcategory">
        <label htmlFor="name">name</label>
        <input id="name" name="name" required type="text" defaultValue={''} />
        <label htmlFor="desc">description</label>
        <textarea id="desc" name='desc' required defaultValue={''} />
        <button onClick={() => props.clsoverly()}>Add</button>
    </Form>
}

export default React.memo(Newcategoryform);


export async function action({ request }) {

    const data = await request.formData();

    const newcategory = {
        name: data.get('name'),
        desc: data.get('desc'),
        create_at: new Date(),
        modified_at: 'null',
        deleted_at: 'null'
    }

    const token = gettoken();
    const response = await fetch("http://localhost:8080/admin/products/newcategory", {
        method: request.method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token

        },
        body: JSON.stringify(newcategory)
    })

    if (response.status === 401) {
        throw json({ message: `could not add new category ` }, { status: 401 });
    }

    const resData = await response.json();
    console.log(resData);


    return redirect('/admin/dashboard/products');


}