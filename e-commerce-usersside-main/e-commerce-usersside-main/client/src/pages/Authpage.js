import React from "react";
import Authform from "../components/Authform";



const Authpage = () => {


    return <>

        <div>
            <Authform />
        </div>


    </>
}

export default Authpage;



// async function getproductdetials() {
//     const userid = getuserid()
//     const orderdetails = await fetch("http://localhost:8080/ordersby/" + userid);



//     if (!orderdetails.ok) {
//         throw json({ message: "could not fetch order details" }, { status: 404 });
//     }

//     const orderdetailsdata = await orderdetails.json();
//     return orderdetailsdata;

// }

// export async function loader() {
//     return defer({
//         orderdetails: getproductdetials()
//     })


// }
