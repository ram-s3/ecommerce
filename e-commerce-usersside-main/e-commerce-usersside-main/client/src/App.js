import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './app.css';




import Homepage, { loader as productloader } from './pages/Homepage';
import ErrorPage from './pages/ErrorPage';


import Authpage, { loader as userorderloader } from './pages/Authpage';
import { action as authaction } from './components/Authform';
import { action as logoutaction } from './pages/Logout';
import Useraccount, { loader as useraccloader, action as updateuseraction } from './pages/Useraccount';
import { loader as gettokenloader, authrouteloader } from './util/authtoken';
import Adminauth, { action as adminauthaction } from './components/admin/Adminauth';


import { action as adminlogoutaction } from './pages/admin/logout';
import AdminDashboard from './pages/admin/AdminDashboard';
import Products from './pages/admin/Products';
import Orders from './pages/admin/Orders';

import Users from './pages/admin/Users';


//admin imports
import Editproductpage from './pages/admin/Editproductpage';
import { action as categoriesaction } from './components/admin/Newcategoryform';
import { loader as categoriesloader } from './pages/admin/Products';
import { action as productaction } from './components/admin/Newproductform';
import { loader as productdata } from './components/admin/Editform';
import { action as editproductaction } from './components/admin/Editform';
import { action as deleteproductaction } from './components/ProductList';
import { action as deletecategoryaction } from './pages/admin/Products';


import { loader as usersloader } from './pages/admin/Users';
import { action as userdeleteaction } from "./pages/admin/Users";


import { loader as orderloader } from './pages/admin/Orders';
import { action as orderstatusaction } from './pages/admin/Orders';
import NavHomeLayout from './pages/NavHomeLayout';

//users imports
import Productbycategory, { loader as bycategoryloader } from './pages/Productbycategory';
import Productdetails, { loader as productdetailsloader } from './pages/Productdetails';



const router = createBrowserRouter([





  {
    path: '/admin/dashboard',
    errorElement: <ErrorPage />,
    element: <AdminDashboard />,
    id: 'dashboardstarting',
    children: [
      {
        path: 'products',
        element: <Products />,
        action: productaction,
        loader: categoriesloader,

      },
      {
        path: 'products/newcategory',
        action: categoriesaction,
      },

      {
        path: 'products/edit/:id', element: <Editproductpage />,
        action: editproductaction,
        loader: productdata

      },

      {
        path: 'products/delete/:id',
        action: deleteproductaction
      },

      {
        path: 'products/delete/category/:id',
        action: deletecategoryaction
      },

      // usersroutes


      {
        path: 'users', element: <Users />, loader: usersloader
      },


      {
        path: 'users/delete/:id',
        action: userdeleteaction
      },



      {
        path: 'orders', element: <Orders />, loader: orderloader
      },

      {
        path: 'orders/setstatus/:id',
        action: orderstatusaction
      },

      { path: 'logout', action: adminlogoutaction },

    ]

  },


  {
    path: '/admin',
    id: 'adminroot',
    loader: gettokenloader,
    element: <Adminauth />,
    action: adminauthaction,


  },

  {
    path: '/',
    id: 'root',
    loader: gettokenloader,
    element: <NavHomeLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true, element: <Homepage />, loader: productloader
      },
      {
        path: 'productdetails/:id',
        loader: productdetailsloader,
        element: <Productdetails />
      },
      // { path: '/auth', element: <Authpage />, action: authaction },
      { path: '/logout', action: logoutaction },
      { path: '/useraccount', element: <Useraccount />, loader: useraccloader, action: updateuseraction },
      {
        path: "productcategory/:category",
        element: <Productbycategory />,
        loader: bycategoryloader
      },
      {
        path: "auth",
        element: <Authpage />,
        action: authaction,
      }

    ]
  },


]


);


function App() {

  return <RouterProvider router={router} />;

}

export default App;
